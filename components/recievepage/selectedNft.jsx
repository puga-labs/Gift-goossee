"use client"

import React, { useState, useEffect } from "react"

const SelectedNftItem = ({ item, onClick, isMinting }) => (
  <div className="rounded-lg bg-white w-[360px] h-[360px] shadow-main overflow-hidden relative border ">
    {item?.image ? (
      <img
        src={item?.image}
        alt={item?.name}
        className="w-full h-full object-cover"
      />
    ) : (
      <div className=" h-full w-full flex items-end animate-bounce">
        <img src="/hero-goossee2.png" />
      </div>
    )}
    {item?.attributes?.some(
      (attr) => attr.trait_type === "Claimed" && attr.value === "false"
    ) && (new Date(item?.attributes?.find(attr => attr.trait_type === "Mint Date")?.value) < new Date() ?
      <button
        className="absolute btn-sm bottom-4 left-1/2 -translate-x-1/2"
        onClick={onClick}
        disabled={isMinting}
      >
        {isMinting ? "Minting..." : "Mint"}
      </button>
     : (
      <p className="absolute btn-sm bottom-4 left-1/2 -translate-x-1/2">
        Pending
      </p>
    ))}
  </div>
)

const SelectedNftInfo = ({ item }) => {
  const formatValue = (trait_type, value) => {
    // Если это дата (Unix timestamp в секундах)
    if (trait_type.toLowerCase().includes("date") && /^\d+$/.test(value)) {
      const d = new Date(Number(value) * 1000);
      return d.toLocaleString(); // вернёт что‑то вроде "5/20/2025, 3:45:30 PM"
    }
    // Адрес
    if (value.startsWith("0x") && value.length === 42) {
      return `${value.slice(0, 6)}…${value.slice(-4)}`;
    }
    // Очень длинный текст
    return value.length > 40 ? `${value.slice(0, 40)}…` : value;
  };

  return (
    <div className="flex flex-col gap-3 max-w-[360px]">
      <div className="bg-orange-300 p-2 rounded-lg border shadow-main mb-6">
        <h1>{item?.name}</h1>
        <p className="break-words whitespace-pre-wrap ">
          Message: {item?.message ? item.message : "Choose your unclaimed gift!"}
        </p>
      </div>
      {item?.attributes?.map(({ trait_type, value }) => (
        <div
          key={trait_type}
          className="p-2 rounded-lg border shadow-main bg-white"
        >
          {trait_type}: {formatValue(trait_type, String(value))}
        </div>
      ))}
    </div>
  );
};

export default function SelectedNft({ selectedNft, handleMint, isMinting }) {
  return (
    <div className="flex flex-col gap-4">
      <SelectedNftItem
        item={selectedNft}
        onClick={handleMint}
        isMinting={isMinting}
      />
      <SelectedNftInfo item={selectedNft} />
    </div>
  )
}
