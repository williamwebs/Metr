"use client";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

const CTA = ({ title, icon }) => {
  const handleSignIn = () => {
    signIn("google");
    return redirect("/dashboard");
  };

  return (
    <button type="submit" className="button" onClick={handleSignIn}>
      {title}

      {icon && <FontAwesomeIcon icon={faArrowRight} className="w-3" />}
    </button>
  );
};

export default CTA;
