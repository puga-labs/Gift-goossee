import React from "react"
import Image from "next/image"
const HowMain = () => {
  return (
    <div className="flex flex-col items-center justify-start bg-purple-100 min-h-screen">
      <div className="py-4 px-40 text-2xl font-bold bg-green-200 rounded-b-lg border-b border-r border-l">
        How it works?
      </div>
      <div className="w-full flex items-center justify-center space-x-[40px] mt-[100px]">
        <HowItem step={1} title="Customize and create your NFT">
          <div className="w-full h-full flex items-center justify-between space-x-6">
            <div className="w-full h-full px-2 py-8 flex flex-col justify-center space-y-4 items-center">
              <div className="w-full border p-2 flex items-center justify-between rounded-lg shadow-main bg-orange-300 text-sm">
                <p>Background</p>
                <p>icon</p>
              </div>
              <div className="w-full border p-2 flex items-center justify-between rounded-lg shadow-main bg-orange-300 text-sm">
                <p>Stickers</p>
                <p>icon</p>
              </div>
              <div className="w-full border p-2 flex items-center justify-between rounded-lg shadow-main bg-orange-300 text-sm">
                <p>Text</p>
                <p>icon</p>
              </div>
            </div>
            <Image
              src="/step1goossee.png"
              alt="gossee"
              width={200}
              height={100}
            />
          </div>
        </HowItem>
        <HowItem step={2} title="Pick Date, Gift & Animation">
          <div className="w-full h-full flex flex-col items-center justify-between  space-y-4 px-2 py-8">
            <div className="w-full h-full flex  items-center justify-between  p-2 rounded-lg shadow-main bg-orange-300 text-sm border">
              <p className="text-lg">Choose Date</p>
              <p className="text-sm">05.05.2025</p>
            </div>
            <div className="w-full h-full flex items-center justify-between  p-2 rounded-lg shadow-main bg-orange-300 text-sm border">
              <p className="text-lg">Choose Gift</p>
              <p className="text-sm">10 MON</p>
            </div>
            <div className="w-full h-full flex items-center justify-between  p-2 rounded-lg shadow-main bg-orange-300 text-sm border">
              <p className="text-lg">Choose Animation</p>
              <p className="text-sm">Legendary</p>
            </div>
          </div>
        </HowItem>
      </div>
      <div className="w-full flex items-center justify-center space-x-[10vw] mt-[40px] ">
        <HowItem step={3} title="Send Vibes to your bestie!" >
          <div className="w-full h-full flex items-center justify-center px-2 py-4 space-x-4">
            <div className="w-2/3 h-3/4 flex items-center justify-start pl-4 border rounded-lg ">
              mybestie.eth
            </div>
            <div className="w-1/3 h-full flex items-center justify-center btn-sm text-xl!">
             Send!
            </div>
          </div>
        </HowItem>
      </div>
      <div className="w-full flex items-center justify-center space-x-[10vw] mt-[40px] pb-[100px]">
        <HowItem step={4} title="Copy & Send link" >
          <h1 className="text-lg">Your gift is waiting you!</h1>
        </HowItem>
      </div>
    </div>
  )
}

export default HowMain

const HowItem = ({ children, step, title }) => {
  return (
    <div
      style={{
        height: step === 3 ? "144px" : "288px",
        width: step === 3 ? "35%" : "20%",
      }}
      className=" border rounded-lg shadow-main bg-white relative p-2 flex flex-col items-start justify-start"
    >
      <div className="flex  items-center justify-start space-x-2 w-full">
        <div className="w-8 h-8 bg-green-200 rounded-lg flex items-center justify-center border">
          {step}
        </div>
        <h1 className="text-md font-bold">{title}</h1>
      </div>
      {children}
    </div>
  )
}
