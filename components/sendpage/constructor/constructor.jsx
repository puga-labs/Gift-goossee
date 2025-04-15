'use client'
import { OptionsList } from './optionsList'
import DecorationManager from './decorationsManager'

export function Constructor({imageOptions, setImageOptions, decorations, onDecorationsChange, selectedDecoration, onSelectDecoration}) {
    return (
        <div className="flex flex-col gap-5 w-[500px] h-full">
            <OptionsList getter={imageOptions} setter={setImageOptions} type='BACKGROUND' />
            <OptionsList getter={imageOptions} setter={setImageOptions} type='GIFT' />
            <DecorationManager 
                decorations={decorations}
                onDecorationsChange={onDecorationsChange}
                selectedDecoration={selectedDecoration}
                onSelectDecoration={onSelectDecoration}
            />
        </div>
    )
}
