"use client"

import React, { useState, useEffect, useCallback, useMemo } from "react"
import { useAccount, useSendTransaction } from "wagmi"
import { ethers } from "ethers"
import { rpcConfig } from "../../wagmi"
import { SMART_CONTRACT_ADDRESS } from "../../config"
import { getNftList, getNftData } from "../../utils/back/chain/calls"
import { createClaimData } from "../../utils/back/chain/txs"
import { updtLb } from "../../utils/back/api/leaderboard"
import NftList from "../../components/recievepage/nftList"
import SelectedNft from "../../components/recievepage/selectedNft"
import confetti from "canvas-confetti"
/**
 * Custom hook: загружает список NFT по адресу и реагирует на изменение mintHash
 */
function useNftList(address, mintHash) {
  const [nftList, setNftList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!address) return
    let cancelled = false
    const fetchAll = async () => {
      setLoading(true)
      try {
        const list = await getNftList(address)
        const result = []
        for (const tokenId of list.filter((id) => id)) {
          try {
            const data = await getNftData(tokenId)
            result.push({ ...data, tokenId })
          } catch {
            // skip failed fetch
          }
        }
        if (!cancelled) setNftList(result)
      } catch {
        // ignore overall fetch errors
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchAll()
    return () => {
      cancelled = true
    }
  }, [address, mintHash])

  return { nftList, loading }
}

export default function Page() {
  const { address } = useAccount()
  const { sendTransactionAsync } = useSendTransaction({ rpcConfig })

  // список и загрузка
  const [mintHash, setMintHash] = useState(null)
  const { nftList, loading: isLoading } = useNftList(address, mintHash)

  // UI state
  const [selectedNft, setSelectedNft] = useState(null)
  const [isMinting, setIsMinting] = useState(false)

  // SSR fix
  const [mounted, setMounted] = useState(false)
  useEffect(() => void setMounted(true), [])

  // сортировка и метки
  const handleSelect = useCallback((item) => {
    setSelectedNft(item)
  }, [])

  const handleMint = useCallback(async () => {
    if (!selectedNft) return
    setIsMinting(true)
    try {
      const txData = createClaimData(selectedNft.tokenId)
      const txHash = await sendTransactionAsync({
        to: SMART_CONTRACT_ADDRESS,
        data: txData,
      })
      setMintHash(txHash)
      await updtLb(address, "mint", txHash)
      const nftData = await getNftData(selectedNft.tokenId)
      setSelectedNft(nftData)
    } catch (err) {
      console.error(err)
    } finally {
      setIsMinting(false)
      confetti({
        particleCount: 1200,
        spread: 120,
        origin: { y: 0.6 },
      })
    }
  }, [selectedNft, address, sendTransactionAsync])

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-grid">
        {/* <p>Loading...</p> */}
      </div>
    )
  }

  if (!address) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please connect your wallet</p>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-black bg-grid flex flex-row justify-center items-start pt-10 space-y-8 gap-8">
      <NftList
        nftList={nftList}
        setSelectedNft={handleSelect}
        isLoading={isLoading}
      />
      <SelectedNft
        selectedNft={selectedNft}
        handleMint={handleMint}
        isMinting={isMinting}
      />
    </div>
  )
}
