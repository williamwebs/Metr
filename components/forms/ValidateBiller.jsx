"use client";

import { useEffect, useState } from "react";
import CTA from "../button/CTA";
import { validateBiller } from "@/Actions/pageActions";
import SubmitButton from "../button/SubmitButton";

const ValidateBiller = () => {
  const [providers, setProviders] = useState();
  const [selectedProvider, setSelectedProvider] = useState();

  const [meterNumber, setMeterNumber] = useState("");
  const [discoName, setDiscoName] = useState("Ibadan Electric");
  const [mType, setmType] = useState("prepaid");

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
        // console.log(data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    data.append("meternumber", e.target[0].value);
    data.append("disconame", e.target[1].value);
    data.append("mtype", e.target[2].value);

    console.log(...data.entries());

    await fetch("/api/validateMeter", {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  };

  const validateMeterBiller = async () => {
    console.log(meterNumber, discoName, mType);

    try {
      // `https://mabrooktelecoms.com/api/validatemeter?meternumber=${meternumber}& &disconame=${disconame}& &mtype=${mtype}`

      const response = await fetch(
        `https://mabrooktelecoms.com/api/validatemeter?meternumber=${meterNumber}& &disconame=${discoName}& &mtype=${mType}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: process.env.TOKEN,
          },
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto max-w-md my-10">
      {/* get electricity biller from paybeta.ng  */}
      {/* form - meter_number meter_type biller_type amount reference */}
      <form action={validateBiller}>
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="name">Meter Number</label>
            <input
              type="number"
              name="meternumber"
              placeholder="04273972845"
              className="block w-full border rounded p-2 outline-none"
              onChange={(e) => setMeterNumber(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="mtype">Meter Type</label>
            <select
              name="mtype"
              className="block w-full border rounded p-2 outline-amber-500"
              onChange={(e) => setmType(e.target.value)}
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
                <label htmlFor="disconame">select provider</label>
                <select
                  name="disconame"
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
          <SubmitButton title="Validate Meter" />
        </div>
      </form>

      <div>result</div>
    </div>
  );
};

export default ValidateBiller;
