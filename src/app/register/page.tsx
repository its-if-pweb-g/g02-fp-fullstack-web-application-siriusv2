"use client";

import { useState } from "react";
import Link from "next/link";

export default function Page() {
    const [hide1, setHide1] = useState(false);
    const [hide2, setHide2] = useState(false);

    const [pass, setPass] = useState("");
    const [conPass, setConPass] = useState("");

    const isMatch = pass == conPass || conPass == "";

    return (
        <div className="flex flex-col bg-gradient-to-r from-[#3872be] to-[#bde7ff]">
            <div className="w-full bg-white rounded-lg mx-auto my-10 sm:max-w-md xl:p-0 border-2 border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-2xl font-bold leading-tight tracking-tight text-black md:text-2xl">
                        Sign up an Account
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label
                                htmlFor="name"
                                className="block mb-2 text-lg font-medium text-black"
                            >
                                Your Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="bg-white border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                                placeholder="Budi Utomo"
                                required={true}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-lg font-medium text-black"
                            >
                                Your email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-white border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                                placeholder="example@company.com"
                                required={true}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-lg font-medium text-black"
                            >
                                Password
                            </label>
                            <input
                                type={hide1 ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="Your Password"
                                className="bg-white border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                                required={true}
                                onChange={(e) => {
                                    setPass(e.target.value);
                                }}
                            />
                        </div>
                        {/* hide for password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="hide1"
                                        aria-describedby="hide"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        required={true}
                                        onClick={() => {
                                            setHide1(!hide1);
                                        }}
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label
                                        htmlFor="hide1"
                                        className="text-black"
                                    >
                                        {hide1
                                            ? "Hide Password"
                                            : "Show Password"}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-lg font-medium text-black"
                            >
                                Confirm Password
                            </label>
                            <input
                                type={hide2 ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="Your Password"
                                className={`bg-white border text-black rounded-lg block w-full p-3 ${
                                    isMatch
                                        ? "border-gray-300"
                                        : "border-red-600"
                                }`}
                                required={true}
                                onChange={(e) => {
                                    setConPass(e.target.value);
                                }}
                            />
                            {isMatch ? (
                                <></>
                            ) : (
                                <h1 className="mt-2 text-xs text-red-600">
                                    Password Not Matched
                                </h1>
                            )}
                        </div>
                        {/* hide for confirm password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="hide2"
                                        aria-describedby="hide2"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        required={true}
                                        onClick={() => {
                                            setHide2(!hide2);
                                        }}
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label
                                        htmlFor="hide2"
                                        className="text-black"
                                    >
                                        {hide2
                                            ? "Hide Password"
                                            : "Show Password"}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-center">
                            <button
                                type="submit"
                                className="w-[120px] sm:w-[150px] text-white duration-300 bg-[#0049AB] hover:bg-[#2081ff] font-medium rounded-lg text-md px-5 py-2.5 text-center"
                            >
                                Sign Up
                            </button>
                        </div>
                        <p className="text-sm font-light text-black">
                            Already have an account?{" "}
                            <Link
                                href={"/login"}
                                className="font-medium text-primary-600 hover:underline"
                            >
                                Login Here
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
