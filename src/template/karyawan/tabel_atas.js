import React, { useState, useEffect } from "react";

export default function TabelAtasKaryawan() {
  const [backendCount, setBackendCount] = useState(0);
  const [frontendCount, setFrontendCount] = useState(0);
  const [uiuxCount, setUiuxCount] = useState(0);
  const [dmCount, setDmCount] = useState(0);
  const [sistemAnlis, setSistemAnlis] = useState(0);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const backendResponse = await fetch(
          "http://localhost:9000/api/karyawan/be",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const frontendResponse = await fetch(
          "http://localhost:9000/api/karyawan/fe",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const uiuxResponse = await fetch(
          "http://localhost:9000/api/karyawan/ui",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const dmResponse = await fetch(
          "http://localhost:9000/api/karyawan/dm",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
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

        if (backendResponse.ok) {
          const backendData = await backendResponse.json();
          setBackendCount(backendData);
        }

        if (frontendResponse.ok) {
          const frontendData = await frontendResponse.json();
          setFrontendCount(frontendData);
        }

        if (uiuxResponse.ok) {
          const uiuxData = await uiuxResponse.json();
          setUiuxCount(uiuxData);
        }
        if (dmResponse.ok) {
          const dmData = await dmResponse.json();
          setDmCount(dmData);
        }
        if (maleResponse.ok) {
          const maleData = await maleResponse.json();
          setMaleCount(maleData);
        }
        if (femaleResponse.ok) {
          const femaleData = await femaleResponse.json();
          setFemaleCount(femaleData);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-1">
      <div className="grid grid-cols-2 gap-1  shadow-md hover:bg-gradient-to-r hover:from-white hover:to-slate-300  bg-white  w-full border p-4 rounded-lg">
        <div className="grid col-span-2">
          <h1 className="text-[#154360] text-center mb-2 text-[12px] 2xl:text-[16px]  font-bold w-full">
            Divisi
          </h1>
          <div className="grid overflow-x-auto">
            <table>
              <thead className="text-[12px] 2xl:text-[16px] text-center text-gray-500 bg-slate-200 py-2">
                <tr>
                  <td className="px-2">Sistem Analis</td>
                  <td className="px-2">Marketing</td>
                  <td className="px-2">BackEnd</td>
                  <td className="px-2">FrontEnd</td>
                  <td className="px-2">UI/UX</td>
                </tr>
              </thead>
              <tbody className="text-[12px] 2xl:text-[16px] text-center text-gray-500 bg-slate-100">
                <tr>
                  <td className="px-2">{sistemAnlis}</td>
                  <td className="px-2">{dmCount}</td>
                  <td className="px-2">{backendCount}</td>
                  <td className="px-2">{frontendCount}</td>
                  <td className="px-2">{uiuxCount}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1 shadow-md hover:bg-gradient-to-r hover:from-white hover:to-slate-300  bg-white  w-full border p-4 rounded-lg">
        <div className="grid col-span-2">
          <h1 className="text-[#154360] text-center mb-2 text-[12px] 2xl:text-[16px]  font-bold w-full">
            Jenis Kelamin
          </h1>
          <div className="grid overflow-x-auto">
            <table>
              <thead className="text-[12px] 2xl:text-[16px] text-center text-gray-500 bg-slate-200 py-2">
                <tr>
                  <td className="px-2">Laki-laki</td>
                  <td className="px-2">Perempuan</td>
                </tr>
              </thead>
              <tbody className="text-[12px] 2xl:text-[16px] text-center text-gray-500 bg-slate-100">
                <tr>
                  <td className="px-2">{maleCount}</td>
                  <td className="px-2">{femaleCount}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
