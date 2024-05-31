"use client";

import { useEffect, useState } from "react";
import { usePaystackPayment } from "react-paystack";

import { useRouter } from "next/navigation";
import axios from "axios";
import Script from "next/script";
import { handlePayment } from "@/app/api/paystackInterface";

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

  const amountPlusCharges = fields.amount * 100 + charges * 100;

  const config = {
    reference: new Date().getTime().toString(),
    email: fields.email,
    amount: amountPlusCharges, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: "pk_test_8c0bed0b4ca48814e11b62f08cee437c685ac2b0",
  };

  // you can call this function anything
  const onSuccess = (reference) => {
    console.log(fields.email);

    console.log("successful");
    // if the transaction is successful, add the amount to the amount the user wallet in the db
    // save the transaction ref in the db with the user email

    // axios
    //   .post("/api/wallet/update", {
    //     email: fields.email,
    //     amount: parseInt(fields.amount), // fields.amount
    //     transactionRef: transaction.reference,
    //   })
    //   .then((response) => {
    //     router.push("/dashboard");
    //     console.log(response.data);
    //   })
    //   .catch((error) => console.log(error));
  };

  const onClose = () => {
    console.log("closed");
    alert("Payment Unsuccessful. Try again!");
  };

  const initializePayment = usePaystackPayment(config, onSuccess, onClose);

  const handlePay = (e) => {
    e.preventDefault();
    handlePayment(fields.email, amountPlusCharges);
  };
  // const handlePay = (e) => {
  //   e.preventDefault();
  //   console.log(initializePayment);
  //   initializePayment(config, onSuccess, onClose);
  // };

  // const initializePayment = usePaystackPayment(config);

  // const handlePay = (e) => {
  //   e.preventDefault();
  //   initializePayment(handleSuccess, handleClose);
  // };

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
