import { Card } from "@repo/ui/card";

export const PendingTransfers = ({transactions}: {
    transactions: {
        time: Date,
        amount: number,
        status: string,
        provider: string
    }[]
}) => {
    return (
        <div className="pt-4">
            <Card title={"Pending Transfers"}>
            { (transactions.length == 0) ?
                (<div className="text-center pb-8 pt-8">
                    No Pending transfers
                </div>) 
                :   transactions.slice().reverse().map(t => <div className="w-full grid grid-cols-3 justify-between py-2 border-b border-gray-200 px-1">
                    <div className="col-span-1 text-left">
                        <div className="text-sm font-medium">
                            Received INR
                        </div>
                        <div className="text-slate-600 text-xs">
                            {t.time.toDateString()}
                        </div>
                    </div>
                    <div className={`col-span-1 flex flex-col justify-center text-center text-sm ${
                            t.status === "Success" 
                            ? "text-green-500" 
                            : t.status === "Failure" 
                            ? "text-red-500" 
                            : t.status === "Processing" 
                            ? "text-gray-500" 
                            : ""
                        }`}> 
                        {t.status}
                    </div>
                    <div className="col-span-1 text-right flex flex-col justify-center pr-2">
                        + Rs {t.amount / 100}
                    </div>

                </div>) 
            }

            </Card>

        </div>
    )
}

export default PendingTransfers;