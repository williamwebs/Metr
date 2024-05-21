"use client";

import { useFormStatus } from "react-dom";

const SubmitButton = ({ title }) => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="button">
      {pending ? "loading..." : title}
    </button>
  );
};

export default SubmitButton;
