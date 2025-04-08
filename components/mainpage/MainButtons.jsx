import Link from "next/link"


const MainButtons = () => {
  return (
    <div>
      <div className="  p-5  flex flex-col items-center justify-center font-lacker space-y-4">
        <SendButton />
        <ReceiveButton />
      </div>
    </div>
  )
}

export default MainButtons

const SendButton = () => {
  return (
    <Link href="/send">
      <button
        className="px-20 py-6 rounded-full text-white border-[2px]
      border-black relative z-[10]
      text-5xl bg-orange-300 cursor-pointer outlined-text"
      >
        Drop a Gift🎉
      </button>
    </Link>
  )
}


const ReceiveButton = () => {
  return (
    <Link href="/receive">
      <button className="px-4 py-2 text-black bg-purple-400 border rounded-full relative z-[10] cursor-pointer">
        Receive
      </button>
    </Link>
  )
}
