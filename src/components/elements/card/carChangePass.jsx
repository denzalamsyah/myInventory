import React from "react";
import { PiLockKey } from "react-icons/pi";
import LabelComp from "../label/label";
import { useState, useEffect } from "react";
import InputPassComp from "../input/inputPass";
import Button from "../button/button";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";
const ChangePassPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const ChangePassword = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/set-password?email=${router.query.email}`,
        {
          method: "PUT",
          body: JSON.stringify({
            password: password,
            confirmPassword: confirmPassword,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      console.log(res);
      if (res.ok) {
        MySwal.fire("Success Change!", "Click the button!", "success").then(
          () => {
            router.push("/login");
          }
        );
      } else {
        MySwal.fire("Confirm Password Not Match!", "error");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">
      <h1 className="text-2xl font-semibold mb-8 text-black">
        Sign to your account
      </h1>
      <p className="text-gray-400 mb-4">
        password must be at least 8 characters, try to include numbers, symbols
        and upper and lower case letters.
      </p>
      <div>
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
            required
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
            placeholder="enter your confirm password"
            required
          />
        </div>
        <div>
          {!loading ? (
            <Button
              onClick={ChangePassword}
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
              Reset Password
            </Button>
          ) : (
            <div className="w-full bg-blue-500  p-2 rounded-md flex justify-center">
              <span className="loading loading-spinner text-neutral"></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangePassPage;
