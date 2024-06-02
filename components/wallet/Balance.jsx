"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Balance = () => {
  const [balance, setBalance] = useState(0);

  const fetchBalance = async () => {
    try {
      const response = await axios.get("/api/wallet/get-balance");

      const balanceData = await response.data;

      setBalance(balanceData.balance);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [balance]);

  const handleEmail = async (e) => {
    e.preventDefault();

    const message = "Testing";
    try {
      const response = await axios.post("/api/send-email", { message });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <aside className="shadow p-4 mb-5 rounded-md flex items-center justify-between">
      <div className="flex-1">
        <h4 className="text-2xl text-slate-950 font-bold">
          <span className="text-base">NGN</span> {balance}
        </h4>
      </div>
      <div className="w-fit">
        {/* button to fund wallet */}
        <Link href={"/dashboard/fund-wallet"} className="button">
          Fund Wallet
        </Link>
      </div>
    </aside>
  );
};

export default Balance;
