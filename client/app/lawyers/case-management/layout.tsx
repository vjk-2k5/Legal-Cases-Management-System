import "@/styles/globals.css";
import { Viewport } from "next";
import { Providers } from "@/app/providers";
import  Navbar  from "@/components/lawyernavbar";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function CasesManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {

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
