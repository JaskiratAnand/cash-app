import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import Services from "../../../components/Services";
import { BalanceCard } from "../../../components/BalanceCard";
import prisma from "@repo/db/client";
import PendingTransfers from "../../../components/PendingTransfers";
import P2PSummary from "../../../components/P2PSummary";

const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
};

async function getBalance() {
    const session = await getServerSession(authOptions);
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session.user.id)
        }
    });
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getPendingTransfers() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            AND: [
                { userId: Number(session?.user?.id) },
                { status: "Processing" }
            ]
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

async function getP2PSummary() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.p2pTransfer.findMany({
        where: {
            OR: [
                { fromUserId: Number(session?.user?.id) },
                { toUserId: Number(session?.user?.id) }
            ]
        }
    });
    const send = txns.filter(t => t.fromUserId === Number(session?.user?.id)).reduce((acc, t) => acc + t.amount, 0);
    const received = txns.filter(t => t.toUserId === Number(session?.user?.id)).reduce((acc, t) => acc + t.amount, 0);
    return { send, received };

}

export default async function() {
    const session = await getServerSession(authOptions);
    const userNumber = session?.user?.email;
    const balance = await getBalance();
    const greeting = getGreeting();
    const transactions = await getPendingTransfers();
    const { send, received } = await getP2PSummary();

    return (
        <div className="w-full pb-5 pr-8">
            <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
                {greeting}, {userNumber}!
            </div>
            <div className="w-full grid grid-cols-10 gap-2">
                <div className="col-span-4 gap-4">
                    <BalanceCard amount={balance.amount} locked={balance.locked} />
                    <P2PSummary send={send} recieved={received} />
                </div>
                <div className="col-span-6">
                    <Services />
                    <PendingTransfers transactions={transactions} />
                </div>
            </div>
        </div>
    )
}