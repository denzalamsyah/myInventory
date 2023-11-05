"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { BiLogOutCircle } from "react-icons/bi";
import Button from "../elements/button/button";
import Image from "next/image";
export default function Logout() {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleChange() {
    setModal(!modal);
  }
  useEffect(() => {
    fetchProfile();
  }, []);
  async function fetchProfile() {
    const res = await fetch("http://localhost:9000/api/kategori", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
  }
  function logout() {
    setLoading(true);
    localStorage.removeItem("token");
    router.push("/");
    setLoading(false);
  }
  return (
    <div className="relative">
      <Link href="" className="text-[#DA3E33F7]" onClick={handleChange}>
        <BiLogOutCircle />
      </Link>
      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box bg-white flex flex-col justify-center items-center">
          <Image alt="del icon" src="/img/del.png" width={75} height={75} />
          <h1 className="font-bold text-lg text-black mb-3 mt-3">
            Are you sure to logout?
          </h1>
          <div className="modal-action flex mt-4">
            {!loading ? (
              <Button
                className="bg-red-400 rounded-[5px] mx-2 text-white text-sm px-4 py-1 hover:bg-red-600 "
                type="button"
                onClick={() => logout()}
              >
                Yes
              </Button>
            ) : (
              <div className=" w-[10%] bg-red-400  p-2 rounded-md flex justify-center">
                <span className="loading loading-spinner text-neutral"></span>
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
