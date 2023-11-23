"use client";
import Button from "@/components/elements/button/button";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export default function DeleteKategori({ id, nama }) {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const MySwal = withReactContent(Swal);

  function handleChange() {
    setModal(!modal);
  }
  async function handleDelete(categoryId) {
    setLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/kategori/${categoryId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    setLoading(false);
    if (response.ok) {
      setModal(false);
      MySwal.fire("Berhasil menghapus data!", "Klik tombol!", "success").then(
        () => {
          router.refresh();
        }
      );
    } else {
      MySwal.fire("Gagal menghapus data", "Klik tombol!", "error");
    }
  }
  return (
    <div className="">
      <Link
        href=""
        className="text-[#DA3E33F7] relative group"
        onClick={handleChange}
      >
        <FaTrash className="transition duration-150 ease-in-out" />
        <span className="hidden absolute -left-1/4 -top-full bg-[#DA3E33F7] text-white px-2 py-1 text-[12px] rounded-[3px] opacity-0 group-hover:opacity-100 group-hover:block transition duration-300 ease-in-out z-10">
          Delete
        </span>
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
            Are you sure to delete {nama}!
          </h1>
          <div className="modal-action flex mt-4">
            {!loading ? (
              <Button
                className="bg-red-400 rounded-[5px] mx-2 text-white text-sm px-4 py-1 hover:bg-red-600 "
                type="button"
                onClick={() => handleDelete(id)}
              >
                Yes
              </Button>
            ) : (
              <div className=" w-[15%] bg-red-400 px-4 p-2 rounded-md flex justify-center">
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
