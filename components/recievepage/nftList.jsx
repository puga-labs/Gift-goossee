"use client";

import React, { useState, useEffect } from "react";


const ListWrapper = ({type, children, isLoading}) => {
    // Используем React.Children.count вместо React.Children.toArray для проверки наличия элементов
    const hasItems = React.Children.count(children) > 0;
    
    return (
        <div className="shadow-main bg-white rounded-lg p-4 h-[300px] w-[300px]">
            <h1 className="text-2xl font-bold border-b-2 border-black/10 pb-2 w-full">{type}</h1>
            {isLoading ? (
                <div className="flex items-center justify-center mt-4">
                    <p className="text-gray-500 text-lg">Loading...</p>
                </div>
            ) : (
                hasItems ? (
                    <div className="grid grid-cols-3 gap-4 mt-4 overflow-y-auto h-[200px]">
                        {children}
                </div>
            ) : (
                <div className="flex items-center justify-center mt-4">
                    <p className="text-gray-500 text-lg">No {type} NFT</p>
                </div>
            ))}
            </div>
    );
}

const NftItem = ({item, onClick}) => (
  <div className="rounded-lg bg-white cursor-pointer overflow-hidden w-[70px] h-[70px]" onClick={onClick}>
    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
  </div>
);


export default function NftList({nftList,setSelectedNft, isLoading}) {
    // Создаем состояния для отфильтрованных списков
    const [unclaimedNfts, setUnclaimedNfts] = useState([]);
    const [claimedNfts, setClaimedNfts] = useState([]);
    
    // Обновляем состояния при изменении nftList
    useEffect(() => {
        if (!nftList) return;
        
        // Фильтруем unclaimed NFT
        const unclaimed = nftList.filter(item => 
            item.attributes?.some(a => a.trait_type === "Claimed" && a.value === "false")
        );
        setUnclaimedNfts(unclaimed);
        
        // Фильтруем claimed NFT
        const claimed = nftList.filter(item => 
            item.attributes?.some(a => a.trait_type === "Claimed" && a.value === "true")
        );
        setClaimedNfts(claimed);
    }, [nftList]); // Зависимость - только nftList


    return (
        <div className="flex flex-col gap-4">
            <ListWrapper type="UnClaimed" isLoading={isLoading}>
                {unclaimedNfts.map((item) => (
                    <NftItem key={item.id} item={item}  onClick={() => setSelectedNft(item)} />
                ))}
            </ListWrapper>
            <ListWrapper type="Claimed" isLoading={isLoading}>
                {claimedNfts.map((item) => (
                    <NftItem key={item.id} item={item} onClick={() => setSelectedNft(item)} />
                ))}
            </ListWrapper>
        </div>
    )
}
