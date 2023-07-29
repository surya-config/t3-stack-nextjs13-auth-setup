"use client";
import { Poppins } from "@next/font/google";
import { ClientProvider } from "src/clients/trpc";
import "./globals.css";

const poppins = Poppins({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
});

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientProvider>
      <html lang="en">
        {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
        <head>
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"
          />
        </head>
        <body>
          <div className={poppins.className}>
            <div className="bg-gray-100">
              <div className="w-full max-w-screen-2xl bg-gray-100 m-auto overflow-hidden">
                {children}
              </div>
            </div>
          </div>
        </body>
      </html>
    </ClientProvider>
  );
}

export default RootLayout;
