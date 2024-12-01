"use client";

import { useState } from "react";
import Link from "next/link";

export default function Page() {
    const [hide, setHide] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try{
            const resLogin = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if(resLogin.ok) {

            } else {
                console.log("User registration failed");
            }

        } catch (error) {console.log("User registration failed");}
    }

    return (
        <div className="flex flex-col bg-gradient-to-r from-[#3872be] to-[#bde7ff]">
            <div className="w-full bg-white rounded-lg mx-auto my-10 sm:max-w-md xl:p-0 border-2 border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-2xl font-bold leading-tight tracking-tight text-black md:text-2xl">
                        Sign in to your Account
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleLogin}>
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-lg font-medium text-black"
                            >
                                Your email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="bg-white border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                                placeholder="email@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                type={hide ? "text" : "password"}
                                id="password"
                                placeholder="Your Password"
                                className="bg-white border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required={true}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input
                                        id="hide"
                                        aria-describedby="hide"
                                        type="checkbox"
                                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        required={false}
                                        onClick={() => {setHide(!hide);}}
                                    />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="hide" className="text-black">
                                        {hide ? "Hide Password" : "Show Password"}
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row items-center justify-center">
                            <button
                                type="submit"
                                className="w-[120px] sm:w-[150px] text-white duration-300 bg-[#0049AB] hover:bg-[#2081ff] font-medium rounded-lg text-md px-5 py-2.5 text-center"
                            >
                                Sign in
                            </button>
                        </div>
                        <p className="text-sm font-light text-black">
                            Don't have an account?{" "}
                            <Link
                                href={"/register"}
                                className="font-medium text-primary-600 hover:underline"
                            >
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
