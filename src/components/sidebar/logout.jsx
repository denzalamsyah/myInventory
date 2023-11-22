"use client";
import Button from "@/components/elements/button/button";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Logout({ name, icon, h2, h22 }) {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleChange() {
    setModal(!modal);
  }

  function logout(e) {
    e.preventDefault();
    setLoading(true);
    localStorage.removeItem("token");
    router.push("/");
    setLoading(false);
  }
  return (
    <div className="">
      <Link
        href=""
        onClick={handleChange}
        className={`group flex items-center text-sm 2xl:text-[16px] gap-3.5 font-medium p-2 bg-[#585858] shadow-lg hover:bg-white hover:text-black rounded-md`}
      >
        <Image src={icon} alt={name} width={25} height={25} />
        <h2 className={h2}>{name}</h2>
        <h2 className={h22}>{name}</h2>
      </Link>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box bg-white flex flex-col justify-center items-center">
          <h1 className="font-bold text-lg text-black mb-3 mt-3">
            Are you sure to logout!
          </h1>
          <div className="modal-action flex mt-4">
            {!loading ? (
              <Button
                className="bg-orange-400 rounded-[5px] mx-2 text-white text-sm px-4 py-1 hover:bg-orange-600 "
                type="button"
                onClick={logout}
              >
                Yes
              </Button>
            ) : (
              <div className=" w-[50%] bg-orange-400 px-4 p-2 rounded-md flex justify-center">
                <span className="loading loading-spinner text-neutral">
                  Yes
                </span>
              </div>
            )}
            <Button
              className=" text-black rounded-[5px] text-sm shadow-lg mx-2 px-4 py-1 border border-gray-200 hover:bg-gray-500 hover:text-white"
              onClick={handleChange}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
