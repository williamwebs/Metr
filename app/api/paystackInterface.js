export const handlePayment = (email, amount) => {
  const handler = PaystackPop.setup({
    key: "pk_test_8c0bed0b4ca48814e11b62f08cee437c685ac2b0",
    email,
    amount,

    onClose: () => {
      alert("windows closed");
    },
    callback: function (response) {
      //   window.location = "payments/info?reference-" + response.reference;
      alert(response.reference);
    },
  });

  handler.openIframe();
};
