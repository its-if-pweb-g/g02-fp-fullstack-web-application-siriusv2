import React from "react";
import Image from "next/image";

export default function BlogFeatured() {
    return (
        <div className="mx-44 items-center mb-10">
            <h1 className="py-10 text-5xl font-bold">
                This is the Sirius project V2. Stay tunned!!.
            </h1>
            <div className="flex gap-5 items-center justify-center ">
                <div className="w-1/2">
                    <Image
                        src={"/blog/contoh.jpeg"}
                        alt="contoh"
                        width={450}
                        height={500}
                        className="rounded-lg"
                    />
                </div>
                <div className="w-1/2">
                    <h1 className="font-bold text-2xl mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                    </h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.
                    </p>
                    <button className="transition duration-300 ease-in-out p-3 rounded-lg my-3 shadow-lg">
                        Read more
                    </button>
                </div>
            </div>
        </div>
    );
}
