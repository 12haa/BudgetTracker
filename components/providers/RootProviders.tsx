"use client";
import React from "react"
import {ThemeProvider} from "next-themes";

const RootProviders = ({children}: {children: React.ReactNode}) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            {children}
        </ThemeProvider>
    )
}
export default RootProviders;
