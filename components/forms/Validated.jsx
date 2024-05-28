import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SubmitButton from "../button/SubmitButton";

const Validated = ({ validationResult, handleBack }) => {
  const handlePay = (e) => {
    e.preventDefault();

    // generate unique random numebers of at most 15 character length
    let randomNumber = Math.floor(Math.random() * 10 ** 15).toString();
    console.log(randomNumber);
  };
  return (
    <div>
      <span
        className="mb-5 inline-block cursor-pointer border px-3 rounded-2xl"
        onClick={handleBack}
      >
        <FontAwesomeIcon
          icon={faArrowLeftLong}
          className="text-base text-orange-500"
        />
      </span>
      <form onSubmit={handlePay}>
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="name">Meter Number</label>
            <input
              type="number"
              name="meterNumber"
              value={validationResult.meterNumber}
              className="block w-full border rounded p-2 outline-none"
              readOnly
            />
          </div>

          <div>
            <label htmlFor="name">Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={validationResult.customerName}
              className="block w-full border rounded p-2 outline-none"
              readOnly
            />
          </div>

          <div>
            <label htmlFor="name">Customer Address</label>
            <input
              type="text"
              name="customerAddress"
              value={validationResult.customerAddress}
              className="block w-full border rounded p-2 outline-none"
              readOnly
            />
          </div>

          <div>
            <label htmlFor="name">Amount</label>
            <input
              type="number"
              name="amount"
              placeholder="1000"
              className="block w-full border rounded p-2 outline-none"
              onChange={() => {}} // handleFormChange
            />
          </div>
        </div>

        <div className="my-10 w-full block mx-auto">
          <SubmitButton title="Pay" />
        </div>
      </form>
    </div>
  );
};

export default Validated;
