import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "URL Shortener",
    description: "Create and share shortened URLs",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang = "en">
            <body>{children}</body>
        </html>
    );
}