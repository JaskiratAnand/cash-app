import React from "react"
import { Card } from "@repo/ui/card"

export const P2PTransactions = ({
    transactions,
    currentUser
}: {
    transactions: {
        id: number,
        time: Date,
        amount: number,
        toUserNumber: string,
        fromUserNumber: string
    }[], currentUser?: string
}) => {
    if (!transactions.length) {
        return <Card title="Recent P2P Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent P2P transfers
            </div>
        </Card>
    }
    return <Card title="Recent P2P Transactions">
        <div className="">
            {transactions.slice().reverse().map(t => 
                <div className="flex justify-between py-2 border-b border-gray-200 px-1">
                    <div>
                        <div className="text-sm font-medium">
                            {(t.toUserNumber === currentUser)
                                ? `Received from ${t.fromUserNumber}`
                                : `Sent to ${t.toUserNumber}`
                            }
                        </div>
                        <div className="text-slate-600 text-xs">
                            {t.time.toDateString()}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center pr-2">
                        + Rs {t.amount / 100}
                    </div>
                </div>
            )}
        </div>
    </Card>
}