"use client" // Важно, т.к. Framer Motion работает на клиенте

import React from "react"
import { motion } from "framer-motion"

export default function Marquee() {
  // Текст, который будет циклически повторяться
  const text = "Injecting vibes into a boring transfer "

  // Создаем строку из двух копий, чтобы при смещении на 50% не было разрывов
  const repeatedText = text.repeat(120)

  return (
    <div className="h-[40px] bg-black overflow-hidden relative flex items-center z-30">
      <motion.div
        className="whitespace-nowrap text-white uppercase"
        // Стартуем с x=0 и двигаемся до x = -50% ширины этого контейнера
        initial={{ x: 0 }}
        animate={{ x: "-300%" }}
        transition={{
          duration: 3000, // Время полного цикла
          repeat: Infinity, // Бесконечный повтор
          repeatType: "loop", // Повторяем как цикл
          ease: "linear", // Линейное движение без ускорений
        }}
      >
        {repeatedText}
      </motion.div>
    </div>
  )
}
