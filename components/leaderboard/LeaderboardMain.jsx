"use client";

import React, { useState, useEffect } from "react";
import { FaCrown } from "react-icons/fa";
import { motion } from "framer-motion";
import LeaderboardFake from "./leaderboardFake";
import { getLeaderboard } from "../../lib/utils/leaderboard";

const LeaderboardMain = () => {
  const [leaderboard, setLeaderboard] = useState("sender");
  const [leaderboardData, setLeaderboardData] = useState(LeaderboardFake);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const data = await getLeaderboard();
      setLeaderboardData(data);
    };
    fetchLeaderboard();
  }, []);

  const sortedLeaderboard = [...leaderboardData].sort((a, b) =>
    leaderboard === "sender" ? b.sent - a.sent : b.mint - a.mint
  );

  return (
    <section id="leaderboard" className="bg-purple-100 w-full min-h-screen flex flex-col items-center justify-center bg-grid relative">
      {/* Title Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="py-4 px-40 text-2xl font-bold bg-green-200 rounded-b-lg border-b border-r border-l absolute top-0"
      >
        <h1>Leaderboard</h1>
      </motion.div>

      <div className="w-full h-full flex flex-col items-center justify-start pt-24">
        <div className="w-full flex items-center justify-center space-x-16">
          {/* Left Crown */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FaCrown className="text-[66px] rotate-[-12deg]" />
          </motion.div>

          <div className="w-1/3 h-3/4 flex flex-col items-center justify-center space-y-4">
            {/* Toggle Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center justify-center space-x-8"
            >
              <button
                onClick={() => setLeaderboard("sender")}
                className={`border rounded-lg py-2 w-24 transition-all duration-300 cursor-pointer ${
                  leaderboard === "sender"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                Senders
              </button>
              <button
                onClick={() => setLeaderboard("receiver")}
                className={`border rounded-lg py-2 w-24 transition-all duration-300 cursor-pointer ${
                  leaderboard === "receiver"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                Receivers
              </button>
            </motion.div>

            {/* Table Container */}
            <div className="w-full h-[600px] border rounded-lg shadow-main bg-white flex flex-col items-center justify-start px-2 py-2">
              {/* Header Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="w-full flex items-center justify-between px-8 py-2 bg-blue-200 rounded-lg"
              >
                <p className="w-1/12 text-center">Rank</p>
                <p className="w-10/12 text-center">Address</p>
                <p className="w-1/12 flex justify-center items-center">Points</p>
              </motion.div>

              {/* Data Rows */}
              <div className="w-full h-full mt-4 flex flex-col items-center justify-start overflow-y-auto scrollbar-hide cursor-pointer">
                {sortedLeaderboard.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
                    className="flex w-full items-center justify-between px-8 py-2 border-b-2 border-black/10"
                  >
                    <p className="w-1/12 text-center relative">
                      {index + 1}
                      {index === 0 && (
                        <span className="text-sm absolute top-1/2 -translate-y-1/2 left-8">
                          <FaCrown color="black" />
                        </span>
                      )}
                    </p>
                    <p className="w-10/12 text-center">
                      {item.id.slice(0, 6)}...{item.id.slice(-4)}
                    </p>
                    <p className="w-1/12 flex justify-center items-center">
                      {leaderboard === "sender" ? item.sent : item.mint}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Crown */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FaCrown className="text-[66px] rotate-[12deg]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Styles for hiding scrollbar
const styles = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export default function LeaderboardMainWithStyles() {
  return (
    <>
      <style jsx global>{styles}</style>
      <LeaderboardMain />
    </>
  );
}
