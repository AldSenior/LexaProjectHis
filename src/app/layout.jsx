import localFont from "next/font/local";
import Header from "./components/Header";
import { LayoutTransition } from "./components/LayoutTransition";
import "./globals.css";
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

export const metadata = {
  title: "Афганская Война",
  description: "",
};
export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full`}
      >
        {/* <LayoutTransition
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: 20 }}
				> */}
        <Header />
        {/* </LayoutTransition> */}
        {children}
      </body>
    </html>
  );
}
