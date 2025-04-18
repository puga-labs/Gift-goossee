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
        <div className="relative min-h-screen overflow-x-hidden p-[2vh] space-y-[2vh] font-lacker  gap-[2vh] bg-purple-100 w-full ">
            <div className="flex flex-row gap-[2vh] justify-center pt-16">
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

            <div className="flex flex-col gap-[2vh] max-w-[360px]">
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
        </div>
    );
}

export default Page;
