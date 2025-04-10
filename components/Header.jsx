"use client"

import React from "react"
import Link from "next/link"
import EyeLogo from "./header/Logo"
import ConnectWalletCustom from "./ConnectWalletCustom"

const Header = () => {
  return (
    <div className="text-center text-white pt-4 px-4 flex justify-center">
      <div className=" w-2/3 flex items-center justify-between font-lacker h-16 space-x-4 relative">
        <div className="bg-orange-300 rounded-xl">
          <EyeLogo />
        </div>
        <div className="w-full h-16">
          <HeaderButtons />
        </div>
        <div className="bg-orange-300 rounded-xl h-16 flex items-center justify-center transition-all duration-300 min-w-[250px]">
          <ConnectWalletCustom />
        </div>
      </div>
    </div>
  )
}

export default Header

const HeaderButtons = () => {
  return (
    <div className="flex w-full justify-center space-x-4 h-full items-center text-xl outlined-text-sm ">
      <BtnHeader text="home" link="/" />
      <BtnHeader text="send" link="/send" />
      <BtnHeader text="receive" link="/receive" />
    </div>
  )
}

const BtnHeader = ({ text,link }) => {
  return (
    <div className=" w-1/3 rounded-xl bg-purple-400 cursor-pointer hover:bg-purple-500 transition-all duration-300 h-full flex items-center justify-center relative z-[10]">
    <Link href={link}>
      <button className="px-4 py-2 text-white text-2xl h-full cursor-pointer btnAnimation">{text}</button>
    </Link>
  </div>
  )
}