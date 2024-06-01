"use client";

import { useEffect, useState } from "react";

import Script from "next/script";
import { handlePayment } from "@/app/api/paystackInterface";

const FundWallet = () => {
  const [fields, setFields] = useState({});
  const [charges, setCharges] = useState(0);

  const handleChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  // update charges
  const updateCharges = () => {
    if (fields.amount > 0 && fields.amount <= 1000) setCharges(100);
    if (fields.amount > 1000 && fields.amount <= 3000) setCharges(200);
    if (fields.amount > 3000) setCharges(300);
    if (fields.amount == 0) setCharges(0);
  };

  useEffect(() => {
    updateCharges();
  }, [fields.amount]);

  const amountWithoutCharges = fields.amount;

  const amountPlusCharges = amountWithoutCharges * 100 + charges * 100;

  const handlePay = (e) => {
    e.preventDefault();
    handlePayment(fields.email, amountPlusCharges, amountWithoutCharges);
  };

  return (
    <>
      <Script src="https://js.paystack.co/v1/inline.js" />
      <main className="mx-auto max-w-md my-10 p-5 shadow rounded-md">
        {/* <FundWallet /> */}
        <form id="paymentForm" onSubmit={handlePay}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              id="email-address"
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <label>Amount</label>
            <input
              onChange={handleChange}
              name="amount"
              type="tel"
              id="amount"
              className="input"
              required
            />
          </div>
          {fields.amount && (
            <div className="py-2 flex items-center justify-between">
              <p className="text-sm text-amber-500 font-semibold">VAT:</p>
              <span className="text-sm font-bold bg-amber-500 px-3 py-1 rounded-full text-white">
                {charges}
              </span>
            </div>
          )}
          <div className="form-group">
            <label>First Name</label>
            <input
              onChange={handleChange}
              name="firstname"
              type="text"
              id="first-name"
              className="input"
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              onChange={handleChange}
              name="lastname"
              type="text"
              id="last-name"
              className="input"
            />
          </div>
          <div className="form-submit mt-5">
            <button className="button" type="submit">
              Pay
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default FundWallet;
