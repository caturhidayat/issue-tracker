import "@radix-ui/themes/styles.css";
import { Box, Theme } from "@radix-ui/themes";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Issue Tracker",
    description: "Issue Tracker - NextJS ",
};

export const queryClient = new QueryClient();

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body className={inter.className}>
                <Providers>
                    <Theme
                        appearance='light'
                        accentColor='violet'
                        scaling='95%'
                    >
                        <Navbar />
                        <Box mx={"8"}>
                            <main className='xs:container xs:mx-auto md:container md:mx-auto'>
                                {children}
                            </main>
                        </Box>
                    </Theme>
                </Providers>
            </body>
        </html>
    );
}
