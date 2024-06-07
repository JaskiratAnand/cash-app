import { Card } from "@repo/ui/card";

export const P2PSummary = ({send, recieved}: {
    send: number,
    recieved: number
}) => {
    return (
        <div className="pt-4">
            <Card title={"P2P Summary"}>
                <div className="flex justify-between border-b border-slate-200 py-2 px-1">
                    <div>
                        Total Money Sent
                    </div>
                    <div className="pr-2">
                        {send / 100} INR
                    </div>
                </div>
                <div className="flex justify-between pt-2 px-1">
                    <div>
                        Total Money Recieved
                    </div>
                    <div className="pr-2">
                        {recieved / 100} INR
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default P2PSummary;