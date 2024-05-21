"use client";

const Balance = () => {
  const fundWallet = () => {
    console.log("wallet funded!");
  };
  return (
    <aside className="shadow p-4 mb-5 rounded-md flex items-center justify-between">
      <div className="flex-1">
        <h4 className="text-2xl text-slate-950 font-bold">
          <span className="text-base">NGN</span> 4000
        </h4>
      </div>
      <div className="w-fit">
        {/* button to fund wallet */}
        <button onClick={fundWallet} className="button">
          Fund Wallet
        </button>
      </div>
    </aside>
  );
};

export default Balance;
