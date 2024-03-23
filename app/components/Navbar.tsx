"use client";
import { Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { Bug } from "lucide-react";

const Navbar = () => {
	const pathname = usePathname();
	const MenuItem = [
		{
			name: "Home",
			path: "/",
		},
		{
			name: "Issues",
			path: "/issue",
		},
	];
	return (
		<div className="flex px-5 h-14 items-center border-b mb-6">
			<Text>
				<Bug width={"24"} height={"24"} />
			</Text>
			<ul className="flex px-8">
				{MenuItem.map((item, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<li key={i} className="px-4">
						<Text
							className={classnames({
								"text-zinc-900 font-semibold": pathname === item.path,
								"text-zinc-400 font-medium": pathname !== item.path,
								"hover:text-zinc-800 transition-colors duration-200 ": true,
							})}
						>
							<Link href={item.path}>{item.name}</Link>
						</Text>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Navbar;
