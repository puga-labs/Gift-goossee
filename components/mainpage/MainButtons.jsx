"use client"

import Link from "next/link"
import { motion as m } from "framer-motion"
import { TiGift } from "react-icons/ti"

const buttonVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}

const MainButtons = () => {
  return (
    <m.div
      className="p-5 flex flex-col items-center justify-center font-lacker space-y-4"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.4 } },
      }}
    >
      <SendButton />
      <ReceiveButton />
    </m.div>
  )
}

export default MainButtons

const SendButton = () => {
  return (
    <Link href="/send">
      <m.button
        className="btn-big relative whitespace-nowrap"
        variants={buttonVariants}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 150,
          damping: 12,
        }}
      >
        Drop a Gift
      </m.button>
    </Link>
  )
}

const ReceiveButton = () => {
  return (
    <Link href="/receive">
      <m.button
        className="btn-sm"
        variants={buttonVariants}
        transition={{
          duration: 0.5,
          type: "spring",
          stiffness: 150,
          damping: 12,
          delay: 0.2,
        }}
      >
        Receive
      </m.button>
    </Link>
  )
}
