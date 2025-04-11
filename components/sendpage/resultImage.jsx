'use client'
import React, { useRef, useState, useEffect } from 'react';
import { DECORATION_TYPES } from './constructor/decorationsManager';

/**
 * Компонент для отображения результирующего изображения с декорациями
 * @param {Object} props - Свойства компонента
 * @param {Object} props.imageOptions - Опции базового изображения (фон, подарок, базовое украшение)
 * @param {Array} props.decorations - Массив декораций
 * @param {Function} props.onDecorationsChange - Обработчик изменения декораций
 * @param {number|null} props.selectedDecoration - ID выбранной декорации или null
 * @param {Function} props.onSelectDecoration - Обработчик выбора декорации
 */
export function ResultImage({ 
  imageOptions, 
  decorations = [], 
  onDecorationsChange,
  selectedDecoration = null,
  onSelectDecoration = () => {}
}) {
    const imageWrapperRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [draggedDecoration, setDraggedDecoration] = useState(null);
    const [startDragPos, setStartDragPos] = useState({ x: 0, y: 0 });
    const [resizing, setResizing] = useState(false);
    const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
    
    /**
     * Обработчик начала перетаскивания декорации
     * @param {Event} e - Событие мыши
     * @param {number} id - ID декорации
     */
    const handleDecorationMouseDown = (e, id) => {
        e.stopPropagation();
        onSelectDecoration(id);
        
        if (e.target.classList.contains('resize-handle')) {
            // Обрабатываем начало изменения размера
            setResizing(true);
            const decoration = decorations.find(d => d.id === id);
            setDraggedDecoration(id);
            setResizeStart({ 
                x: e.clientX, 
                y: e.clientY,
                width: decoration.size.width,
                height: decoration.size.height
            });
        } else if (e.target.classList.contains('rotate-handle')) {
            // Ничего не делаем, обработка в handleRotate
        } else {
            // Обрабатываем начало перетаскивания
            setIsDragging(true);
            setDraggedDecoration(id);
            setStartDragPos({ x: e.clientX, y: e.clientY });
        }
    };
    
    /**
     * Обработчик перемещения мыши над областью изображения
     * @param {Event} e - Событие движения мыши
     */
    const handleMouseMove = (e) => {
        if (!isDragging && !resizing) return;
        
        const container = imageWrapperRef.current;
        const rect = container.getBoundingClientRect();
        
        // Находим декорацию, которую перемещаем
        const decoration = decorations.find(d => d.id === draggedDecoration);
        if (!decoration) return;
        
        if (resizing) {
            // Вычисляем новые размеры
            const deltaX = e.clientX - resizeStart.x;
            const deltaY = e.clientY - resizeStart.y;
            
            // Коэффициент для процентной величины размера к пикселям
            const percentToPixelFactorX = rect.width / 100;
            const percentToPixelFactorY = rect.height / 100;
            
            // Новые размеры в пикселях
            const newWidthPx = resizeStart.width * percentToPixelFactorX + deltaX;
            const newHeightPx = resizeStart.height * percentToPixelFactorY + deltaY;
            
            // Преобразуем пиксели в проценты от ширины контейнера
            const newWidth = newWidthPx / percentToPixelFactorX;
            const newHeight = newHeightPx / percentToPixelFactorY;
            
            // Минимальные размеры
            const minWidth = 5; // 5% от ширины контейнера
            const minHeight = 5; // 5% от высоты контейнера
            
            // Обновляем размер декорации
            const updatedDecorations = decorations.map(d => {
                if (d.id === draggedDecoration) {
                    return {
                        ...d,
                        size: {
                            width: Math.max(minWidth, newWidth),
                            height: Math.max(minHeight, newHeight)
                        }
                    };
                }
                return d;
            });
            
            onDecorationsChange(updatedDecorations);
        } else if (isDragging) {
            // Рассчитываем смещение в пикселях
            const deltaX = e.clientX - startDragPos.x;
            const deltaY = e.clientY - startDragPos.y;
            
            // Преобразуем пиксели в проценты от ширины и высоты контейнера
            const percentX = (deltaX / rect.width) * 100;
            const percentY = (deltaY / rect.height) * 100;
            
            // Обновляем позицию декорации
            const updatedDecorations = decorations.map(d => {
                if (d.id === draggedDecoration) {
                    const newX = d.x + percentX;
                    const newY = d.y + percentY;
                    
                    // Ограничиваем позицию внутри контейнера
                    return {
                        ...d,
                        x: Math.min(Math.max(0, newX), 100),
                        y: Math.min(Math.max(0, newY), 100)
                    };
                }
                return d;
            });
            
            onDecorationsChange(updatedDecorations);
            
            // Обновляем начальную позицию для следующего перемещения
            setStartDragPos({ x: e.clientX, y: e.clientY });
        }
    };
    
    /**
     * Обработчик окончания перетаскивания
     */
    const handleMouseUp = () => {
        setIsDragging(false);
        setResizing(false);
        setDraggedDecoration(null);
        // Не сбрасываем selectedDecoration, чтобы декорация оставалась выбранной после отпускания мыши
    };

    /**
     * Поворачивает выбранную декорацию на указанный угол
     * @param {number} id - ID декорации
     * @param {number} angle - Угол поворота (в градусах)
     */
    const handleRotate = (id, angle) => {
        const updatedDecorations = decorations.map(d => {
            if (d.id === id) {
                // Убедимся, что угол всегда положительный в диапазоне 0-360
                let newRotation = (d.rotation + angle) % 360;
                if (newRotation < 0) newRotation += 360;
                
                return {
                    ...d,
                    rotation: newRotation
                };
            }
            return d;
        });
        
        onDecorationsChange(updatedDecorations);
    };
    
    // Подписываемся на события перемещения мыши и ее отпускания
    useEffect(() => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, resizing, draggedDecoration, decorations]);
    
    return (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4 p-5">
            <div 
                className="relative w-full w-[500px] aspect-square overflow-hidden shadow-lg" 
                ref={imageWrapperRef} 
                onClick={() => onSelectDecoration(null)}
            >
                {/* Фоновое изображение */}
                <img 
                    src={`/GIFT_IMAGES/BACKGROUND/${imageOptions.BACKGROUND}.png`} 
                    alt="Фон" 
                    className="absolute top-0 left-0 w-full h-full object-cover z-[1]" 
                    width={500}
                    height={500}
                />
                
                {/* Изображение подарка */}
                <img 
                    src={`/GIFT_IMAGES/GIFT/${imageOptions.GIFT}.png`} 
                    alt="Подарок" 
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 object-contain z-[2]" 
                    width={500}
                    height={500}
                />
                
                {/* Базовое украшение */}
                {!!imageOptions.DECORATION && (
                    <img 
                        src={`/GIFT_IMAGES/DECORATION/${imageOptions.DECORATION}.png`} 
                        alt="Украшение" 
                        className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 object-contain z-[3]" 
                        width={375}
                        height={375}
                    />
                )}
                
                {/* Рендерим все декорации */}
                {decorations.map(decoration => {
                    const isSelected = selectedDecoration === decoration.id;
                    
                    // Обработка различных типов декораций
                    switch (decoration.type) {
                        case DECORATION_TYPES.STICKER:
                            return (
                                <div 
                                    key={decoration.id}
                                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                                        isSelected ? 'border-2 border-dashed border-blue-500 rounded p-1 z-10' : 'z-5'
                                    }`}
                                    style={{
                                        left: `${decoration.x}%`,
                                        top: `${decoration.y}%`,
                                        width: `${decoration.size.width}%`,
                                        height: `${decoration.size.height}%`,
                                        transform: `translate(-50%, -50%) rotate(${decoration.rotation}deg)`,
                                        cursor: isDragging && draggedDecoration === decoration.id ? 'grabbing' : 'grab',
                                    }}
                                    onMouseDown={(e) => handleDecorationMouseDown(e, decoration.id)}
                                >
                                    <img 
                                        src={`/GIFT_IMAGES/DECORATION/${decoration.option}.png`}
                                        alt={`Sticker ${decoration.option}`}
                                        className="w-full h-full object-contain pointer-events-none"
                                    />
                                    
                                    {/* Маркер для изменения размера */}
                                    {isSelected && (
                                        <div 
                                            className="resize-handle absolute -right-3 -bottom-3 w-6 h-6 bg-blue-500 rounded-full cursor-nwse-resize border-2 border-white z-20 hover:scale-110 transition-transform"
                                        />
                                    )}
                                    
                                    {/* Кнопки для вращения */}
                                    {isSelected && (
                                        <div className="absolute -left-3 -bottom-3 flex gap-1">
                                            <button 
                                                className="rotate-handle w-6 h-6 bg-green-500 rounded-full text-white flex items-center justify-center border-2 border-white z-20 hover:scale-110 transition-transform"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRotate(decoration.id, -15);
                                                }}
                                            >
                                                ↺
                                            </button>
                                            <button 
                                                className="rotate-handle w-6 h-6 bg-green-500 rounded-full text-white flex items-center justify-center border-2 border-white z-20 hover:scale-110 transition-transform"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRotate(decoration.id, 15);
                                                }}
                                            >
                                                ↻
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        default:
                            return null;
                    }
                })}
            </div>
        </div>
    );
}

export default ResultImage;