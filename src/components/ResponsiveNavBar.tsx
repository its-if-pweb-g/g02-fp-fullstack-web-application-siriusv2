"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { MdPeopleAlt } from "react-icons/md";
import LoginContext from "./context/LoginContext";
import { useRouter } from "next/navigation";
import { GoHome } from "react-icons/go";
import { RiBloggerLine } from "react-icons/ri";
import { FaUserTie } from "react-icons/fa";

export default function ResponsiveNavBar() {
    const [dropDown, setDropDown] = useState(false);
    const [isMd, setIsMd] = useState(false);

    const { login, setLogin } = useContext(LoginContext);

    const router = useRouter();

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 768px)");

        const handleMediaQueryChange = (event: any) => {
            setIsMd(event.matches);
        };

        setIsMd(mediaQuery.matches);

        mediaQuery.addEventListener("change", handleMediaQueryChange);

        return () => {
            mediaQuery.removeEventListener("change", handleMediaQueryChange);
        };
    }, []);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("/api/check-auth");
                if (res.ok) {
                    setLogin(true);
                } else {
                    setLogin(false);
                }
            } catch {
                setLogin(false);
            }
        };
        checkAuth();
    }, []);

    const handleLogout = async () => {
        try {
            const res = await fetch("/api/logout", { method: "POST" });
            if (res.ok) {
                setLogin(false);
                window.location.href = "/";
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("Error logging out", error);
        }
    };

    return (
        <div>
            <nav className="bg-white">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link
                        href="/"
                        className="flex items-center space-x-3 rtl:space-x-reverse"
                    >
                        <Image
                            src={"/logo.png"}
                            alt="Logo Sirius"
                            width={65}
                            height={65}
                            className="w-[35px] h-[35px] sm:w-[65px] sm:h-[65px]"
                        />
                        <span className="text-black self-center text-2xl font-semibold whitespace-nowrap hidden md:block">
                            SIRIUSv2
                        </span>
                    </Link>
                    <button
                        data-collapse-toggle="navbar-default"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black rounded-lg md:hidden hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        aria-controls="navbar-default"
                        aria-expanded={dropDown ? "true" : "false"}
                        onClick={() => setDropDown((prev) => !prev)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                    <div
                        className={`nav-links w-full md:block md:w-auto ${
                            !isMd
                                ? `absolute left-0 transition-all duration-300 ${
                                      dropDown ? "top-[90%]" : "top-[-400%]"
                                  }`
                                : ""
                        }`}
                        id="navbar-default"
                    >
                        <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:mt-0 md:border-0 md:bg-white">
                            <Link href="/" aria-current="page">
                                <li className="flex gap-1 items-center text-black text-md md:text-xl md:my-2 md:ml-4 md:mr-1 rounded-md px-3 py-2 duration-300 hover:bg-[#0049AB] hover:text-white">
                                    <GoHome />
                                    Home
                                </li>
                            </Link>
                            <Link
                                href="/blog"
                                aria-current="page"
                                onClick={() => {
                                    router.push("/blog");
                                }}
                            >
                                <li className="flex gap-1 items-center text-black text-md md:text-xl md:my-2 md:ml-1 md:mr-1 rounded-md px-3 py-2 duration-300 hover:bg-[#0049AB] hover:text-white">
                                    <RiBloggerLine />
                                    Blogs
                                </li>
                            </Link>
                            <Link href="/about" aria-current="page">
                                <li className="flex gap-1 items-center text-black text-md md:text-xl md:my-2 md:ml-1 md:mr-1 rounded-md px-3 py-2 duration-300 hover:bg-[#0049AB] hover:text-white">
                                    <FaUserTie />
                                    About Us
                                </li>
                            </Link>
                            {/* Login/Logout Button */}
                            {login ? (
                                <button
                                    onClick={handleLogout}
                                    className="flex flex-row items-center md:justify-center text-black text-md md:text-xl md:my-2 md:ml-1 md:mr-0 rounded-md px-3 py-2 border-[1.5px] border-gray-700 duration-300 hover:bg-[#0049AB] hover:text-white"
                                >
                                    <MdPeopleAlt className="mr-2" />
                                    Log out
                                </button>
                            ) : (
                                <Link href="/login">
                                    <li className="flex flex-row items-center md:justify-center text-black text-md md:text-xl md:my-2 md:ml-1 md:mr-0 rounded-md px-3 py-2 border-[1.5px] border-gray-700 duration-300 hover:bg-[#0049AB] hover:text-white">
                                        <MdPeopleAlt className="mr-2" />
                                        Log in
                                    </li>
                                </Link>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
