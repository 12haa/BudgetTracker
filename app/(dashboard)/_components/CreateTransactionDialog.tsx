"use client";
import React, {ReactNode} from "react"
import {TransactionType} from "@/lib/Types";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {cn} from "@/lib/utils";

interface Props {
    trigger: ReactNode
    type: TransactionType
}

const CreateTransactionDialog = ({trigger, type}: Props) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle> create a new <span
                        className={cn("m-1", type === "income" ? "text-green-500" : "text-red-500")}>{type}</span></DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
export default CreateTransactionDialog;
