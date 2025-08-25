"use client";
import Image from "next/image";
import Placeholder from "/public/placeholder.svg";
import arrow1 from "/public/arrow1.svg";
import arrow2 from "/public/arrow2.svg";
import underline from "/public/underline.svg";

const Features = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center my-20 p-10 ">
        <div className="text-center mb-5">
          <h2 className="text-4xl font-bold">
            How it works{" "}
            <span>
              <Image
                src={underline}
                alt="Underline"
                height={20}
                className="mx-auto span-image"
              ></Image>
            </span>
          </h2>
          <p className="text-lg my-5">
            Stop dreaming, start planning. <strong>Get real prices</strong> in seconds.
          </p>
        </div>
        <div className="items my-2 ">
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-5">
            <li className="flex flex-col items-center text-center">
              <h2 className="mx-auto emoji">📸</h2>
              <h2 className="text-lg font-bold">
                Upload travel photo
              </h2>
            </li>
            <li className="flex flex-col items-center text-center">
              <Image
                src={arrow1}
                alt="Arrow"
                height={80}
                className="mx-auto arrow"
              />
            </li>
            <li className="flex flex-col items-center text-center">
              <h1 className="mx-auto emoji">🔍</h1>
              <h2 className="text-lg font-bold">AI finds destination</h2>
            </li>
            <li className="flex flex-col items-center text-center">
              <Image
                src={arrow2}
                alt="Arrow"
                height={80}
                className="mx-auto arrow"
              />
            </li>
            <li className="flex flex-col items-center text-center">
              <h2 className="mx-auto emoji last">💰</h2>
              <h2 className="text-lg font-bold">Get real cost breakdown</h2>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Features;
