"use client"

import React from "react"
import Link from "next/link"
import ConnectWalletCustom from "./ConnectWalletCustom"
import EyeLogo from "./Logo"
import Links from "./Links"
import { motion as m } from "framer-motion"

const Header = () => {
  return (
    // Wrap in motion.div to animate entrance
    <div className=" w-full">
      <header className="w-full px-4 py-2 flex justify-between items-center border-b bg-green-200">
        <EyeLogo />

        <div className="flex items-center justify-end gap-12 w-[50%]">
          {/* Links fade in slightly delayed */}
          <m.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="hidden md:block"
          >
            <Links />
          </m.div>

          {/* Wallet button pop-in */}
          <m.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="flex justify-end"
          >
            <ConnectWalletCustom />
          </m.div>
        </div>
      </header>
    </div>
  )
}

export default Header
