"use client"

import { useState } from "react"
import { useAccount, useSendTransaction } from "wagmi"
import { ethers } from "ethers"
import { createSendData } from "../../utils/back/chain/txs"
import { generateGiftImage } from "../../utils/imageGenerator"
import { rpcConfig } from "../../wagmi"
import { SMART_CONTRACT_ADDRESS } from "../../config"
import { updtLb } from "../../utils/back/api/leaderboard"
import { motion, AnimatePresence } from "framer-motion"
import { AiOutlineClose } from "react-icons/ai"

/**
 * Форма отправки подарка
 */
export function SendForm({
  imageOptions,
  decorations = [],
  txData,
  setTxData,
}) {
  const { address } = useAccount()
  const { sendTransactionAsync } = useSendTransaction({ rpcConfig })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSend = async () => {
    // валидация адреса
    if (!txData.to.startsWith("0x") || txData.to.length !== 42) {
      setError("Enter valid recipient address (starts with 0x, 42 characters).")
      return
    }
    // валидация суммы
    if (!txData.amount || parseFloat(txData.amount) <= 0) {
      setError("Enter amount greater than 0.")
      return
    }

    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      // Данные для транзакции
      const receiverAddress = txData.to
      const giftMessage = txData.message
      const giftValue = txData.amount

      // 2) Данные для контракта
      const sendData = createSendData(
        receiverAddress,
        giftMessage,
        txData.animation, // animation
        new Date().getTime(), // timestamp в секундах
        txData.mintDate.getTime() // date
      )

      // Отправляем транзакцию
      const tx = await sendTransactionAsync({
        to: SMART_CONTRACT_ADDRESS,
        data: sendData.data,
        value: ethers.parseEther(giftValue.toString()),
      })

      // Генерируем изображение через API на сервере
      console.log("Запрос на генерацию изображения...")
      await generateGiftImage(
        imageOptions,
        decorations,
        sendData.tokenId,
        giftMessage
      )

      await updtLb(address, "sent", tx)

      setSuccess(`Gift sent! TxHash: ${tx.slice(0, 6)}...${tx.slice(-4)}`)
      // сброс формы
      setTxData({
        to: "",
        amount: "",
        message: "",
        animation: "Default",
        mintDate: new Date(),
      })
    } catch (err) {
      console.error(err)
      setError(`Error: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6 text-gray-700">
      {/* Ошибка */}
      <AnimatePresence>
        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative p-3 bg-red-100 text-red-800 rounded-md border mb-4"
          >
            {/* Кнопка закрытия */}
            <button
              onClick={() => setError("")}
              className="absolute top-[-10px] right-[-10px] text-red-800 hover:text-red-600 border rounded-full p-1 cursor-pointer
              bg-red-100"
              aria-label="Close"
            >
              <AiOutlineClose size={16} strokeWidth={2} />
            </button>
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {success && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative p-3 bg-green-100 text-green-800 rounded-md mb-4"
          >
            <button
              onClick={() => setSuccess("")}
              className="absolute top-[-10px] right-[-10px] text-green-800 hover:text-green-600 border rounded-full p-1 cursor-pointer
              bg-green-100"
              aria-label="Close"
            >
              <AiOutlineClose size={16} strokeWidth={2} />
            </button>
            {success}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Сообщение */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-600">
          Message
        </label>
        <input
          type="text"
          placeholder="Gift Message"
          value={txData.message}
          onChange={(e) =>
            {  if(e.target.value.length <= 50){
              setTxData({ ...txData, message: e.target.value })
            }
          }
          }
          disabled={isLoading}
          className="w-full px-4 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
        />
      </div>

      {/* --------------------------- */}
      {/* Секция: Amount + Mint Date  */}
      {/* --------------------------- */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Amount */}
        <div className="flex-1 space-y-1">
          <label className="block text-sm font-medium text-gray-600">
            Amount
          </label>
          <input
            type="number"
            placeholder="0.00"
            value={txData.amount}
            onChange={(e) => {
              if (e.target.value >= 0) {
                setTxData({ ...txData, amount: e.target.value })
              }
            }}
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
          />
        </div>

        {/* Mint Date */}
        <div className="flex-1 space-y-1">
          <label className="block text-sm font-medium text-gray-600">
            Mint Date
          </label>
          <input
            type="date"
            value={txData.mintDate.toISOString().split("T")[0]}
            onChange={(e) => {
              const d = new Date(e.target.value)
              if (d >= new Date().setHours(0, 0, 0, 0)) {
                setTxData({ ...txData, mintDate: d })
              }
            }}
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
          />
        </div>
      </div>

      {/* --------------------------- */}
      {/* Секция: Animation (отдельно) */}
      {/* --------------------------- */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-600">
          Animation
        </label>
        <select
          value={txData.animation}
          onChange={(e) => setTxData({ ...txData, animation: e.target.value })}
          disabled={isLoading}
          className="w-full px-4 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
        >
          <option value="Default">Default</option>
          <option value="Rare">Rare</option>
          <option value="Legendary">Legendary</option>
          <option value="Epic">Epic</option>
        </select>
      </div>

      {/* --------------------------- */}
      {/* Секция: Receiver + Send Блок */}
      {/* --------------------------- */}
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-600">
            Receiver
          </label>
          <input
            type="text"
            placeholder="0x..."
            value={txData.to}
            onChange={(e) => setTxData({ ...txData, to: e.target.value })}
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
          />
        </div>
        {/* Кнопка по центру */}
        <div className="flex justify-center">
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="btn-sm w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Send!"}
          </button>
        </div>
      </div>
    </div>
  )
}
