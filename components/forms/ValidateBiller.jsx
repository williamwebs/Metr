"use client";

import { useEffect, useState } from "react";
import CTA from "../button/CTA";

const ValidateBiller = () => {
  const [providers, setProviders] = useState();
  const [selectedProvider, setSelectedProvider] = useState();

  const fetchProviders = async () => {
    try {
      const response = await fetch(
        "https://api.budpay.com/api/v2/electricity",
        {
          method: "GET",
          headers: {
            Authorization:
              "Bearer sk_test_duwa3bmdeezjht9bq9jn6fbnod8rullf9w33kdj",
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        console.log(data);
        setProviders(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProviders();
  }, []);

  const handleSelectedProvider = (e) => {
    setSelectedProvider(e.target.value);
  };

  return (
    <div className="mx-auto max-w-md my-10">
      {/* get electricity biller from paybeta.ng  */}
      {/* form - meter_number meter_type biller_type amount reference */}
      <form>
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="name">Meter Number</label>
            <input
              type="number"
              name="meter_number"
              placeholder="04273972845"
              className="block w-full border rounded p-2 outline-none"
            />
          </div>

          <div>
            <label htmlFor="meter_type">Meter Type</label>
            <select
              name="provider"
              className="block w-full border rounded p-2 outline-amber-500"
              onChange={() => {}}
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
                <label htmlFor="biller_type">select provider</label>
                <select
                  name="provider"
                  className="block w-full border rounded p-2 outline-amber-500"
                  onChange={handleSelectedProvider}
                >
                  {providers.map((i) => (
                    <option key={i.provider} value={i.provider}>
                      {i.provider}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>

        <div className="my-10 w-full block mx-auto">
          <CTA title={"Validate Biller"} icon={true} />
        </div>
      </form>
    </div>
  );
};

export default ValidateBiller;
