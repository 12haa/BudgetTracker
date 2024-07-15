"use client";
import * as React from "react";
import {useMediaQuery} from "@/app/hooks/use-media-query";
import {Button} from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {Drawer, DrawerContent, DrawerTrigger} from "@/components/ui/drawer";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {Currencies, Currency} from "@/lib/currencies";
import {useMutation, useQuery} from "@tanstack/react-query";
import SkeletonWrapper from "./SkeletonWrapper";
import {UserSettings} from "@prisma/client";
import {UpdateUserCurrency} from "@/app/wizard/_actions/userSetting";
import {toast} from "sonner";
import {useCallback} from "react";

export default function CurrencyComboBox() {
    const [open, setOpen] = React.useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [selectdOption, setSelectedOption] = React.useState<Currency | null>(
        null
    );
    // ------------------Queries and Mutations --------------------------------
    const userSettings = useQuery<UserSettings>({
        queryKey: ["userSettings"],
        queryFn: () => fetch("/api/user-settings").then((res) => res.json()),
    });
    const mutation = useMutation({
        mutationFn: UpdateUserCurrency,
        onSuccess: (data: UserSettings) => {
            toast.success("Currency updated successfully", {
                id: "update-currency"
            });
            setSelectedOption(Currencies.find((currency) => currency.value === data.currency) || null)
        },
        onError: (error: any) => {
            toast.error("something went wrong", {id: "update-currency"})
        }
    })
    // ------------------Queries and Mutations --------------------------------
    React.useEffect(() => {
        if (!userSettings.data) {
            return;
        }
        const userCurrency = Currencies.find(
            (currency) => currency.value === userSettings.data.currency
        );
        if (userCurrency) setSelectedOption(userCurrency)
    }, [userSettings.data]);
    // use Callback to avoid re-rendering the component when the currency is selectedb to avoid re-render
    const selectOption = useCallback((currency: Currency | null) => {
        if (!currency) {
            toast.error("Please select a currency")
            return;
        }
        toast.loading("Updating currency...", {
            id: "update-currency"
        });
        mutation.mutate(currency.value)
    }, [mutation]);
    if (isDesktop) {
        return (
            <SkeletonWrapper isLoading={userSettings.isLoading}>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start" disabled={mutation.isPending}>
                            {selectdOption ? <>{selectdOption.label}</> : <>+ Set Currency</>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0" align="start">
                        <OptionList
                            setOpen={setOpen}
                            setSelectedOption={selectOption}
                        />
                    </PopoverContent>
                </Popover>
            </SkeletonWrapper>
        );
    }
    return (
        <SkeletonWrapper isLoading={userSettings.isLoading}>
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Button variant="outline" className="w-full justify-start" disabled={mutation.isPending}>
                        {selectdOption ? <>{selectdOption.label}</> : <>+ Set Currency</>}
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div className="mt-4 border-t">
                        <OptionList
                            setOpen={setOpen}
                            setSelectedOption={selectOption}
                        />
                    </div>
                </DrawerContent>
            </Drawer>
        </SkeletonWrapper>
    );
}

function OptionList({
                        setOpen,
                        setSelectedOption,
                    }: {
    setOpen: (open: boolean) => void;
    setSelectedOption: (status: Currency | null) => void;
}) {
    return (
        <Command>
            <CommandInput placeholder="Filter Currency..."/>
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                    {Currencies.map((currency: Currency) => (
                        <CommandItem
                            key={currency.value}
                            value={currency.value}
                            onSelect={(value) => {
                                setSelectedOption(
                                    Currencies.find((priority) => priority.value === value) ||
                                    null
                                );
                                setOpen(false);
                            }}
                        >
                            {currency.label}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    );
}
