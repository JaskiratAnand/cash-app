import React from "react";

export function Card ({
    title,
    children
}: {
    title: string,
    children?: React.ReactNode
}): JSX.Element {
    return (
        <div className="border p-4 rounded-lg">
            <h1 className="text-xl border-b pb-2 font-medium"> {title} </h1>
            <div>{children}</div>
        </div>
    )
}