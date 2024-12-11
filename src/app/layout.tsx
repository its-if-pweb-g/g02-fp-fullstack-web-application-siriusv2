import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Ubuntu } from "next/font/google";
import ResponsiveNavBar from "@/components/ResponsiveNavBar";
import LoginProvider from "@/components/provider/LoginProvider";

const ubuntuFont = Ubuntu({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export const metadata: Metadata = {
    title: "Sirius v2",
    description: "Final Project Team Sirius",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/logo.png" />
            </head>
            <body className={`${ubuntuFont.className} antialiased`}>
                <LoginProvider>
                    <div className="bg-white sticky top-0 z-10 shadow-md shadow-[#3872be]">
                        <ResponsiveNavBar />
                    </div>
                    {children}
                    <footer className="flex items-center justify-center z-10 bg-white">
                        <div className="my-5">
                            <h1 className="text-xs text-center sm:text-md md:text-lg text-black">
                                Copyright © 2024 SIRIUSv2
                            </h1>
                        </div>
                    </footer>
                </LoginProvider>
            </body>
        </html>
    );
}
