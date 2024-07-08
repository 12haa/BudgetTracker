import React from "react"
import Logo from "@/app/(auth)/components/Logo";

const layout = ({children}: { children: React.ReactNode }) => {
    return (
        <div className="relative flex h-screen w-full flex-col items-center justify-center">
            <Logo/>
            <div className="mt-12 ">
                {children}
            </div>
        </div>
    )
}
export default layout;
