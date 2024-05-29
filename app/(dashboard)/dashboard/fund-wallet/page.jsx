"use client";

import { useEffect, useRef, useState } from "react";
import PaystackPop from "@paystack/inline-js";
import { useRouter } from "next/navigation";
import axios from "axios";

const FundWallet = () => {
  const [fields, setFields] = useState({});
  const [charges, setCharges] = useState(0);
  const router = useRouter();

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

  const paystackRef = useRef(null);

  useEffect(() => {
    const paystack = new PaystackPop();
    paystackRef.current = paystack;
  }, []);

  const handlePay = (e) => {
    e.preventDefault();

    const amountPlusCharges = fields.amount * 100 + charges * 100;

    // try flutterwave

    // to ensure that the PaystackPop library is only loaded on the client-side, and the window object will be available.
    // const PaystackPop = dynamic(() => import("@paystack/inline-js"), {
    //   ssr: false,
    // });

   paystackRef.current.newTransaction({
     key: "pk_test_8c0bed0b4ca48814e11b62f08cee437c685ac2b0",
     amount: amountPlusCharges, // fields.amount * 100
     email: fields.email,
     firstname: fields.firstname,
     lastname: fields.lastname,
     onSuccess(transaction) {
       // alert(transaction.reference);
       // if the transaction is successful, add the amount to the amount the user wallet in the db
       // save the transaction ref in the db with the user email
       axios
         .post("/api/wallet/update", {
           email: fields.email,
           amount: parseInt(fields.amount), // fields.amount
           transactionRef: transaction.reference,
         })
         .then((response) => {
           router.push("/dashboard");
           console.log(response.data);
         })
         .catch((error) => console.log(error));
     },
     onCancel() {
       alert("Payment Unsuccessful. Try again!");
     },
   });
  };

  return (
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
  );
};

export default FundWallet;
