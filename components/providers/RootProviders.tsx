"use client";
import React, { useState } from "react"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {ThemeProvider} from "next-themes";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const RootProviders = ({children}: { children: React.ReactNode }) => {
    const [queryClient] = React.useState(() => new QueryClient)
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
                {children}
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
export default RootProviders;
