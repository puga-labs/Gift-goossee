"use client"
import { motion as m } from "framer-motion"
import React from "react"
import MainButtons from "./MainButtons"
import Image from "next/image"
import HeroBoxesBottom from "./HeroBoxesBottom"

const Hero = () => {
  return (
    <m.div
      className="w-full min-h-screen bg-purple-200 flex flex-col items-center justify-center relative bg-grid"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.4 } },
      }}
    >
      <GoosseeHero />
      <MainButtons />
      <m.div
        className="my-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      />
      <HeroBoxesBottom />
    </m.div>
  )
}

export default Hero

const GoosseeHero = () => {
  return (
    <div className="mb-[-200px] pointer-events-none select-none">
      <Image
        src="/hero-goossee2.png"
        alt="Goossee"
        width={600}
        height={300}
        priority
      />
    </div>
  )
}
