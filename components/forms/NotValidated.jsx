"use client";

import axios from "axios";
import SubmitButton from "../button/SubmitButton";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloudArrowUp,
  faLocationArrow,
} from "@fortawesome/free-solid-svg-icons";

const NotValidated = ({
  validationResult,
  handleSubmit,
  handleFormChange,
  setValidated,
  isLoading,
}) => {
  const [providers, setProviders] = useState();

  // fetch the availabale providers from the api
  const fetchProviders = async () => {
    const res = await axios.get("/api/providers");
    setProviders(res.data.data);
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  // save customer meter details in the db
  const saveMeterDetailsTDB = () => {
    // api route to save meter details in the profile object in the wallet
    console.log("saved!");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="name">Meter Number</label>
            <input
              type="number"
              name="meterNumber"
              placeholder="04273972845"
              className="block w-full border rounded p-2 outline-none"
              onChange={handleFormChange}
            />
          </div>

          <div>
            <label htmlFor="meterType">Meter Type</label>
            <select
              name="meterType"
              className="block w-full border rounded p-2 outline-amber-500"
              onChange={handleFormChange}
            >
              <option value="prepaid" defaultValue={"prepaid"}>
                prepaid
              </option>
              <option value="postpaid">postpaid</option>
            </select>
          </div>

          <div>
            {providers && (
              <div>
                <label htmlFor="service">select provider</label>
                <select
                  name="service"
                  className="block w-full border rounded p-2 outline-amber-500"
                  onChange={handleFormChange}
                >
                  {providers.map((i) => (
                    <option key={i.name} value={i.slug}>
                      {i.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* show customer ? meter validation result */}
        {validationResult && (
          <div className="my-3 shadow rounded-md px-4 py-2">
            <p className="text-base Capitalize font-normal">
              Name:{" "}
              <span className="font-semibold text-sm tracking-[1px]">
                {validationResult.customerName}
              </span>
            </p>
            <p className="text-base Capitalize font-normal">
              Address:{" "}
              <span className="font-semibold text-sm tracking-[1px]">
                {validationResult.customerAddress}
              </span>
            </p>
          </div>
        )}

        {/* change button content based on validation result */}
        <div className="my-5 w-full block mx-auto">
          {validationResult ? (
            <div className="flex items-center justify-between">
              <button
                className="button flex items-center gap-1"
                onClick={() => setValidated(true)}
              >
                Continue
                <FontAwesomeIcon icon={faLocationArrow} />
              </button>
              <button
                className="button flex items-center gap-1"
                onClick={saveMeterDetailsTDB}
              >
                Save
                <FontAwesomeIcon icon={faCloudArrowUp} />
              </button>
            </div>
          ) : (
            <SubmitButton title="Validate Meter" loading={isLoading} />
          )}
        </div>
      </form>
    </div>
  );
};

export default NotValidated;
