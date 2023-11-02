"use client";
import Button from "@/components/elements/button/button";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export default function DeleteRoom({ id, nama }) {
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const MySwal = withReactContent(Swal);

  function handleChange() {
    setModal(!modal);
  }
  async function handleDelete(rommId) {
    const response = await fetch(
      `http://localhost:9000/api/ruangan/${rommId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
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
      <Link href="" className="text-[#DA3E33F7]" onClick={handleChange}>
        <FaTrash />
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
            <Button
              className="bg-red-400 rounded-[5px] mx-2 text-white text-sm px-4 py-1 hover:bg-red-600 "
              type="button"
              onClick={() => handleDelete(id)}
            >
              Yes
            </Button>
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
