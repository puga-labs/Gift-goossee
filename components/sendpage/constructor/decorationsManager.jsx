'use client'
import React, { useState } from 'react';
import Image from 'next/image';

/**
 * Типы декораций, доступные в системе
 */
export const DECORATION_TYPES = {
  STICKER: 'sticker', // Стикеры/наклейки
  TEXT: 'text',       // Текстовые элементы
};

/**
 * Начальные размеры декораций по типам
 */
const DEFAULT_SIZES = {
  [DECORATION_TYPES.STICKER]: { width: 80, height: 80 },
  [DECORATION_TYPES.TEXT]: { width: 120, height: 40 },
};

/**
 * Компонент для управления декорациями на изображении подарка
 * @param {Object} props - Свойства компонента
 * @param {Array} props.decorations - Массив декораций
 * @param {Function} props.onDecorationsChange - Обработчик изменения декораций
 */
export function DecorationManager({ decorations, onDecorationsChange, selectedDecoration, onSelectDecoration }) {
  // Текущий активный тип декорации для добавления
  const [activeType, setActiveType] = useState(DECORATION_TYPES.STICKER);
  
  // Варианты стикеров
  const stickerOptions = Array.from({ length: 4 }).map((_, index) => index + 1);
  

  /**
   * Добавление новой декорации
   * @param {string} type - Тип декорации
   * @param {number|string} option - Выбранный вариант декорации
   */
  const addDecoration = (type, option) => {
    const newDecoration = {
      id: Date.now(), // Уникальный идентификатор
      type,
      option,
      x: DEFAULT_SIZES[type].width, // Начальная позиция в центре
      y: DEFAULT_SIZES[type].height, // Начальная позиция в центре
      size: { ...DEFAULT_SIZES[type] },
      rotation: 0,
    };
    
    console.log("Создана новая декорация:", newDecoration);
    
    onDecorationsChange([...decorations, newDecoration]);
    onSelectDecoration(newDecoration.id);
  };

  /**
   * Удаление декорации
   * @param {number} id - ID декорации для удаления
   */
  const removeDecoration = (id) => {
    const updatedDecorations = decorations.filter(decoration => decoration.id !== id);
    onDecorationsChange(updatedDecorations);
    onSelectDecoration(null);
  };

  /**
   * Удаление всех декораций
   */
  const removeAllDecorations = () => {
    onDecorationsChange([]);
    onSelectDecoration(null);
  };

  return (
    <div className="w-full">
      <div className="bg-gray-100 rounded-lg p-4 mb-2.5">
        <h2 className="text-lg font-medium mb-2.5 text-gray-700">Decorations</h2>
        
        {/* Переключатель типов декораций */}
        <div className="flex gap-2.5 mb-4">
          <button 
            onClick={() => setActiveType(DECORATION_TYPES.STICKER)}
            className={`px-3 py-2 rounded text-sm font-medium ${activeType === DECORATION_TYPES.STICKER ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            Stickers
          </button>
        </div>
        
        {/* Отображение опций в зависимости от выбранного типа */}
        <div className="grid grid-cols-3 gap-2.5 mb-4 sm:grid-cols-4">
          {activeType === DECORATION_TYPES.STICKER && stickerOptions.map(option => (
            <div 
              key={`sticker-${option}`}
              onClick={() => addDecoration(DECORATION_TYPES.STICKER, option)}
              className="border border-gray-300 rounded cursor-pointer p-1.5 text-center hover:shadow-md transition-shadow"
            >
              <img 
                src={`/GIFT_IMAGES/DECORATION/${option}.png`}
                alt={`Sticker ${option}`}
                className="w-full h-12 object-contain"
              />
            </div>
          ))}
        </div>
        
        {/* Список добавленных декораций */}
        {decorations.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700">Added Elements</h3>
              <button 
                onClick={removeAllDecorations}
                className="text-sm text-red-500 hover:text-red-700 px-2 py-1 rounded border border-red-300 hover:bg-red-50"
              >
                Удалить все
              </button>
            </div>
            <div className="space-y-2">
              {decorations.map(decoration => (
                <div 
                  key={`decoration-item-${decoration.id}`}
                  className={`flex items-center justify-between p-2 rounded ${selectedDecoration === decoration.id ? 'bg-blue-100' : 'bg-white'} border border-gray-200`}
                  onClick={() => onSelectDecoration(decoration.id)}
                >
                  <div className="flex items-center">
                    {decoration.type === DECORATION_TYPES.STICKER ? (
                      <img 
                        src={`/GIFT_IMAGES/DECORATION/${decoration.option}.png`}
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
                        ? `Sticker ${decoration.option}` 
                        : decoration.option}
                    </span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      removeDecoration(decoration.id);
                    }}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DecorationManager; 