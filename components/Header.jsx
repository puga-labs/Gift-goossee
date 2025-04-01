"use client" 

import React from "react"
import Link from "next/link"

const Header = () => {
  return (
    <div className="text-center text-white py-5 w-full">
      <Link href="/">
        <button className="px-4 py-2 text-white ">Home</button>
      </Link>
      <Link href="/send">
        <button className="px-4 py-2 text-white ">Send</button>
      </Link>
      <Link href="/receive">
        <button className="px-4 py-2 text-white ">Receive</button>
      </Link>
    </div>
  )
}

export default Header
