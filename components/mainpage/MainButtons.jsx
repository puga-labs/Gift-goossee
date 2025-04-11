import Link from "next/link"
import { TiGift } from "react-icons/ti"

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

      <button className="btn-big relative ">
        Drop a Gift

      </button>
    </Link>
  )
}

const ReceiveButton = () => {
  return (
    <Link href="/receive">

      <button className="btn-sm">Receive</button>

    </Link>
  )
}
