"use client" // если используется App Router и это клиентский компонент

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Links = () => {
  const links = [
    { href: "/", label: "Home" },
    { href: "/send", label: "Send" },
    { href: "/receive", label: "Receive" },
    // { href: "/how-it-works", label: "How it works" },
    { href: "/#leaderboard", label: "Leaderboard" },
    { href: "/#faq", label: "FAQ" },
  ]

  return (
    <div className="flex items-center gap-4 text-sm">
      {links.map(({ href, label }) => (
        <ActiveLink key={href} href={href}>
          {label}
        </ActiveLink>
      ))}
    </div>
  )
}

const ActiveLink = ({ href, children }) => {
  const pathname = usePathname()

  const isActive = pathname === href

  const baseClass = "px-3 py-1 rounded-lg transition-colors duration-200"
  const activeClass =
    "btn-sm px-3! py-1! bg-white! hover:bg-white! text-sm! rounded-lg!"
  const inactiveClass = "text-black hover:text-black/70"

  return (
    <Link
      href={href}
      className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
    >
      {children}
    </Link>
  )
}

export default Links
