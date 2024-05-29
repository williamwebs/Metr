"use client";

import { useEffect, useRef, useState } from "react";
// import PaystackPop from "@paystack/inline-js";
import { usePaystackPayment } from "react-paystack";

import { useRouter } from "next/navigation";
import axios from "axios";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import dynamic from "next/dynamic";

// const PaystackPop = dynamic(() => import("@paystack/inline-js"), {
//   ssr: false,
// });

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

  // const amountPlusCharges = parseInt(fields.amount) + parseInt(charges);
  const amountPlusCharges = fields.amount * 100 + charges * 100;
  const config = {
    reference: new Date().getTime().toString(),
    email: "anazawilliam@yahoo.com",
    amount: amountPlusCharges, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: "pk_test_8c0bed0b4ca48814e11b62f08cee437c685ac2b0",
  };

  // you can call this function anything
  const onSuccess = (reference) => {
    alert(reference);
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

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const initializePayment = usePaystackPayment(config);
  // const config = {
  //   public_key: "FLWPUBK_TEST-19e715a1adaf0bcdd5181f4e33dc4e68-X",
  //   tx_ref: Date.now(),
  //   amount: amountPlusCharges,
  //   currency: "NGN",
  //   payment_options: "card,mobilemoney,ussd",
  //   customer: {
  //     email: fields.email,
  //     phone_number: "070********",
  //     name: fields.firstname,
  //   },
  //   customizations: {
  //     title: "my Payment Title",
  //     description: "Payment for items in cart",
  //     logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
  //   },
  // };

  // const handleFlutterPayment = useFlutterwave(config);
  //

  const handlePay = (e) => {
    e.preventDefault();
    initializePayment(onSuccess, onClose);
    // const PaystackPop = dynamic(() => import("@paystack/inline-js"), {
    //   ssr: false,
    // })();

    // const paystack = new PaystackPop();

    // paystack.newTransaction({
    //   key: "pk_test_8c0bed0b4ca48814e11b62f08cee437c685ac2b0",
    //   amount: amountPlusCharges, // fields.amount * 100
    //   email: fields.email,
    //   firstname: fields.firstname,
    //   lastname: fields.lastname,
    //   onSuccess(transaction) {
    //     // alert(transaction.reference);
    //     // if the transaction is successful, add the amount to the amount the user wallet in the db
    //     // save the transaction ref in the db with the user email
    //     axios
    //       .post("/api/wallet/update", {
    //         email: fields.email,
    //         amount: parseInt(fields.amount), // fields.amount
    //         transactionRef: transaction.reference,
    //       })
    //       .then((response) => {
    //         router.push("/dashboard");
    //         console.log(response.data);
    //       })
    //       .catch((error) => console.log(error));
    //   },
    //   onCancel() {
    //     alert("Payment Unsuccessful. Try again!");
    //   },
    // });
  };

  // const handlePay = (e) => {
  //   e.preventDefault();

  //   // handleFlutterPayment({
  //   //   callback: (response) => {
  //   //     console.log(response.status);

  //   //     if (response.status === "successful") {
  //   //       router.push("/dashboard");
  //   //       closePaymentModal();
  //   //     }
  //   //   },
  //   //   onClose: () => {},
  //   // });

  //   const paystack = new PaystackPop();

  //   console.log(paystack);

  //   // try flutterwave

  //   // to ensure that the PaystackPop library is only loaded on the client-side, and the window object will be available.

  //   paystack.newTransaction({
  //     key: "pk_test_8c0bed0b4ca48814e11b62f08cee437c685ac2b0",
  //     amount: amountPlusCharges, // fields.amount * 100
  //     email: fields.email,
  //     firstname: fields.firstname,
  //     lastname: fields.lastname,
  //     onSuccess(transaction) {
  //       // alert(transaction.reference);
  //       // if the transaction is successful, add the amount to the amount the user wallet in the db
  //       // save the transaction ref in the db with the user email
  //       axios
  //         .post("/api/wallet/update", {
  //           email: fields.email,
  //           amount: parseInt(fields.amount), // fields.amount
  //           transactionRef: transaction.reference,
  //         })
  //         .then((response) => {
  //           router.push("/dashboard");
  //           console.log(response.data);
  //         })
  //         .catch((error) => console.log(error));
  //     },
  //     onCancel() {
  //       alert("Payment Unsuccessful. Try again!");
  //     },
  //   });
  // };

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
