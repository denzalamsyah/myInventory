import { useEffect, useState } from "react";

export default function TabelAtasInventori() {
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [dataApk, setDataApk] = useState(0);
  const [dataAPL, setDataAPL] = useState(0);
  const [dataAK, setDataAK] = useState(0);
  const [R1, setR1] = useState(0);
  const [R2, setR2] = useState(0);
  const [R3, setR3] = useState(0);
  const [R4, setR4] = useState(0);
  const [countRepair, setCountRepair] = useState(0);
  const [countNormal, setCountNormal] = useState(0);
  const [countDamage, setCountDamage] = useState(0);
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

      const resRepair = await fetch(
        "http://localhost:9000/api/inventory/count-repair",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(resRepair);
      if (resRepair.ok) {
        const data = await resRepair.json();
        setCountRepair(data);
      }

      const resNormal = await fetch(
        "http://localhost:9000/api/inventory/count-normal",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(resNormal);
      if (resNormal.ok) {
        const data = await resNormal.json();
        setCountNormal(data);
      }

      const resDamage = await fetch(
        "http://localhost:9000/api/inventory/count-damage",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(resDamage);
      if (resDamage.ok) {
        const data = await resDamage.json();
        setCountDamage(data);
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
    } catch {
      console.log("error");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="grid md:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className="grid grid-cols-2 gap-1  shadow-md hover:bg-gradient-to-r hover:from-white hover:to-slate-300  bg-white  w-full border p-4 rounded-md">
        <div className="grid col-span-2">
          <h1 className="text-[#154360] text-center mb-2 text-[12px] 2xl:text-[16px]  font-bold w-full">
            Inventory Berdasarkan Kategori
          </h1>

          <div className="grid overflow-x-auto">
            <table>
              <thead className="text-[12px] 2xl:text-[16px] text-center text-gray-500 bg-slate-100">
                <tr>
                  <td className="px-2">AK</td>
                  <td className="px-2">APK</td>
                  <td className="px-2">APL</td>
                </tr>
              </thead>
              <tbody className="text-[12px] 2xl:text-[16px] text-center text-gray-500">
                <tr>
                  <td className="px-2">{dataAK}</td>
                  <td className="px-2">{dataApk}</td>
                  <td className="px-2">{dataAPL}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1 shadow-md hover:bg-gradient-to-r hover:from-white hover:to-slate-300  bg-white  w-full border p-4 rounded-md">
        <div className="grid col-span-2">
          <h1 className="text-[#154360] text-center mb-2 text-[12px] 2xl:text-[16px]  font-bold w-full">
            Inventory Berdasarkan Status
          </h1>
          <div className="grid overflow-x-auto">
            <table>
              <thead className="text-[12px] 2xl:text-[16px] text-center text-gray-500 bg-slate-100">
                <tr>
                  <td className="px-2">Normal</td>
                  <td className="px-2">Repair</td>
                  <td className="px-2">Damage</td>
                </tr>
              </thead>
              <tbody className="text-[12px] 2xl:text-[16px] text-center text-gray-500 ">
                <tr>
                  <td className="px-2">{countNormal}</td>
                  <td className="px-2">{countRepair}</td>
                  <td className="px-2">{countDamage}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
