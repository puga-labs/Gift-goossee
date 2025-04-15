"use client"

import React from "react"
import Link from "next/link"
import ConnectWalletCustom from "./ConnectWalletCustom"
import EyeLogo from "./Logo"
import Links from "./Links"

const Header = () => {
  return (
    <>
      <div className="w-full px-4 py-2 flex justify-between items-center border-b-1 border-black bg-green-100">
        <EyeLogo />
        <div className="flex items-center gap-16">
          <Links />
          <ConnectWalletCustom />
        </div>
      </div>
    </>
  )
}

export default Header
