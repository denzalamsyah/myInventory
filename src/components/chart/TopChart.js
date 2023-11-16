import React from "react";
import { BiMaleFemale } from "react-icons/bi";
import { MdOutlineInventory } from "react-icons/md";
import { useState, useEffect } from "react";
import { RiArchiveDrawerFill } from "react-icons/ri";
import { HiMiniSquaresPlus } from "react-icons/hi2";
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
  const [use, setUse] = useState(0);
  const [notUse, setNotUse] = useState(0);

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

      const use = await fetch(
        "http://localhost:9000/api/inventory/count-in-use",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(use);
      if (use.ok) {
        const data = await use.json();
        setUse(data);
      }

      const notuse = await fetch(
        "http://localhost:9000/api/inventory/count-not-in-use",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(notuse);
      if (notuse.ok) {
        const data = await notuse.json();
        setNotUse(data);
      }
    } catch {}
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
      <div className="grid grid-cols-3  gap-2 hover:bg-gradient-to-r hover:from-slate-200 hover:to-slate-300 bg-gradient-to-r from-slate-300  to-slate-200 w-full border p-3 rounded-lg overflow-hidden ">
        <BiMaleFemale
          size=""
          className="text-6xl lg:text-7xl"
          style={{ color: "#474747" }}
        />
        <div className="grid col-span-2">
          <h1 className="text-black mb-2 text-[10px] lg:text-[12px] 2xl:text-[16px] font-bold w-full">
            Jumlah Karyawan
          </h1>
          <table>
            <thead className="text-[12px] 2xl:text-[16px] text-center text-gray-700 bg-slate-300 py-2">
              <tr>
                <td className="px-2">Male</td>
                <td className="px-2">Female</td>
              </tr>
            </thead>
            <tbody className="text-[12px] 2xl:text-[16px] text-center text-gray-700 bg-slate-100">
              <tr>
                <td className="px-2">{maleCount}</td>
                <td className="px-2">{femaleCount}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid grid-cols-3  gap-2 hover:bg-gradient-to-r hover:from-slate-200 hover:to-slate-300 bg-gradient-to-r from-slate-300  to-slate-200 w-full border p-4 rounded-lg overflow-hidden ">
        <RiArchiveDrawerFill
          size=""
          className="text-6xl lg:text-7xl"
          style={{ color: "#474747" }}
        />
        <div className="grid col-span-2">
          <h1 className="text-black mb-2 text-[10px] lg:text-[12px] 2xl:text-[16px] lg:text-md font-bold w-full">
            Jumlah Aset dalam Ruangan
          </h1>
          <table>
            <thead className="text-[12px] 2xl:text-[16px] text-center text-gray-700 bg-slate-300 py-2">
              <tr>
                <td className="px-2">R1</td>
                <td className="px-2">R2</td>
                <td className="px-2">R3</td>
                <td className="px-2">R4</td>
              </tr>
            </thead>
            <tbody className="text-[12px] 2xl:text-[16px] text-center text-gray-700 bg-slate-100">
              <tr>
                <td className="px-2"> {R1}</td>
                <td className="px-2">{R2}</td>
                <td className="px-2">{R3}</td>
                <td className="px-2">{R4}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid grid-cols-3  gap-2 hover:bg-gradient-to-r hover:from-slate-200 hover:to-slate-300 bg-gradient-to-r from-slate-300  to-slate-200 w-full border p-3 rounded-lg overflow-hidden ">
        <HiMiniSquaresPlus
          size=""
          className="text-6xl lg:text-7xl"
          style={{ color: "#474747" }}
        />
        <div className="grid col-span-2">
          <h1 className="text-black mb-2 text-[10px] lg:text-[12px] 2xl:text-[16px] lg:text-md font-bold w-full">
            Jumlah Inventory
          </h1>
          <table>
            <thead className="text-[12px] 2xl:text-[16px] text-center text-gray-700 bg-slate-200 py-2">
              <tr>
                <td className="px-2">AK</td>
                <td className="px-2">APK</td>
                <td className="px-2">APL</td>
              </tr>
            </thead>
            <tbody className="text-[12px] 2xl:text-[16px] text-center text-gray-700 bg-slate-100">
              <tr>
                <td className="px-2">{dataAK}</td>
                <td className="px-2">{dataApk}</td>
                <td className="px-2">{dataAPL}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid grid-cols-3  gap-2 hover:bg-gradient-to-r hover:from-slate-200 hover:to-slate-300 bg-gradient-to-r from-slate-300  to-slate-200 w-full border p-3 rounded-lg overflow-hidden ">
        <MdOutlineInventory
          size=""
          className="text-6xl lg:text-7xl"
          style={{ color: "#474747" }}
        />
        <div className="grid col-span-2">
          <h1 className="text-black mb-2 text-[10px] lg:text-[12px] 2xl:text-[16px] lg:text-md font-bold w-full">
            Penggunaan Inventory
          </h1>
          <table>
            <thead className="text-[12px] 2xl:text-[16px] text-center text-gray-700 bg-slate-200 py-2">
              <tr>
                <td className="px-2">Unavaible</td>
                <td className="px-2">Avaible</td>
              </tr>
            </thead>
            <tbody className="text-[12px] 2xl:text-[16px] text-center text-gray-700 bg-slate-100">
              <tr>
                <td className="px-2">{use}</td>
                <td className="px-2">{notUse}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TopCards;
