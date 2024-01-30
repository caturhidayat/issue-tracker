"use client";
import { Button, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { BsBugFill } from "react-icons/bs";
import { usePathname } from "next/navigation";
import classnames from "classnames";

const Navbar = () => {
    const pathname = usePathname();
    console.log(pathname);
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
        <div className='flex px-5 h-14 items-center border-b mb-6'>
            <Text>
                <BsBugFill />
            </Text>
            <ul className='flex px-8'>
                {MenuItem.map((item, i) => (
                    <li key={i} className='px-4 font-semibold'>
                        <Text
                            className={classnames({
                                "text-zinc-900": pathname === item.path,
                                "text-zinc-500": pathname !== item.path,
                                "hover:text-zinc-800 transition-colors duration-200 ":
                                    true,
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
