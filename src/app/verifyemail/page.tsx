"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function verifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", {
        token,
      });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error, "verify email");
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, []);
  useEffect(() => {
    if (token?.length > 0) {
      verifyUserEmail();
    }
  }, [token]);
  return (
    <div className="d-flex justify-content-center flex-column align-items-center">
      <h1>Verify Email </h1>
      <h2>{token ? `${token}` : "No Token"}</h2>
      {verified && (
        <div>
          <h2>Verified Email</h2>
          <Link href="/login" className="fs-4 text-decoration-none">
            Login
          </Link>
        </div>
      )}

      {error && (
        <div>
          <h2 className="text-error fs-4">Error</h2>
        </div>
      )}
    </div>
  );
}
