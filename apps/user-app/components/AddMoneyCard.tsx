"use client"
import { Button } from "@repo/ui/button";
import { TextInput } from "@repo/ui/textInput";
import { Select } from "@repo/ui/select";
import { Card } from "@repo/ui/card";
import { useState } from "react";
import db from "../../../packages/db/src"
import { createOnRampTransaction } from "../app/lib/actions/createOnRampTransactions";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const [redirectURL, setRedirectURL] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount, setAmount] = useState(0);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");

    return <Card title="Add Money">
        <div className="w-full pt-2 px-1">
            <div className="m-0 pt-2 mb-[-5px] text-left">
                Amount
            </div>
            <TextInput placeholder={"Amount"} type={"number"} 
                onChange={(val) => {
                    setAmount(Number(val))
                }
            } />
            <div className="pt-4 pb-3 text-left">
                Bank
            </div>
            <Select onSelect={(value) => {
                setRedirectURL(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "");
                setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "");
            }} options={SUPPORTED_BANKS.map(x => ({
                key: x.name,
                value: x.name
            }))} />
            <div className="flex justify-center pt-4">
                <Button onClick={async () => {
                    await createOnRampTransaction(provider, amount)
                    window.location.href = redirectURL || "";
                }}>
                Add Money
                </Button>
            </div>
        </div>
    </ Card>
}