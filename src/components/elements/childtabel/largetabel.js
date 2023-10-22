import Button from "../button/button";
import { BiSearch } from "react-icons/bi";
import TabelDataKategori from "../table/tabel_data_kategori";
import Link from "next/link";
import TambahKaryawan from "@/components/elements/childtabel/addKaryawan";

export default function LargeCard({ children, modal }) {
  return (
    <div className="flex flex-col bg-white rounded-md px-4 py-6">
      <div className="px-[5px]">
        <div className="flex items-center justify-between mb-6">
          {modal}
          <Button
            className="text-[12px] px-4 rounded-[5px] p-1 text-blue-700 border border-blue-700 hover:text-white hover:bg-blue-700"
            href="#"
            type="submit"
          >
            Download All
          </Button>

          <form
            className="flex border bg-white rounded-[5px] shadow-md py-1 px-3 items-center"
            role="search"
          >
            <button className="mr-2">
              <BiSearch className="w-5 h-5 text-gray-400" />
            </button>
            <input
              className="text-[12px] outline-none bg-white"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </form>
        </div>
        <div className="h-64 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
