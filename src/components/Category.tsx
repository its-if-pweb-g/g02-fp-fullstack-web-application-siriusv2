import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Category() {
  return (
    <div className="mx-44 mb-10">
      <h1 className="text-xl font-semibold mb-7">Top Visited</h1>
      <div className="flex flex-wrap gap-4">
        <div className="w-[23%] h-12 rounded-lg items-center text-center flex justify-center bg-indigo-100 text-gray-700 font-semibold hover:bg-indigo-50 transition duration-300 ease-in-out">
          Sport
        </div>
        <div className="w-[23%] h-12 rounded-lg items-center text-center flex justify-center  bg-indigo-100 text-gray-700 font-semibold hover:bg-indigo-50 transition duration-300 ease-in-out">
          Programming
        </div>
        <div className="w-[23%] h-12 rounded-lg items-center text-center flex justify-center  bg-indigo-100 text-gray-700 font-semibold hover:bg-indigo-50 transition duration-300 ease-in-out">
          CyberSecurity
        </div>
        <div className="w-[23%] h-12 rounded-lg items-center text-center flex justify-center  bg-indigo-100 text-gray-700 font-semibold hover:bg-indigo-50 transition duration-300 ease-in-out">
          AI
        </div>
        <div className="w-[23%] h-12 rounded-lg items-center text-center flex justify-center  bg-indigo-100 text-gray-700 font-semibold hover:bg-indigo-50 transition duration-300 ease-in-out">
          Healthy food
        </div>
        <div className="w-[23%] h-12 rounded-lg items-center text-center flex justify-center  bg-indigo-100 text-gray-700 font-semibold hover:bg-indigo-50 transition duration-300 ease-in-out">
          Junk food
        </div>
      </div>
    </div>
  );
}
