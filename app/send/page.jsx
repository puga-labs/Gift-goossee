'use client'
import React, { useState } from 'react';
import { Constructor } from '../../components/sendpage/constructor/constructor.jsx';
import { ResultImage } from '../../components/sendpage/resultImage.jsx';
import { SendForm } from '../../components/sendpage/sendForm.jsx';

/**
 * Страница конструктора подарков с поддержкой декораций
 */
const Page = () => {
    // Базовые опции изображения
    const [imageOptions, setImageOptions] = useState({
        BACKGROUND: 0,
        GIFT: 0,
        DECORATION: 0,
    });

    // Массив добавленных декораций
    const [decorations, setDecorations] = useState([]);
    
    // ID выбранной декорации
    const [selectedDecoration, setSelectedDecoration] = useState(null);

    return (
        <div className="relative min-h-screen overflow-x-hidden p-[2vh] space-y-[2vh] bg-black font-lacker flex flex-row gap-[2vh] purpleBox">
            <div className="flex flex-col gap-[2vh]">
                <Constructor 
                    imageOptions={imageOptions} 
                    setImageOptions={setImageOptions}
                    decorations={decorations}
                    onDecorationsChange={setDecorations}
                    selectedDecoration={selectedDecoration}
                    onSelectDecoration={setSelectedDecoration}
                />
            </div>

            <div className="flex flex-col bg-gray-100 rounded-lg p-4 shadow-md h-[900px] w-[600px]">
                {/* Обновлённый ResultImage с поддержкой декораций */}
                <ResultImage 
                    imageOptions={imageOptions} 
                    decorations={decorations}
                    onDecorationsChange={setDecorations}
                    selectedDecoration={selectedDecoration}
                    onSelectDecoration={setSelectedDecoration}
                />
                
                {/* Форма отправки подарка */}
                <SendForm 
                    imageOptions={imageOptions}
                    decorations={decorations}
                />
            </div>
        </div>
    );
}

export default Page;
