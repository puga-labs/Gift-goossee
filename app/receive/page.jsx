"use client"

import React, { useState, useEffect, useCallback, useMemo } from "react"
import { useAccount, useSendTransaction } from "wagmi"
import { ethers } from "ethers"
import { rpcConfig } from "../../wagmi"
import { SMART_CONTRACT_ADDRESS } from "../../config"
import { getNftList, getNftData } from "../../utils/back/chain/calls"
import { createClaimData } from "../../utils/back/chain/txs"
import { updtLb } from "../../utils/back/api/leaderboard"
import { FiLoader } from "react-icons/fi"

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
  const [selectedId, setSelectedId] = useState(null)
  const [isMinting, setIsMinting] = useState(false)
  const [playAnimationFor, setPlayAnimationFor] = useState(null)

  // SSR fix
  const [mounted, setMounted] = useState(false)
  useEffect(() => void setMounted(true), [])

  // сортировка и метки
  const sortedNfts = useMemo(() => nftList, [nftList])

  const handleSelect = useCallback((tokenId, claimed) => {
    if (!claimed) setSelectedId(tokenId)
  }, [])

  const handleMint = useCallback(async () => {
    if (!selectedId) return
    setIsMinting(true)
    try {
      const txData = createClaimData(selectedId)
      const txHash = await sendTransactionAsync({
        to: SMART_CONTRACT_ADDRESS,
        data: txData,
      })
      setMintHash(txHash)
      await updtLb(address, "mint", txHash)
      const nftData = await getNftData(selectedId)
      setPlayAnimationFor(nftData)
      setTimeout(() => setPlayAnimationFor(null), 10_000)
    } catch (err) {
      console.error(err)
    } finally {
      setIsMinting(false)
    }
  }, [selectedId, address, sendTransactionAsync])

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
    <div className="relative min-h-screen p-8 bg-black bg-grid flex flex-col justify-center items-center space-y-8">
      {/* NFT Grid */}
      {isLoading ? (
        <div className="text-black flex flex-col justify-center items-center">
          <FiLoader className="animate-spin text-3xl" />
          <p>Loading NFTs…</p>
        </div>
      ) : sortedNfts.length === 0 ? (
        <p className="text-black">No NFTs found</p>
      ) : (
        <div className="grid grid-cols-4  gap-6 test h-[50%vh]">
          {sortedNfts.map((nft) => {
            const claimed = nft.attributes?.some(
              (a) => a.trait_type === "Claimed" && a.value === "true"
            )
            const isSelected = selectedId === nft.tokenId
            return (
              <div
                key={nft.tokenId}
                onClick={() => handleSelect(nft.tokenId, claimed)}
                className={`relative h-48 w-48 cursor-pointer border-2 rounded-lg overflow-hidden transition hover:opacity-90
                    hover:scale-[102%] ${
                      isSelected
                        ? "border-black shadow-main"
                        : claimed
                        ? "opacity-50 border-transparent"
                        : "border-transparent"
                    }`}
              >
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-0 inset-x-0 bg-black/50 p-1">
                  <p className="text-xs text-white truncate">{nft.name}</p>
                </div>
                {claimed && !playAnimationFor && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <span className="text-white text-xs">Claimed</span>
                  </div>
                )}
                {playAnimationFor?.tokenId === nft.tokenId && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <h1 className="text-5xl text-black">
                      {
                        playAnimationFor.attributes.find(
                          (a) => a.trait_type === "Animation"
                        )?.value
                      }
                    </h1>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Mint Button Section */}
      <div className="flex flex-col items-center space-y-4">
        <button onClick={handleMint} disabled={isMinting} className="btn-sm">
          {isMinting ? "Minting…" : "Mint"}
        </button>
        {mintHash && (
          <a
            href={`https://testnet.monadexplorer.com/tx/${mintHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-400 hover:underline"
          >
            Tx Hash: {mintHash.slice(0, 6)}…{mintHash.slice(-4)}
          </a>
        )}
      </div>
    </div>
  )
}
