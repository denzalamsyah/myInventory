import Link from "next/link";
import React from "react";
import { BiMaleFemale } from "react-icons/bi";
import { MdOutlineInventory } from "react-icons/md";
import { useState, useEffect } from "react";
import { RiArchiveDrawerFill } from "react-icons/ri";
const TopCards = () => {
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [dataApk, setDataApk] = useState(0);
  const [dataAPL, setDataAPL] = useState(0);
  const [dataAK, setDataAK] = useState(0);
  const [R1, setR1] = useState(0);
  const [R2, setR2] = useState(0);
  const [R3, setR3] = useState(0);
  const [R4, setR4] = useState(0);

  const fetchData = async () => {
    try {
      const maleResponse = await fetch(
        "http://localhost:9000/api/karyawan/male",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (maleResponse.ok) {
        const maleData = await maleResponse.json();
        setMaleCount(maleData);
      }
      const femaleResponse = await fetch(
        "http://localhost:9000/api/karyawan/female",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (femaleResponse.ok) {
        const femaleData = await femaleResponse.json();
        setFemaleCount(femaleData);
      }

      const resAPK = await fetch(
        "http://localhost:9000/api/inventory/count-apk",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(resAPK);
      if (resAPK.ok) {
        const data = await resAPK.json();
        setDataApk(data);
      }

      const resAPL = await fetch(
        "http://localhost:9000/api/inventory/count-apl",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(resAPL);
      if (resAPL.ok) {
        const data = await resAPL.json();
        setDataAPL(data);
      }

      const resAK = await fetch(
        "http://localhost:9000/api/inventory/count-ak",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(resAK);
      if (resAK.ok) {
        const data = await resAK.json();
        setDataAK(data);
      }

      const r1 = await fetch("http://localhost:9000/api/inventory/count-r1", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(r1);
      if (r1.ok) {
        const data = await r1.json();
        setR1(data);
      }
      const r2 = await fetch("http://localhost:9000/api/inventory/count-r2", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(r2);
      if (r2.ok) {
        const data = await r2.json();
        setR2(data);
      }

      const r3 = await fetch("http://localhost:9000/api/inventory/count-r3", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(r3);
      if (r3.ok) {
        const data = await r3.json();
        setR3(data);
      }

      const r4 = await fetch("http://localhost:9000/api/inventory/count-r4", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(r4);
      if (r4.ok) {
        const data = await r4.json();
        setR4(data);
      }
    } catch {}
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="grid md:grid-cols-3 2xl:grid-cols-4 gap-4">
      <div className="grid grid-cols-3  gap-2 hover:bg-gradient-to-r hover:from-slate-200 hover:to-sla-300 bg-gradient-to-r from-slate-300  to-slate-200 w-full border p-4 rounded-lg overflow-hidden ">
        <BiMaleFemale size={50} style={{ color: "#474747" }} />
        <div className="grid col-span-2">
          <h1 className="text-black text-[10px] lg:text-[12px] 2xl:text-sm font-bold w-full">
            Jumlah Karyawan
          </h1>
          <div className="grid grid-cols-2">
            <div>
              <h2 className="text-[10px] lg:text-[12px] 2xl:text-sm text-black font-bold">
                Male
              </h2>
              <p className="text-gray-500 text-[10px] lg:text-[12px] 2xl:text-sm font-bold">
                {maleCount}
              </p>
            </div>
            <div>
              <h2 className=" text-[10px] lg:text-[12px] 2xl:text-sm text-black font-bold">
                Female
              </h2>
              <p className="text-gray-500 text-[10px] lg:text-[12px] 2xl:text-sm font-bold">
                {femaleCount}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3  gap-2 hover:bg-gradient-to-r hover:from-slate-200 hover:to-sla-300 bg-gradient-to-r from-slate-300  to-slate-200 w-full border p-4 rounded-lg overflow-hidden ">
        <RiArchiveDrawerFill size={50} style={{ color: "#474747" }} />
        <div className="grid col-span-2">
          <h1 className="text-black text-[10px] lg:text-[12px] 2xl:text-sm lg:text-md font-bold w-full">
            Jumlah Aset dalam Ruangan
          </h1>
          <div className="grid grid-cols-4">
            <div>
              <h2 className=" text-[10px] lg:text-[12px] 2xl:text-sm text-black font-bold">
                R1
              </h2>
              <p className="text-gray-500 text-[10px] lg:text-[12px] 2xl:text-sm font-bold">
                {R1}
              </p>
            </div>
            <div>
              <h2 className=" text-[10px] lg:text-[12px] 2xl:text-sm text-black font-bold">
                R2
              </h2>
              <p className="text-gray-500 text-[10px] lg:text-[12px] 2xl:text-sm font-bold">
                {R2}
              </p>
            </div>
            <div>
              <h2 className=" text-[10px] lg:text-[12px] 2xl:text-sm text-black font-bold">
                R3
              </h2>
              <p className="text-gray-500 text-[10px] lg:text-[12px] 2xl:text-sm font-bold">
                {R3}
              </p>
            </div>
            <div>
              <h2 className=" text-[10px] lg:text-[12px] 2xl:text-sm text-black font-bold">
                R4
              </h2>
              <p className="text-gray-500 text-[10px] lg:text-[12px] 2xl:text-sm font-bold">
                {R4}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3  gap-2 hover:bg-gradient-to-r hover:from-slate-200 hover:to-sla-300 bg-gradient-to-r from-slate-300  to-slate-200 w-full border p-4 rounded-lg overflow-hidden ">
        <MdOutlineInventory size={50} style={{ color: "#474747" }} />

        <div className="grid col-span-2">
          <h1 className="text-black text-[10px] lg:text-[12px] 2xl:text-sm lg:text-md font-bold w-full">
            Jumlah Inventory
          </h1>
          <div className="grid grid-cols-3">
            <div>
              <h2 className="text-[10px] lg:text-[12px] 2xl:text-sm text-black font-bold">
                AK
              </h2>
              <p className="text-gray-500 text-[10px] lg:text-[12px] 2xl:text-sm font-bold">
                {dataAK}
              </p>
            </div>
            <div>
              <h2 className=" text-[10px] lg:text-[12px] 2xl:text-sm text-black font-bold">
                APK
              </h2>
              <p className="text-gray-500 text-[10px] lg:text-[12px] 2xl:text-sm font-bold">
                {dataApk}
              </p>
            </div>
            <div>
              <h2 className=" text-[10px] lg:text-[12px] 2xl:text-sm text-black font-bold">
                APL
              </h2>
              <p className="text-gray-500 text-[10px] lg:text-[12px] 2xl:text-sm font-bold">
                {dataAPL}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className=" bg-white flex justify-between w-full border p-4 rounded-lg">
        <div className="flex flex-col w-full pb-4">
          <p className="text-2xl font-bold">$1,437,876</p>
          <p className="text-gray-600">YTD Revenue</p>
        </div>
        <p className="bg-green-200 flex justify-center items-center p-2 rounded-lg">
          <span className="text-green-700 text-lg">+11%</span>
        </p>
      </div> */}
      {/* <div className="grid grid-cols-3 shadow-md lg:shadow-xl gap-2 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-indigo-500  bg-gradient-to-r from-indigo-500 to-cyan-400 w-full border p-4 rounded-lg overflow-hidden ">
        <Link href="/employee">
          <MdOutlineInventory size={70} style={{ color: "#E5E7E9" }} />
        </Link>
        <div className="grid col-span-2">
          <h1 className="text-black text-[12px] 2xl:text-sm lg:text-md font-bold w-full">
            Jumlah Inventory
          </h1>
          <div className="grid grid-cols-3">
            <div>
              <h2 className=" text-[12px] 2xl:text-sm text-black font-bold">AK</h2>
              <p className="text-gray-500 text-[12px] 2xl:text-sm font-bold">{dataAK}</p>
            </div>
            <div>
              <h2 className=" text-[12px] 2xl:text-sm text-black font-bold">APK</h2>
              <p className="text-gray-500 text-[12px] 2xl:text-sm font-bold">{dataApk}</p>
            </div>
            <div>
              <h2 className=" text-[12px] 2xl:text-sm text-black font-bold">APL</h2>
              <p className="text-gray-500 text-[12px] 2xl:text-sm font-bold">{dataAPL}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 shadow-md lg:shadow-xl gap-2 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-indigo-500  bg-gradient-to-r from-indigo-500 to-cyan-400 w-full border p-4 rounded-lg overflow-hidden ">
        <Link href="/employee">
          <RiArchiveDrawerFill size={70} style={{ color: "#E5E7E9" }} />
        </Link>
        <div className="grid col-span-2">
          <h1 className="text-black text-[12px] 2xl:text-sm lg:text-md font-bold w-full">
            Jumlah Aset dalam Ruangan
          </h1>
          <div className="grid grid-cols-4">
            <div>
              <h2 className=" text-[12px] 2xl:text-sm text-black font-bold">R1</h2>
              <p className="text-gray-500 text-[12px] 2xl:text-sm font-bold">{R1}</p>
            </div>
            <div>
              <h2 className=" text-[12px] 2xl:text-sm text-black font-bold">R2</h2>
              <p className="text-gray-500 text-[12px] 2xl:text-sm font-bold">{R2}</p>
            </div>
            <div>
              <h2 className=" text-[12px] 2xl:text-sm text-black font-bold">R3</h2>
              <p className="text-gray-500 text-[12px] 2xl:text-sm font-bold">{R3}</p>
            </div>
            <div>
              <h2 className=" text-[12px] 2xl:text-sm text-black font-bold">R4</h2>
              <p className="text-gray-500 text-[12px] 2xl:text-sm font-bold">{R4}</p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default TopCards;
