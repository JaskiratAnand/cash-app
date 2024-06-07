import Link from 'next/link'
import { Card } from '@repo/ui/card'

export default function Services () {
    return (
        <Card title={"Services"}>
            <div className="pt-5 flex flex-row justify-center gap-8">
                <Link href='/transfer' className="p-4 text-center border rounded-lg bg-green-400 h-32 w-56 font-medium">
                    <div className="pb-2 flex justify-center">
                        <BankIcon />
                    </div>
                    Add Money from Bank
                </Link>
                <Link href="/p2p"  className="p-4 text-center border rounded-lg bg-blue-400 w-56 font-medium">
                    <div className="pb-2 flex justify-center">
                        <TransferIcon />
                    </div>
                    P2P Transfer
                </Link>
            </div>
        </Card>
    )
}

function BankIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-16 h-16" viewBox="0 0 16 16">
    <path d="m8 0 6.61 3h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.38l.5 2a.498.498 0 0 1-.485.62H.5a.498.498 0 0 1-.485-.62l.5-2A.5.5 0 0 1 1 13V6H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 3h.89zM3.777 3h8.447L8 1zM2 6v7h1V6zm2 0v7h2.5V6zm3.5 0v7h1V6zm2 0v7H12V6zM13 6v7h1V6zm2-1V4H1v1zm-.39 9H1.39l-.25 1h13.72z"/>
  </svg>
}
function TransferIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-16 h-16" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"/>
  </svg>
}