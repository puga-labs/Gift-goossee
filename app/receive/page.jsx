'use client'
import React, { useState, useEffect } from 'react';
import { useAccount, useSendTransaction } from 'wagmi'
import { rpcConfig } from '../../wagmi';
import { SMART_CONTRACT_ADDRESS } from '../../config'
import { getNftList, getNftData } from '../../utils/back/chain/calls'
import { createClaimData } from '../../utils/back/chain/txs'
import { updtLb } from '../../utils/back/api/leaderboard'

const Page = () => {
    const { sendTransactionAsync } = useSendTransaction({ rpcConfig })
    const { address } = useAccount()
    const [nftList, setNftList] = useState([])
    const [selectedNft, setSelectedNft] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [mintHash, setMintHash] = useState(null)
    const [isMinting, setIsMinting] = useState(false)
    const [forAnimation, setForAnimation] = useState(false)

    // solve ssr error
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
      }, []);

      if (!mounted) {
        return <div className="min-h-screen flex items-center justify-center">
          <p>Загрузка...</p>
        </div>;
      }

    useEffect(() => {
        if (address) {
            const fetchNftList = async () => {
                setIsLoading(true)
                try {
                    const list = await getNftList(address)
                    const dataList = []
                    console.log(list)
                    if (list.length > 0) {
                        for (const nft of list) {
                            if(nft === '') continue
                            try {
                                const data = await getNftData(nft)
                                dataList.push({
                                    ...data,
                                    tokenId: nft
                                })
                            } catch (error) {
                                console.error(`Error fetching NFT data for ${nft}:`, error)
                            }
                        }
                        console.log(dataList)
                        setNftList(dataList)
                    }
                } catch (error) {
                    console.error('Error fetching NFT list:', error)
                } finally {
                    setIsLoading(false)
                }
            }
            fetchNftList()
        }
    }, [address,mintHash])
    
    const handleMint = async () => {
        if(selectedNft) {
            try {
                setIsMinting(true)
                const mintData = createClaimData(selectedNft)
                const result = await sendTransactionAsync({
                    to: SMART_CONTRACT_ADDRESS,
                    data: mintData,
                })
                setMintHash(result)
                await updtLb(address, 'mint', result)
                const nftData = await getNftData(selectedNft)
                setForAnimation(nftData)

                new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(true)
                    }, 10000)
                }).then(() => {
                    setForAnimation(false)
                })


            } catch (error) {
                console.error('Error minting NFT:', error)
            } finally {
                setIsMinting(false)
            }
        }
    }

    return (
        <div className="relative min-h-screen overflow-x-hidden p-[2vh] space-y-[2vh] bg-#000000 font-lacker purpleBox flex flex-col items-center">
            
            {!address ? (
                <p>Connect your wallet</p>
            ) : isLoading ? (
                <p>Loading NFTs...</p>
            ) : nftList.length === 0 ? (
                <p>No NFTs found</p>
            ) : (
                <div className="flex flex-wrap gap-4 justify-center">
                    {nftList.map((nft) => {
                        const isClaimed = nft.attributes?.some(
                            attr => attr.trait_type === 'Claimed' && attr.value === 'true'
                        );
                        
                        return (
                            <div 
                                key={nft.tokenId}
                                className={`w-[200px] h-[200px] relative cursor-pointer border-2 ${
                                    selectedNft === nft.tokenId ? 'border-white' : 'border-transparent'
                                } ${isClaimed ? 'opacity-50' : ''}`}
                                onClick={() => !isClaimed && setSelectedNft(nft.tokenId)}
                            >
                                <img 
                                    src={nft.image} 
                                    alt={nft.name} 
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-1">
                                    <p className="text-white text-xs truncate">{nft.name}</p>
                                </div>
                                {isClaimed && !forAnimation && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                        <span className="text-white text-xs">Claimed</span>
                                    </div>
                                )}
                                {forAnimation && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                        <h1 className='text-black text-5xl'>{forAnimation.attributes.find(attr => attr.trait_type === 'Animation').value}</h1>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {selectedNft && (
                <div className="flex flex-col items-center gap-2">
                    <button 
                        className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-200 transition-colors disabled:opacity-50"
                        onClick={handleMint}
                        disabled={isMinting}
                    >
                        {isMinting ? 'Minting...' : 'Mint'}
                    </button>
                    
                    {mintHash && (
                        <div className="mt-2 text-sm text-white">
                            Transaction hash: 
                            <a 
                                href={`https://testnet.monadexplorer.com/tx/${mintHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-1 text-blue-400 hover:underline"
                            >
                                {mintHash.slice(0, 6)}...{mintHash.slice(-4)}
                            </a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Page;
