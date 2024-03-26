import { Box, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import "./globals.css";


export const metadata: Metadata = {
	title: "Issue Tracker",
	description: "Issue Tracker - NextJS ",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Theme appearance="light" accentColor="violet" scaling="95%">
					<Navbar />
					<Box mx={"8"}>
						<main
							suppressHydrationWarning={true}
							className="xs:container xs:mx-auto md:container md:mx-auto"
						>
							{children}
						</main>
					</Box>
				</Theme>
			</body>
		</html>
	);
}
