import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/ui/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Client",
	description: "Client",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning >
			<body className={inter.className}>
				<ThemeProvider
          defaultTheme="dark"
					attribute="class"
				>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
