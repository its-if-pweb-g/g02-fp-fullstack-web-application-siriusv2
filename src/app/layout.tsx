import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ResponsiveNavBar from "@/components/ResponsiveNavBar";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Sirius v2",
    description: "Sirius Team Final Project",
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
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <div className="shadow-md shadow-[#3872be] sticky top-0 z-10 bg-white">
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
            </body>
        </html>
    );
}
