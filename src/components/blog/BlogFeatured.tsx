"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BlogFeatured() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleCreateClick = () => {
    if (isLoggedIn) {
      router.push("/create-post");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="mx-16 lg:mx-44 items-center mb-10">
      <h1 className="md:text-5xl py-10 text-2xl font-bold">
        This is the Sirius project V2. Stay tuned!!
      </h1>
      <div className="md:flex md:gap-5 md:items-center md:justify-center">
        <div className="w-1/2">
          <Image
            src={"/blog/contoh.jpeg"}
            alt="contoh"
            width={450}
            height={500}
            className="rounded-lg hidden md:block"
          />
        </div>
        <div className="md:w-1/2 w-full">
          <h1 className="font-bold lg:text-2xl mb-4 text-xl">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex gap-3 my-3">
            <button className="transition duration-300 ease-in-out p-3 rounded-lg shadow-lg">
              Read more
            </button>
            <button
              onClick={handleCreateClick}
              className="transition duration-300 ease-in-out p-3 rounded-lg shadow-lg bg-blue-500 text-white hover:bg-blue-700"
            >
              Create Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
