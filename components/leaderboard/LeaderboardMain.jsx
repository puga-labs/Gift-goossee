"use client"
import React, { useState } from "react"
import LeaderboardFake from "./leaderboardFake"
import { FaCrown } from "react-icons/fa"

const LeaderboardMain = () => {
  const [leaderboard, setLeaderboard] = useState("sender")

  // Сортировка данных по убыванию в зависимости от выбранного режима
  const sortedLeaderboard = [...LeaderboardFake].sort((a, b) =>
    leaderboard === "sender"
      ? b.sendGift - a.sendGift
      : b.receiveGift - a.receiveGift
  )

  return (
    <div className="bg-purple-100 w-full h-full flex flex-col items-center justify-start bg-grid ">
      <div className="py-4 px-40 text-2xl font-bold bg-green-200 rounded-b-lg border-b border-r border-l">
        <h1>Leaderboard</h1>
      </div>
      {/* leaderboard fake */}
      <div className="w-full h-full flex flex-col items-center justify-start">
        <div className="w-full h-full flex items-center justify-center space-x-16">
          <FaCrown className="text-[66px] rotate-[-12deg]" />
          <div className="w-1/3 h-3/4 flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center justify-center space-x-8 ">
              <button
                onClick={() => setLeaderboard("sender")}
                className={`border rounded-lg py-2  w-24
            transition-all duration-300 cursor-pointer
            ${
              leaderboard === "sender"
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
              >
                Senders
              </button>
              <button
                onClick={() => setLeaderboard("receiver")}
                className={`border rounded-lg py-2 w-24
            transition-all duration-300 cursor-pointer
            ${
              leaderboard === "receiver"
                ? "bg-black text-white"
                : "bg-white text-black"
            }`}
              >
                Receivers
              </button>
            </div>
            <div className="w-full h-[600px] border rounded-lg shadow-main bg-white flex flex-col items-center justify-start px-2 py-2">
              <div className="w-full flex items-center justify-between px-8 py-2 bg-blue-200 rounded-lg">
                <p className="w-1/12 text-center">Rank</p>
                <p className="w-10/12 text-center">Address</p>
                <p className="w-1/12 flex justify-center items-center">
                  Points
                </p>
              </div>
              <div className="w-full h-full mt-4 flex flex-col items-center justify-start overflow-y-auto scrollbar-hide ">
                {sortedLeaderboard.map((item, index) => (
                  <div
                    key={index}
                    className="flex w-full items-center justify-between px-8 py-2 border-b-2 border-black/10"
                  >
                    <p className="w-1/12 text-center">{index + 1}</p>
                    <p className="w-10/12 text-center">
                      {item.address.slice(0, 6)}...{item.address.slice(-4)}
                    </p>
                    <p className="w-1/12 flex justify-center items-center">
                      {leaderboard === "sender"
                        ? item.sendGift
                        : item.receiveGift}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <FaCrown className="text-[66px] rotate-[12deg]" />
        </div>
      </div>
    </div>
  )
}

// Стили для скрытия скроллбара
const styles = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`
export default function LeaderboardMainWithStyles() {
  return (
    <>
      <style jsx global>
        {styles}
      </style>
      <LeaderboardMain />
    </>
  )
}
