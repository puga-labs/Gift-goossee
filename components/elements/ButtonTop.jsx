"use client"

import React, { useState, useEffect } from "react"
import { FaArrowUp } from "react-icons/fa6"
import { motion, AnimatePresence } from "framer-motion"

const ButtonTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    // проверим сразу
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="scroll-top-btn"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-12 right-12 h-12 w-12 border rounded-full border-black bg-white shadow-main z-50"
        >
          <button
            onClick={scrollToTop}
            className="flex items-center justify-center h-full w-full cursor-pointer hover:scale-110 transition-all duration-300"
            aria-label="Scroll to top"
          >
            <FaArrowUp size={24} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ButtonTop
