import React from "react"
import { FaSquareXTwitter } from "react-icons/fa6"
import { FaDiscord } from "react-icons/fa"

const Footer = () => {
  return (
    <div className="text-center text-black bg-green-200 py-8 border-t border-black flex flex-col justify-between items-center">
      <p>© 2025 Goossee. Made by PugaLabs.</p>
      <div className="flex space-x-4 mt-4">
        <FaSquareXTwitter className="text-3xl cursor-pointer hover:text-gray-700 transition-all duration-300" />
        <FaDiscord className="text-3xl cursor-pointer hover:text-gray-700 transition-all duration-300" />
      </div>
    </div>
  )
}

export default Footer
