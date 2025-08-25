"use client";
import React, { useState } from "react";

const FAQ = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "How accurate are the prices?",
      answer: "We use real-time data from major travel APIs. Prices include flights, hotels, food, activities, and local transport. We update daily to ensure accuracy.",
    },
    {
      question: "What if I can't find the exact destination?",
      answer: "Our AI can identify most landmarks and popular destinations. If it can't find the exact spot, we'll suggest the closest match with similar pricing.",
    },
    {
      question: "Can I customize the trip details?",
      answer: "Yes! You can adjust travel dates, number of travelers, accommodation preferences, and toggle activities like shopping, nightlife, or museums.",
    },
    {
      question: "Is this a subscription?",
      answer: "Nope. You pay once ($14.99) and have access forever. No hidden fees, no recurring charges.",
    },
    {
      question: "What if prices change after I check?",
      answer: "Prices fluctuate daily. We show current market rates, but always double-check with airlines and hotels before booking. We're a planning tool, not a booking platform.",
    },
  ];

  return (
  
    <div className="m-auto w-full max-w-5xl mt-2 mb-3 p-4">
      <div className="flex flex-col justify-center items-center p-2">
       <span className="p-5 faq-span">FAQ</span>
      </div>
      <section id="faq" className="faq my-4">
        <section className="badge-group"></section>
        <h2 className="font-semibold text-3xl lg:text-5xl text-center mx-auto">
          Common questions
        </h2>

        <section className="accordion--container my-16 max-w-3xl mx-auto">
          <div className="accordion-item--container border border-neutral-200 bg-white overflow-hidden border-t-0 rounded-b-lg">
            {faqItems.map((item, index) => (
              <div className="accordion-item--wrapper" key={index}>
                <h2 className="accordion-item--heading mb-0">
                  <button
                    className="group relative flex w-full font-semibold items-center border-0 bg-white py-4 px-5 text-left text-base text-neutral-800 transition"
                    type="button"
                    aria-expanded={expandedIndex === index ? "true" : "false"}
                    onClick={() => toggleAccordion(index)}
                  >
                    {item.question}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      role="img"
                      className={`ml-auto h-8 w-8 shrink-0 transition-transform duration-200 ease-in-out motion-reduce:transition-none iconify iconify--material-symbols ${
                        expandedIndex === index ? "rotate-180" : ""
                      }`}
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="m12 10.8l-3.9 3.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.6-4.6q.3-.3.7-.3t.7.3l4.6 4.6q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z"
                      ></path>
                    </svg>
                  </button>
                </h2>
                <div
                  className={`accordion-item--content py-4 px-5 text-base ${
                    expandedIndex === index ? "block" : "hidden"
                  }`}
                  style={{
                    width: "100%",
                    overflow: "hidden",
                    transition: "max-height 0.3s ease-out",
                    maxHeight: expandedIndex === index ? "500px" : "0",
                  }}
                >
                  <p className="bold">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default FAQ;
