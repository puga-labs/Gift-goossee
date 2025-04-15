import Image from 'next/image';

export function OptionsList({getter, setter, type}) {
    const imageOptionsCount = {
        'BACKGROUND': 4,
        'GIFT': 4,
        'DECORATION': 4,
    }
    
    return (
        <div className="bg-gray-100 rounded-lg p-4 shadow-sm">
            <h2 className="text-lg font-medium mb-4 text-gray-700">{type}</h2>
            <div className="grid grid-cols-4 gap-2.5">
              {Array.from({ length: imageOptionsCount[type] }).map((_, index) => (
                <div 
                  key={`${type.toLowerCase()}-${index}`}
                  className={`border-2 rounded-md overflow-hidden cursor-pointer transition-all duration-200 hover:translate-y-[-3px] hover:shadow-md ${
                    getter[type] === index ? 'border-blue-500' : 'border-transparent'
                  }`}
                  onClick={() => setter({...getter, [type]: index})}
                >
                    {type === 'DECORATION' && index === 0 ? (
                        <div className='w-full h-20 bg-gray-300'></div>
                    ) : (
                        <Image 
                            src={`/GIFT_IMAGES/${type}/${index}.png`} 
                            alt={`${type} ${index + 1}`}
                            width={100}
                            height={100}
                            className="w-full h-20 object-cover block"
                        />
                    )}
                </div>
              ))}
            </div>
        </div>
    )
}
