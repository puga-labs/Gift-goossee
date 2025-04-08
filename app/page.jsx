"use client"
import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import Hero from "../components/mainpage/Hero"
import HowMain from "@/components/howitworks/HowMain"
import GalleryMain from "@/components/gallery/GalleryMain"
import LastSectionMain from "@/components/lastsectioin/LastSectionMain"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const containerRef = useRef(null)

  useEffect(() => {
    const sections = gsap.utils.toArray(".section")
    const container = containerRef.current

    gsap.to(sections, {
      yPercent: -102.1 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 0.5,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + window.innerHeight * (sections.length - 1),
      },
    })
  }, [])

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen overflow-x-hidden p-[2vh] space-y-[2vh] bg-#000000 font-lacker"
    >
      <section className="section">
        <Hero />
      </section>
      <section className="section">
        <HowMain />
      </section>
      <section className="section">
        <GalleryMain />
      </section>
      <section className="section">
        <LastSectionMain />
      </section>
    </main>
  )
}

//if i add classname test for main parent div, i get the bag bars on the right and bottom of the screen
