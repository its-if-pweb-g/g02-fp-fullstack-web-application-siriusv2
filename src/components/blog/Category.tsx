import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Category() {
  return (
    <div className="md:mx-44 mx-16">
      <h1 className="text-xl font-semibold mb-7">Top Visited</h1>
      <div className="flex flex-wrap gap-4">
        <Link
          href="#"
          className="md:w-[23%] h-12 w-full rounded-lg items-center text-center flex justify-center bg-indigo-100 text-gray-700 font-semibold hover:bg-indigo-50 transition duration-300 ease-in-out shadow-md"
        >
          Sport
        </Link>
        <Link
          href="#"
          className="md:w-[23%] h-12 w-full rounded-lg items-center text-center flex justify-center  bg-indigo-100 text-gray-700 font-semibold hover:bg-indigo-50 transition duration-300 ease-in-out shadow-md"
        >
          Programming
        </Link>
        <Link
          href="#"
          className="md:w-[23%] h-12 w-full rounded-lg items-center text-center flex justify-center  bg-indigo-100 text-gray-700 font-semibold hover:bg-indigo-50 transition duration-300 ease-in-out shadow-md"
        >
          CyberSecurity
        </Link>
        <Link
          href="#"
          className="md:w-[23%] h-12 w-full rounded-lg items-center text-center flex justify-center  bg-indigo-100 text-gray-700 font-semibold hover:bg-indigo-50 transition duration-300 ease-in-out shadow-md"
        >
          AI
        </Link>
        <Link
          href="#"
          className="md:w-[23%] h-12 w-full rounded-lg items-center text-center flex justify-center  bg-indigo-100 text-gray-700 font-semibold hover:bg-indigo-50 transition duration-300 ease-in-out shadow-md"
        >
          Healthy food
        </Link>
        <Link
          href="#"
          className="md:w-[23%] h-12 w-full rounded-lg items-center text-center flex justify-center  bg-indigo-100 text-gray-700 font-semibold hover:bg-indigo-50 transition duration-300 ease-in-out shadow-md"
        >
          Junk food
        </Link>
      </div>
    </div>
  );
}
