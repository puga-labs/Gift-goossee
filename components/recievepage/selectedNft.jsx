"use client";

import React, { useState, useEffect } from "react";


const SelectedNftItem = ({item, onClick, isMinting}) => (
  <div className="rounded-lg bg-white w-[300px] h-[300px] shadow-main overflow-hidden relative">
    <img src={item?.image} alt={item?.name} className="w-full h-full object-cover" />
    {item?.attributes?.some(attr => attr.trait_type === "Claimed" && attr.value === "false") && (
        <button className="absolute btn-sm bottom-4 left-1/2 -translate-x-1/2" onClick={onClick} disabled={isMinting}>{isMinting ? "Minting..." : "mint"}</button>
    )}
  </div>
);

const SelectedNftInfo = ({item}) => (
  <div className="flex flex-col gap-4">
    <h1>{item?.name}</h1>
    <p>Message: {item?.message}</p>
    {item?.attributes?.map((attr) => (
        <p key={attr.trait_type}>{attr.trait_type}: {attr.value}</p>
    ))}
  </div>
);


export default function SelectedNft({selectedNft, handleMint, isMinting}) {
   
    return (
        <div className="flex flex-col gap-4">
            <SelectedNftItem item={selectedNft} onClick={handleMint} isMinting={isMinting} />
            <SelectedNftInfo item={selectedNft} />
        </div>
    )
}
