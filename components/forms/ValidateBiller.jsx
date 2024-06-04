"use client";

import { useState } from "react";
import axios from "axios";
import Validated from "./Validated";
import NotValidated from "./NotValidated";
import toast from "react-hot-toast";

const ValidateBiller = () => {
  const [formFields, setFormFields] = useState({
    meterType: "prepaid",
    service: "enugu-electric",
  });
  const [validationResult, setValidationResult] = useState();
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // sets the form state
  const handleFormChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };

  // fn that is called when the back button is clicked
  // reset the fields to default
  const handleBack = () => {
    setValidated(false);
    setValidationResult();
    setFormFields({ meterType: "prepaid", service: "enugu-electric" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await axios.post("/api/validate", {
      meterType: formFields.meterType,
      meterNumber: formFields.meterNumber,
      service: formFields.service,
    });

    // if successful set the data object to the state
    if (response.data.status === "successful") {
      toast.success(`${response.data.message}`)
      setValidationResult(response.data.data);
      setIsLoading(false);
      console.log(validationResult);
    }

    setIsLoading(false);
  };

  return (
    <div className="mx-auto max-w-md my-10">
      {!validated && (
        <NotValidated
          validationResult={validationResult}
          handleSubmit={handleSubmit}
          handleFormChange={handleFormChange}
          setValidated={setValidated}
          isLoading={isLoading}
          service={formFields.service}
        />
      )}

      {validated && (
        <Validated
          validationResult={validationResult}
          handleBack={handleBack}
          service={formFields.service}
        />
      )}
    </div>
  );
};

export default ValidateBiller;
