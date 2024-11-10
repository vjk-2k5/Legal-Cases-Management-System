import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";

import { Providers } from "@/app/providers";
//import { useAuthCheck } from "../hoc/useAuthCheck";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import  Navbar  from "@/components/clientsnavbar";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function CasesClientsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //const { loading, authenticated } = useAuthCheck();

  //if (loading) return <div>Loading...</div>; 
  return (
    <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
      <div className="relative flex flex-col h-screen">
        
        <Navbar />
        <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
          {children}
        </main>
      </div>
    </Providers>
  );
}
