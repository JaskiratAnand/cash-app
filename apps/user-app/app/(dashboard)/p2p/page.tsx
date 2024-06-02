import prisma from "@repo/db/client";
import { SendCard } from "../../../components/SendCard"
import { P2PTransactions } from "../../../components/P2PTransactions"
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";


async function getP2PTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        },
        select:{
            id: true,
            timestamp: true,
            amount: true,
            toUser: {
                select: {
                    number: true
                }
            } 
        }
    });
    return txns.map(t => ({
        id: t.id,
        time: t.timestamp,
        amount: t.amount,
        toUserNumber: t.toUser.number
    }))
}

export default async function() {
    const transactions = await getP2PTransactions();

    return (
        <div className="w-full pb-5">
            <div className="text-4xl text-[#6a51a6] pt-2 font-bold">
            P2P Transfer
            </div>
            <div className="grid grid-cols-11">
                <div className="col-span-7 border-r">
                    <SendCard />
                </div>

                <div className="col-span-4 pl-2 pr-8">
                    <P2PTransactions transactions={transactions} />
                </div>
            </div>
        </div>
    )
}