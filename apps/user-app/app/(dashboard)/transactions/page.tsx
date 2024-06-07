import prisma from "@repo/db/client";
import { P2PTransactions } from "../../../components/P2PTransactions"
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { OnRampTransactions } from "../../../components/OnRampTransactions";

async function getP2PTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            OR: [
                { fromUserId: Number(session?.user?.id) },
                { toUserId: Number(session?.user?.id) }
            ]
        },
        select:{
            id: true,
            timestamp: true,
            amount: true,
            fromUser: {
                select: {
                    number: true
                }
            },
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
        fromUserNumber: t.fromUser.number,
        toUserNumber: t.toUser.number
    }))
}

async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function() {
    const session = await getServerSession(authOptions);
    const currentUserNumber = session.user.email;
    const p2pTransactions = await getP2PTransactions();
    const onRampTransactions = await getOnRampTransactions();

    return (
        <div className="w-full pb-5 pr-8">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                Transactions History
            </div>
            <div className="grid grid-cols-10 gap-2">
                <div className="col-span-5">
                    <OnRampTransactions transactions={onRampTransactions} />
                </div>

                <div className="col-span-5 pl-2 pr-8">
                    <P2PTransactions transactions={p2pTransactions} currentUser={currentUserNumber} />
                </div>
            </div>
        </div>
    )
}