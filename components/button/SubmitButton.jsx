"use client";

import { useFormStatus } from "react-dom";

const SubmitButton = ({ title, loading = false }) => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending || loading} className="button">
      {pending || loading ? "loading..." : title}
    </button>
  );
};

export default SubmitButton;
