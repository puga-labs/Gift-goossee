import Image from 'next/image';

export function OptionsList({getter, setter, type}) {
    const imageOptionsCount = {
        'BACKGROUND': 4,
        'GIFT': 4,
        'DECORATION': 4,
    }
    
    return (
        <div className=" border rounded-lg shadow-main bg-white relative p-4 flex flex-col items-start justify-start">
          <div className="flex flex-col items-start justify-start space-y-2 w-full">
            <h1 className="text-2xl font-bold border-b-2 border-black/10 pb-2 w-full">{
                type === 'BACKGROUND' ? 'Background' : type === 'GIFT' ? 'Gift' : 'Stickers'
            }</h1>
            <div className="grid grid-cols-5 gap-2.5 text-lg pt-4">
              {Array.from({ length: imageOptionsCount[type] }).map((_, index) => (
                <div 
                  key={`${type.toLowerCase()}-${index}`}
                  className={`overflow-hidden border  border-black rounded-lg cursor-pointer transition-all duration-200 hover:translate-y-[-3px] hover:shadow-md ${
                    getter[type] === index ? 'shadow-main ' : 'opacity-50'
                  }`}
                  onClick={() => setter({...getter, [type]: index})}
                >
                        <Image 
                            src={`/GIFT_IMAGES/${type}/${index}.png`} 
                            alt={`${type} ${index + 1}`}
                            width={150}
                            height={150}
                            className="w-full h-20 object-cover block"
                        />
                </div>
              ))}
            </div>
            </div>
        </div>
    )
}
