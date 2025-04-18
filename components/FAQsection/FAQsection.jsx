"use client"

import React from "react"

const faqData = [
  {
    question: "Question 1",
    answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
  },
  {
      question: "Question 2",
    answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
  },
  {
    question: "Question 3",
    answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
  },
  {
    question: "Question 4",
    answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
  }
]

const FAQsection = () => {
  return (
    <div className="bg-purple-100 w-full h-full flex flex-col items-center justify-start">
      <div className="py-4 px-40 text-2xl font-bold bg-green-200 rounded-b-lg border-b border-r border-l">
        <h1>FAQ</h1>
      </div>
      <div className="w-1/2 h-1/2 grid grid-cols-2 gap-12 mt-24">
        {faqData.map((faq, index) => (
          <FAQsectionWithStyles key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
      <div className="flex justify-center items-center mt-32">
        <button
        onClick={() => {
          window.location.href = "/send"
        }}
        className="btn-big">
          Make a gift!
        </button>
      </div>
    </div>
  )
}

export default FAQsection

const FAQsectionWithStyles = ({question, answer}) => {
  return (
    <div className="border border-black rounded-lg p-4 shadow-main bg-white">
      <h1 className="text-2xl font-bold border-b-2 border-black/10 pb-2">{question}</h1>
      <p className="text-lg pt-4">
        {answer}
      </p>
    </div>
  )
}
