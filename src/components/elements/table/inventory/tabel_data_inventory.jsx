import { useState, useEffect, useRef } from "react";
import UpdateInventory from "../../childtabel/inventory/updateInventory";
import DeleteInventory from "../../childtabel/inventory/deleteInventory";
import Image from "next/image";
import ReactToPrint from "react-to-print";
import Button from "../../button/button";
import { BiSearch } from "react-icons/bi";
import DetailInventory from "../../childtabel/inventory/detailInventory";

export default function TabelDataInventory({ modal }) {
  const [inventoryData, setInventoryData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [screenSize, setScreenSize] = useState("md");
  const [pageSize, setPageSize] = useState(4);
  const componentRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParam, setSearchParam] = useState("nama");
  // const [isLoading, setIsLoading] = useState(false);
  const screenSizes = {
    "2xl": 6,
    md: 4,
  };

  const handleSearch = (e) => {
    e.preventDefault();

    fetchInventory(currentPage, searchQuery, searchParam);
  };

  useEffect(() => {
    fetchInventory(currentPage, searchQuery, searchParam);
  }, [currentPage, searchQuery, searchParam]);

  useEffect(() => {
    const handleResize = () => {
      const newSize = window.matchMedia("(min-width: 1536px)").matches
        ? "2xl"
        : "md";
      setScreenSize(newSize);
      if (screenSizes[newSize]) {
        setPageSize(screenSizes[newSize]);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const fetchInventory = async (page, query = "", param) => {
    try {
      // setIsLoading(true);
      const url = query
        ? `http://localhost:9000/api/inventory/search?${param}=${query}`
        : `http://localhost:9000/api/inventory?page=${page}&size=${pageSize}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        const data = await response.json();
        setInventoryData(data);
      } else {
        console.log("data kosong");
      }

      // setIsLoading(false);
    } catch {
      console.error("error");
    }
  };
  useEffect(() => {
    fetchInventory(currentPage);
  }, [currentPage]);
  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="flex flex-col h-full bg-white rounded-md px-4 pt-6 shadow-lg">
      <div className="px-[5px]">
        <div className="flex items-center justify-between mb-6">
          <div className="md:flex md:gap-2 md:space-y-0 space-y-2">
            {modal}
            <Button
              className="text-[12px] 2xl:text-lg px-4 rounded-[5px] p-1 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white"
              href=""
              type="submit"
            >
              Download All
            </Button>
          </div>
          <form
            className="hidden md:flex border bg-white rounded-[5px] shadow-md py-1 px-3 items-center"
            role="search"
            onSubmit={handleSearch}
          >
            <button className="mr-2">
              <BiSearch className="w-4 h-4 2xl:w-6 2xl:h-6 text-gray-400" />
            </button>
            <input
              className="text-[12px] 2xl:text-lg outline-none bg-white"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              value={searchParam}
              onChange={(e) => setSearchParam(e.target.value)}
              className="px-[16px]  py-1 w-full bg-white text-[12px] text-gray-700 focus:none outline-none"
            >
              <option value="nama">Nama</option>
              <option value="merk">Merk</option>
              <option value="status">Status</option>
              <option value="vendor">Vendor</option>
              <option value="kodeAsset">Kode Asset</option>
            </select>
          </form>
        </div>
        <div
          ref={componentRef}
          className="grid gap-3 snap-x overflow-auto scroll-smooth scrollbar-thin scrollbar-thumb-red scrollbar-track-gray-200 scrollbar-thumb-hover:#b30000"
          style={{
            height: "45vh",
            width: "100%",
            scrollSnapType: "x mandatory",
          }}
        >
          <div>
            <table className="table caption-top">
              <thead className=" bg-slate-200">
                <tr className="2xl:text-lg py-3">
                  <th className="border border-gray-300  text-gray-800 text-center">
                    Kode Aset
                  </th>
                  <th className="border border-gray-300  text-gray-800 text-center">
                    Nama
                  </th>
                  <th className="border border-gray-300  text-gray-800 text-center">
                    Gambar
                  </th>
                  <th className="border border-gray-300  text-gray-800 text-center">
                    Merk
                  </th>
                  <th className="border border-gray-300  text-gray-800 text-center">
                    Status
                  </th>
                  <th className="border border-gray-300  text-gray-800 text-center">
                    Harga
                  </th>
                  <th className="border border-gray-300  text-gray-800 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="">
                {inventoryData.data && inventoryData.data.length > 0 ? (
                  inventoryData.data.map((inventory, index) => (
                    <tr
                      key={index}
                      className="text-center border text-[12px] 2xl:text-[16px] text-black border-gray-300"
                    >
                      <td className="border border-gray-300 py-1">
                        {inventory.kodeAsset}
                      </td>
                      <td className="border border-gray-300 py-1 px-2 text-left">
                        {inventory.nama}
                      </td>
                      <td className="border border-gray-300">
                        <div className="flex  justify-center items-center">
                          <Image
                            alt={inventory.nama}
                            src={inventory.gambar}
                            width={50}
                            height={50}
                            className="rounded-sm"
                          />
                        </div>
                      </td>
                      <td className="border border-gray-300">
                        {inventory.merk}
                      </td>
                      <td className="border border-gray-300">
                        {inventory.status}
                      </td>
                      <td className="text-left border border-gray-300 py-1 px-2">
                        Rp. {inventory.harga}
                      </td>
                      <td className="border border-gray-300">
                        <div className="flex justify-center gap-2">
                          <div className="flex items-center justify-center">
                            <DetailInventory {...inventory} />
                            {/* <Link href={`/inventory/details/${inventory.id}`}>
                              <CgMoreO className="transition duration-150 ease-in-out" />
                            </Link> */}
                          </div>
                          <div className="flex items-center justify-center">
                            {/* update */}
                            <UpdateInventory {...inventory} />
                          </div>
                          <div className="flex items-center justify-center">
                            {/* delete */}
                            <DeleteInventory
                              id={inventory.id}
                              nama={inventory.nama}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="text-center border text-[12px] 2xl:text-[16px] text-black border-gray-300">
                    <td colSpan="12" className="text-center">
                      Tidak ada data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="join bg-white">
          <button
            className="join-item bg-transparent hover:bg-blue-700 hover:text-white p-2"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 0}
          >
            «
          </button>
          <button className="join-item bg-transparent text-[12px] p-2">
            Page {currentPage + 1}
          </button>
          <button
            className="join-item bg-transparent hover:bg-blue-700 hover:text-white p-2"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === inventoryData.totalPages}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}
