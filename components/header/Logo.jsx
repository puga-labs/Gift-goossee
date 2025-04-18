import Image from "next/image"

const EyeLogo = () => {
    return (
      <div className=" h-16 flex items-center justify-center">
        <Image src="/eye.png" alt="Eye Logo" width={66} height={66} priority />
        <h1 className="text-2xl font-bold select-none">Goossee</h1>
      </div>
    )
  }

  export default EyeLogo
