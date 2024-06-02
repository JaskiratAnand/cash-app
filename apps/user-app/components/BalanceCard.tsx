import { Card } from "@repo/ui/card";

export const BalanceCard = ({amount, locked}: {
    amount: number;
    locked: number;
}) => {
    return <Card title={"Balance"}>
        <div className="flex justify-between border-b border-slate-200 pt-2.5 pb-2 px-1">
            <div>
                Unlocked balance
            </div>
            <div className="pr-2">
                {amount / 100} INR
            </div>
        </div>
        <div className="flex justify-between border-b border-slate-200 py-2 px-1">
            <div>
                Total Locked Balance
            </div>
            <div className="pr-2">
                {locked / 100} INR
            </div>
        </div>
        <div className="flex justify-between pt-2 px-1">
            <div>
                Total Balance
            </div>
            <div className="pr-2">
                {(locked + amount) / 100} INR
            </div>
        </div>
    </Card>
}