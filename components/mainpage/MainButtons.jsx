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
        className="px-20 py-6 rounded-xl text-white border-[2px]
      border-black relative z-[10]  btnAnimation hover:bg-orange-500 
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
      <button className="px-4 py-2
      btnAnimation hover:bg-purple-500
      text-white text-xl border-black outlined-text-sm bg-purple-400 border-2 rounded-xl relative z-[10] cursor-pointer">
        Receive
      </button>
    </Link>
  )
}
