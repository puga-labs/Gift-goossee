"use client"
import { motion as m } from "framer-motion"
import React from "react"
import { LiaPencilRulerSolid } from "react-icons/lia"
import { TbCubeSend } from "react-icons/tb"
import { BiParty } from "react-icons/bi"

const icons = {
  customize: <LiaPencilRulerSolid size={28} />,
  send: <TbCubeSend size={40} strokeWidth={1.5} />,
  enjoy: <BiParty size={28} />,
}

const text = {
  customize:
    "Choose the theme, animation, and write something sweet... or stupid. Bonus points for memes.",
  send: "Send your gift via ENS or wallet address — and choose the date when they can unwrap it.",
  enjoy:
    "Receiver opens the gift. Animation plays. Message hits. NFT lands. Vibes unlocked.",
}

const HeroBoxesBottom = () => {
  const items = [
    { key: 'customize', color: 'red' },
    { key: 'send', color: 'blue' },
    { key: 'enjoy', color: 'green' },
  ]

  return (
    <m.div
      className="flex items-center justify-center space-x-[40px] w-full"
      initial="hidden"
      animate="visible"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
    >
      {items.map(({ key, color }, i) => (
        <Box
          key={key}
          color={color}
          icon={icons[key]}
          text={text[key]}
          index={i}
        >
          {key.charAt(0).toUpperCase() + key.slice(1)}
        </Box>
      ))}
    </m.div>
  )
}

const Box = ({ children, color, icon, text, index }) => {
  const bgColor = {
    red: "bg-red-200",
    blue: "bg-blue-200",
    green: "bg-green-200",
  }[color] || "bg-gray-200"

  // Variants with dynamic delay for initial appearance
  const boxVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: custom => ({
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 120, damping: 12, delay: custom * 0.2 }
    }),
  }

  return (
    <m.div
      className="h-[20vh] w-[15vw] bg-white rounded-lg border shadow-[2px_2px_0_#000] p-2 select-none"
      variants={boxVariants}
      custom={index}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.03, transition: { type: 'spring', stiffness: 200, damping: 12 } }}
    >
      <div className={`w-full h-1/3 rounded-lg ${bgColor} flex items-center justify-center`}>
        <m.div whileHover={{ rotate: 10 }} transition={{ duration: 0.3 }}>
          {icon}
        </m.div>
      </div>
      <div className="flex flex-col items-center justify-center h-2/3 text-center space-y-2">
        <h1 className="text-xl font-bold">{children}</h1>
        <p className="text-sm text-gray-500 font-semibold px-2">{text}</p>
      </div>
    </m.div>
  )
}

export default HeroBoxesBottom