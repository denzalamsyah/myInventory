import React from "react";
import { PiLockKey } from "react-icons/pi";
import LabelComp from "../label/label";
import { useState } from "react";
import InputPassComp from "../input/inputPass";
import Button from "../button/button";

const ChangePassPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">
      <h1 className="text-2xl font-semibold mb-8 text-black">
        Sign to your account
      </h1>
      <p className="text-gray-400 mb-4">
        In order to protect your account, try to include numbers, symbols, and
        both uppercase and lowercase letters.
      </p>
      <form>
        <div className="mb-6 relative">
          <LabelComp htmlFor="password" className="text-gray-600 mb-1 block">
            Password
          </LabelComp>
          <InputPassComp
            icon={<PiLockKey />}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="enter your password"
          />
        </div>
        <div className="mb-6 relative">
          <LabelComp
            htmlFor="confirmpassword"
            className="text-gray-600 mb-1 block"
          >
            Confirm Password
          </LabelComp>
          <InputPassComp
            icon={<PiLockKey />}
            id="confirmpassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="enter your Confirm password"
          />
        </div>
        <div>
          <Button
            href="#"
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Reset Password
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassPage;
