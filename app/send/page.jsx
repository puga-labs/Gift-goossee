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
    });

    const [txData, setTxData] = useState({
        to: '',
        amount: '',
        message: '',
        animation: 'Default',
        mintDate: new Date(),
      });

    // Массив добавленных декораций
    const [decorations, setDecorations] = useState([]);
    
    // ID выбранной декорации
    const [selectedDecoration, setSelectedDecoration] = useState(null);

    return (
        <div className="relative min-h-screen overflow-x-hidden flex flex-col
         items-center justify-start bg-purple-100 w-full select-none pt-[80px]">
            <div className="flex flex-row gap-[2vh] justify-center">
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

            <div className="flex flex-col justify-start items-center max-w-[360px]">
                {/* Обновлённый ResultImage с поддержкой декораций */}
                <ResultImage 
                    imageOptions={imageOptions} 
                    decorations={decorations}
                    onDecorationsChange={setDecorations}
                    selectedDecoration={selectedDecoration}
                    onSelectDecoration={setSelectedDecoration}
                    message={txData.message}
                />
                
                {/* Форма отправки подарка */}
                <SendForm 
                    imageOptions={imageOptions}
                    decorations={decorations}
                    txData={txData}
                    setTxData={setTxData}
                />
            </div>
            </div>
        </div>
    );
}

export default Page;
