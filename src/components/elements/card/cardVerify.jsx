import React from "react";

import LabelComp from "../label/label";
import { useState } from "react";
import InputComp from "../input/input";
import { HiOutlineMail } from "react-icons/hi";
import Link from "next/link";
import Button from "../button/button";

const VerifyPage = () => {
  const [email, setEmail] = useState("");

  const verify = async () => {
    try {
      const res = await fetch(`http://localhost:9000/api/forgot-password`, {
        method: "GET",
        body: JSON.stringify({ email }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (res.ok) {
        const json = await res.json();
        console.log(json);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">
      <h1 className="text-2xl font-semibold mb-8 text-black">Reset password</h1>
      <p className="text-gray-400 mb-4">
        Enter the email address you’ve used to register and we’ll send you a
        reset link!
      </p>
      <div>
        <div className="mb-8 relative">
          <LabelComp htmlFor="email" className="text-gray-600 mb-1 block">
            Email
          </LabelComp>
          <InputComp
            icon={<HiOutlineMail />}
            placeholder="enter your email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Button
            href="#"
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Send link{" "}
          </Button>
        </div>
        <div className="flex flex-col justify-center items-center mt-6">
          <p className="text-gray-500">Remember your password?</p>
          <Link href="/login" className="text-blue-500 mt-3">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
