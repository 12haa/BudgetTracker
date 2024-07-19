import React from "react"
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import prisma from "@/lib/prisma";
import {Button} from "@/components/ui/button";
import CreateTransactionDialog from "@/app/(dashboard)/_components/CreateTransactionDialog";

const page = async () => {
    const user = await currentUser()
    if (!user) {
        redirect("/sign-in")
    }
    const userSettings = await prisma.userSettings.findUnique({
        where: {
            userId: user.id
        }
    })
    if (!userSettings) {
        redirect("/wizard")
    }
    return (
        <div className="h-full bg-background">
            <div className="border-b bg-card">
                <div className="container flex flex-wrap items-center jusbst-center gap-6 py-8">
                    <p className="text-3xl font-bold">Hello , {user.firstName} 👋👋</p>
                    <div className="flex items-center gap-3">
                        <CreateTransactionDialog trigger={<Button variant="outline"
                                                                  className="border-emerald-300 bg-emerald-950 text-white hover:bg-emerald-700">New
                            Income</Button>} type="income"/>

                    </div>
                    <CreateTransactionDialog trigger={<div className="flex items-center gap-3">
                        <Button variant="outline" className="border-rose-300 bg-rose-950 text-white hover:bg-rose-700">New
                            Expense</Button>
                    </div>} type="expense"/>
                </div>
            </div>
        </div>
    )
}
export default page;
