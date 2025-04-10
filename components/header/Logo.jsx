import Image from "next/image"


const EyeLogo = () => {
  return (
    <div className=" w-16 h-16 flex items-center justify-center">
      <Image src="/eye.png" alt="Eye Logo" width={120} height={120} priority />
    </div>
  )
}

export default EyeLogo
