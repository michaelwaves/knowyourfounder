"use client"
import Link from "next/link";
import { HomeIcon, User } from "lucide-react";
import Image from "next/image";
import LogoutButton from "./LogoutButton";
import kyf_logo from '@/app/kyf_logo.png'
interface NavbarLinkProps {
    title: string,
    href: string,
    icon: React.ReactNode
}

const links: NavbarLinkProps[] = [
    {
        title: "Home",
        href: "/",
        icon: <HomeIcon size={20} />
    },

    {
        title: "Founders",
        href: "/founders",
        icon: <User size={20} />
    },
    /* {
        title: "Settings",
        href: "/settings",
        icon: <Settings size={20} />
    }, */
]

function GlobalNavbar({ title, href, icon }: NavbarLinkProps) {
    return (

        <div className="rounded-lg hover:bg-gray-200 px-2 py-2" >
            <Link href={`/dashboard/${href}`} className="flex flex-row items-center">
                {icon}
                <span className="text-sm pl-2">
                    {title}
                </span>
            </Link>
        </div>

    )
}
function Navbar() {
    return (
        <div className="w-[20vw] min-h-screen h-full p-2 min-w-[200px] border-r-8 border-[#f7f4ed]">
            <div className="py-4 px-1 pt-5">
                <Image
                    src={kyf_logo}
                    alt="KYF Logo"
                    width={140}
                    height={120}
                    className=''
                />
            </div>
            <div className="w-full flex flex-col gap-2">
                {links.map((link) => (<GlobalNavbar key={link.href} title={link.title} href={link.href}
                    icon={link.icon} />
                ))}
            </div>
            <div className="w-full h-20 flex items-center justify-between">
                <LogoutButton />
            </div>
        </div>
    );
}

export default Navbar;