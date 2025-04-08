import CurveText from "./CurveText"
import MainButtons from "./MainButtons"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="purpleBox">
      <div className="flex h-full w-full flex-col items-center justify-center relative">
        <div className="absolute top-[26%] left-1/2 transform -translate-x-1/2">
          <CurveText />
        </div>
        <GoosseeHero />
        <MainButtons />
        <EyeLogo />
        <ConnectWallet />
      </div>
    </div>
  )
}

export default Hero

const GoosseeHero = () => {
  return (
    <div className=" mb-[-200px] pointer-events-none select-none">
      <Image
        src="/hero-goossee2.png"
        alt="Goossee"
        width={600}
        height={300}
        priority
      />
    </div>
  )
}

const EyeLogo = () => {
  return (
    <div className="absolute top-0 left-0">
      <Image src="/eye.png" alt="Eye Logo" width={100} height={100} priority />
    </div>
  )
}


const ConnectWallet = () => {
  return (
    <div className="absolute top-4 right-4">
      <button className="px-6 py-3 text-black font-lacker cursor-pointer bg-orange-300 border rounded-full ">
        Connect wallet
      </button>
    </div>
  )
}


