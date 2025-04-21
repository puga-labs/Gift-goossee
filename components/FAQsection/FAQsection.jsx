"use client";

import React from "react";
import { motion } from "framer-motion";

const faqData = [
  {
    question: "What even is Goossee?",
    answer:
      "A Web3 gift‑launcher that wraps your crypto in memes, animations and an NFT card — so a boring transfer turns into a mini‑party.",
  },
  {
    question: "Which chains are supported?",
    answer: "At this moment, we only support Monad Testnet.",
  },
  {
    question: "Can I schedule a gift for the future?",
    answer:
      "Yep. Pick any date & time — our smart‑contract puts the tokens in quarantine until the clock hits.",
  },
  {
    question: "Gas fees — who pays?",
    answer:
      "The sender covers gas at checkout. Your friend opens the gift → $0 fees for them. Friendship is free.",
  },
];

const FAQsectionWithStyles = ({ question, answer }) => (
  <div className="border border-black rounded-lg p-4 shadow-main bg-white h-48">
    <h1 className="text-xl font-bold border-b-2 border-black/10 pb-2">
      {question}
    </h1>
    <p className="text-base text-gray-500 pt-4">{answer}</p>
  </div>
);

export default function FAQsection() {
  return (
    <section id="faq" className="bg-purple-100 w-full h-full flex flex-col items-center justify-start">
      {/* Title */}
      <motion.div
        className="py-4 px-40 text-2xl font-bold bg-green-200 rounded-b-lg border-b border-r border-l"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <h1>FAQ</h1>
      </motion.div>

      {/* FAQ Grid */}
      <div className="w-1/2 grid grid-cols-2 gap-12 mt-24">
        {faqData.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          >
            <FAQsectionWithStyles
              question={faq.question}
              answer={faq.answer}
            />
          </motion.div>
        ))}
      </div>

      {/* Button */}
      <motion.div
        className="flex justify-center items-center mt-32"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <button
          onClick={() => {
            window.location.href = "/send";
          }}
          className="btn-big mb-24 animate-bounce"
        >
          Send a gift!
        </button>
      </motion.div>
    </section>
  );
}
