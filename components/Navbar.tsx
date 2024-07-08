"use client";
import React, {useState} from "react"
import Logo, {LogoMobile} from "@/app/(auth)/components/Logo";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {Button, buttonVariants} from "@/components/ui/button";
import {UserButton} from "@clerk/nextjs";
import {ThemeSwitcherBtn} from "@/components/ThemeSwitchButton";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {Menu} from "lucide-react";

const Navbar = () => {
    return (
        <>
            <DesktopNavbar/>
            <MobileNavbar/>
        </>
    )
}
const items = [
    {label: "Dashboard", link: "/"},
    {label: "Transactions", link: "/transactions"},
    {label: "Manage", link: "/manage"},
];
export default Navbar;

function MobileNavbar() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="border-separate block bg-background md:hidden">
            <nav className="container flex items-center justify-between px-8 gap-4">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu size={35} className="text-foreground"/>
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="w-[400px] sm:w-[540px]" side="left">
                        <Logo/>
                        <div className="flex flex-col gap-1 pt-4">
                            {items.map((item) => {
                                return <NavbarItem
                                    onClick={() => setIsOpen(prevState => !prevState)}
                                    key={item.label} link={item.link} label={item.label}/>
                            })}
                        </div>
                    </SheetContent>
                </Sheet>
                <div className="flex h-[80px] min-h-[60px] items-center gap-x-4">
                    <LogoMobile/>
                </div>
                <div className="flex items-center gap-2">
                    <ThemeSwitcherBtn/>
                    <UserButton afterSignOutUrl="/sign-in"/>
                </div>
            </nav>
        </div>
    )
}

function DesktopNavbar() {
    return (
        <div className="hidden border-separate border-b bg-background md:block">
            <nav className="container flex items-center justify-between px-8">
                <div className="flex h-[80px] min-h-[60-px] items-center gap-x-4">
                    <Logo/>
                    <div className="flex h-full">
                        {items.map((item) => (
                            <NavbarItem key={item.label} link={item.link} label={item.label}/>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <ThemeSwitcherBtn/>
                    <UserButton afterSignOutUrl="/sign-in"/>
                </div>
            </nav>
        </div>
    )
}

function NavbarItem({link, label, onClick}: { link: string, label: string, onClick?: () => void }) {
    const pathname = usePathname()
    const isActive = pathname === link
    return (
        <div className="relative flex items-center">
            <Link href={link} className={cn(buttonVariants({variant: "ghost"}),
                "w-full justify-start text-lg text-muted-foreground hover:text-foreground ", isActive && "text-foreground"
            )}
                  onClick={() => {
                      if (onClick) onClick();
                  }}
            >{label}</Link>
            {isActive && (
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-amber-400 to-orange-500"/>
            )}
        </div>
    )
}
