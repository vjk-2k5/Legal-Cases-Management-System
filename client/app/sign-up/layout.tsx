import "@/styles/globals.css";
import { Viewport } from "next";

import { Providers } from "../providers";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
      <div className="relative flex flex-col h-screen">
        <main>
          {children}
        </main>
      </div>
    </Providers>
  );
}