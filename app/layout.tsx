import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "./components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammadh Ahzem | Portfolio",
  description:
    "Portfolio of Muhammadh Ahzem — Software Engineer focused on AI integration and full-stack development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} min-h-full flex flex-col bg-background font-portfolio text-foreground overflow-x-hidden cursor-none selection:bg-[var(--selection-bg)] selection:text-[var(--selection-fg)] [&::-webkit-scrollbar]:w-0 max-md:cursor-auto max-md:[&_a]:cursor-pointer max-md:[&_button]:cursor-pointer`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
