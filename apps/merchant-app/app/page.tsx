"use client";

import { useBalance } from "@repo/store/balance";

export default function() {
  const balance = useBalance();
  return <div className="p-2">
    Hi There {balance}
  </div>
}