import { Geist, Geist_Mono } from "next/font/google";

import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import "./globals.css";
import { ConvexClientProvider } from "@/components/web/ConvexClientProvider";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <ThemeProvider>
          <main className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
            <ConvexClientProvider>{children}</ConvexClientProvider>
          </main>
          <Toaster closeButton/>
        </ThemeProvider>
      </body>
    </html>
  )
}
