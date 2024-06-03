"use client";

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ title, loading = false }) => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending || loading} className="button">
      {pending || loading ? <FontAwesomeIcon icon={faSpinner} spin /> : title}
    </button>
  );
};

export default SubmitButton;
