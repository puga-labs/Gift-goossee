"use client"
import React, { useState, useEffect } from "react"
import { getStickers } from "../../../lib/utils/getImages"

/**
 * Типы декораций, доступные в системе
 */
export const DECORATION_TYPES = {
  STICKER: "sticker", // Стикеры/наклейки
  TEXT: "text", // Текстовые элементы
}

/**
 * Начальные размеры декораций по типам
 */
const DEFAULT_SIZES = {
  [DECORATION_TYPES.STICKER]: { width: 30, height: 30 },
  [DECORATION_TYPES.TEXT]: { width: 120, height: 40 },
}

/**
 * Компонент для управления декорациями на изображении подарка
 * @param {Object} props - Свойства компонента
 * @param {Array} props.decorations - Массив декораций
 * @param {Function} props.onDecorationsChange - Обработчик изменения декораций
 */
export function DecorationManager({
  decorations,
  onDecorationsChange,
  selectedDecoration,
  onSelectDecoration,
}) {
  // Текущий активный тип декорации для добавления
  const [activeType, setActiveType] = useState(DECORATION_TYPES.STICKER)
  const [stickers, setStickers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStickers() {
      setLoading(true)
      const data = await getStickers()
      console.log(data)
      setStickers(data)
      setLoading(false)
    }

    loadStickers()
  }, [])

  // Варианты стикеров
  // const stickerOptions = Array.from({ length: 4 }).map((_, index) => index + 1);

  /**
   * Добавление новой декорации
   * @param {string} type - Тип декорации
   * @param {number|string} option - Выбранный вариант декорации
   */
  const addDecoration = (type, option, url) => {
    const newDecoration = {
      id: Date.now(), // Уникальный идентификатор
      type,
      option,
      url,
      x: DEFAULT_SIZES[type].width * 2, // Начальная позиция в центре
      y: DEFAULT_SIZES[type].height * 2, // Начальная позиция в центре
      size: { ...DEFAULT_SIZES[type] },
      rotation: 0,
    }

    console.log("Создана новая декорация:", newDecoration)

    onDecorationsChange([...decorations, newDecoration])
    onSelectDecoration(newDecoration.id)
  }

  /**
   * Удаление декорации
   * @param {number} id - ID декорации для удаления
   */
  const removeDecoration = (id) => {
    const updatedDecorations = decorations.filter(
      (decoration) => decoration.id !== id
    )
    onDecorationsChange(updatedDecorations)
    onSelectDecoration(null)
  }

  /**
   * Удаление всех декораций
   */
  const removeAllDecorations = () => {
    onDecorationsChange([])
    onSelectDecoration(null)
  }

  return (
    <>
      <div className="border rounded-lg shadow-main bg-white relative p-4 flex flex-col items-start justify-start">
        <h1 className="text-2xl font-bold border-b-2 border-black/10 pb-2 w-full">
          Stickers
        </h1>
        {/* Отображение опций в зависимости от выбранного типа */}
        <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 mt-4 max-h-[240px] overflow-y-auto pr-4">
          {loading ? (
            <div>Loading...</div>
          ) : (
            activeType === DECORATION_TYPES.STICKER &&
            stickers.map((option) => (
              <div
                key={`sticker-${option.name}`}
                onClick={() =>
                  addDecoration(
                    DECORATION_TYPES.STICKER,
                    option.name,
                    option.url
                  )
                }
                className="overflow-hidden border-black/40 rounded-lg py-3 shadow-main opacity-50 hover:opacity-100
                cursor-pointer border hover:border-black transition-all duration-200 hover:translate-y-[-3px]"
              >
                <img
                  src={option.url}
                  alt={`Sticker ${option.name}`}
                  className="w-full h-12 object-contain"
                />
              </div>
            ))
          )}
        </div>

        {/* Список добавленных декораций */}
      </div>
      {decorations.length > 0 && (
        <div className=" w-full h-[200px] relative p-2 flex flex-col items-start justify-start">
          <div className="flex items-center justify-between w-full mb-2">
            <h3 className="text-sm font-bold text-gray-700">Added Elements</h3>
            <button
              onClick={removeAllDecorations}
              className="px-3 py-1 rounded-lg transition-colors duration-200 btn-sm px-3! py-1! bg-white! hover:bg-white! text-sm! rounded-lg!"
            >
              Remove all
            </button>
          </div>
          <div className="w-full h-full overflow-y-auto">
            <div className="space-y-2  grid grid-cols-3 gap-4 p-2">
              {decorations.map((decoration) => (
                <div
                  key={`decoration-item-${decoration.id}`}
                  className={`flex items-center justify-between p-2 overflow-hidden border-black rounded-lg cursor-pointer transition-all duration-200 hover:translate-y-[-3px] hover:shadow-md ${
                    selectedDecoration === decoration.id
                      ? "shadow-main px-3 py-1 rounded-lg transition-colors duration-200 btn-sm px-3! py-1! bg-white! hover:bg-white! text-sm! rounded-lg!"
                      : "border-transparent"
                  }`}
                  onClick={() => onSelectDecoration(decoration.id)}
                >
                  <div className="flex items-center">
                    {decoration.type === DECORATION_TYPES.STICKER ? (
                      <img
                        src={decoration.url}
                        alt="Sticker"
                        className="w-8 h-8 object-contain mr-2"
                      />
                    ) : (
                      <span className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded mr-2">
                        <span className="text-xs text-black">Txt</span>
                      </span>
                    )}
                    <span className="text-sm truncate max-w-[150px] text-black">
                      {decoration.type === DECORATION_TYPES.STICKER
                        ? `Sticker ${decoration.option.split(".")[0]}`
                        : decoration.option}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeDecoration(decoration.id)
                    }}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DecorationManager
