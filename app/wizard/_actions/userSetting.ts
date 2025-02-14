"use server";
import prisma from "@/lib/prisma";
import {updateUserCurrencySchema} from "@/schema/userSettingsSchema";
import {currentUser} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {z} from "zod";

export async function UpdateUserCurrency(currency: string) {
    const parsedBody = updateUserCurrencySchema.safeParse({
        currency,
    });
    if (!parsedBody.success) {
        throw parsedBody.error;
    }
    const user = await currentUser();
    if (!user) redirect("/sign-in");
    const userSetting = await prisma.userSettings.update({
        where: {
            userId: user.id,
        },
        data: {
            currency
        }
    })
    return userSetting;
}
