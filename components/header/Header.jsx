"use client"

import React from "react"
import Link from "next/link"
import ConnectWalletCustom from "./ConnectWalletCustom"
import EyeLogo from "./Logo"
import Links from "./Links"
import { motion as m } from "framer-motion"

const Header = () => {
  return (
    <>
      <div className="w-full px-4 py-2 flex justify-between items-center border-b-1 border-black bg-green-100">
        <EyeLogo />
        <div className="flex items-center justify-end gap-12 w-[50%]">
          <m.div className="hidden md:block transition-all duration-300">
            <Links />
          </m.div>
          <div className="flex justify-end">
            <ConnectWalletCustom />
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
