import axios from "axios";

export const handlePayment = (email, amount, amountWithoutCharges) => {
  const saveTransactionInDB = (response) => {
    try {
      axios
        .post("/api/wallet/update", {
          email,
          amount: parseInt(amountWithoutCharges), // fields.amount
          transactionRef: response.reference,
        })
        .then((response) => {
          //   router.push("/dashboard");
          window.location.href = "/dashboard"; // Redirect to dashboard
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  const handler = PaystackPop.setup({
    key: "pk_test_8c0bed0b4ca48814e11b62f08cee437c685ac2b0",
    email,
    amount,

    onClose: () => {
    //   alert("windows closed");
    },
    callback: function (response) {
      saveTransactionInDB(response);
    },
  });

  handler.openIframe();
};
