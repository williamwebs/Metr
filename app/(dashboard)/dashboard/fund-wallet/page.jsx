"use client";

import { useState } from "react";
import PaystackPop from "@paystack/inline-js";
import { useRouter } from "next/navigation";

const page = () => {
  const [fields, setFields] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  const handlePay = (e) => {
    e.preventDefault();
    console.log(fields);

    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: "pk_test_8c0bed0b4ca48814e11b62f08cee437c685ac2b0",
      amount: fields.amount * 100,
      email: fields.email,
      firstname: fields.firstname,
      lastname: fields.lastname,
      onSuccess(transaction) {
        alert(transaction.reference);
        router.push("/dashboard");
        // save the transaction ref in the db with the user email
        // if the transaction is successful, add the amount to the amount the user wallet in the db
      },
      onCancel() {
        alert("Payment Unsuccessful. Try again!");
      },
    });
  };

  return (
    <main className="mx-auto max-w-md my-10 p-5 shadow rounded-md">
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
          <button className="button" type="submit" onclick="payWithPaystack()">
            Pay
          </button>
        </div>
      </form>
    </main>
  );
};

export default page;
