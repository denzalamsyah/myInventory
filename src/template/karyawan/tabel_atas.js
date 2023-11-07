import React, { useState, useEffect } from "react";

export default function TabelAtasKaryawan() {
  const [backendCount, setBackendCount] = useState(0);
  const [frontendCount, setFrontendCount] = useState(0);
  const [uiuxCount, setUiuxCount] = useState(0);
  const [dmCount, setDmCount] = useState(0);
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
    <div className="flex gap-8">
      <div>
        <h1 className="text-[12px] 2xl:text-lg font-bold text-gray-800 mb-2">
          Divisi
        </h1>
        <table>
          <thead>
            <tr className="bg-green-200">
              <td className="px-2 text-[12px] 2xl:text-lg text-gray-800">
                BackEnd
              </td>
              <td className="px-2 text-[12px] 2xl:text-lg text-gray-800">
                FrontEnd
              </td>
              <td className="px-2 text-[12px] 2xl:text-lg text-gray-800">
                UI/UX
              </td>
              <td className="px-2 text-[12px] 2xl:text-lg text-gray-800">
                Marketing
              </td>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800 bg-gray-100">
            <tr>
              <td className="text-[12px] 2xl:text-lg text-gray-800 text-center">
                {backendCount}
              </td>
              <td className="px-2 text-[12px] 2xl:text-lg text-gray-800 text-center">
                {frontendCount}
              </td>
              <td className="px-2 text-[12px] 2xl:text-lg text-gray-800 text-center">
                {uiuxCount}
              </td>
              <td className="px-2 text-[12px] 2xl:text-lg text-gray-800 text-center">
                {dmCount}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* <div>
        <h1 className="text-[12px] 2xl:text-lg font-bold text-gray-800 mb-2">
          Jabatan
        </h1>
        <table>
          <tbody className="text-[12px] 2xl:text-lg text-gray-800">
            <tr>
              <td className="text-center px-5">-</td>
            </tr>
          </tbody>
        </table>
      </div> */}
      <div>
        <h1 className="text-[12px] 2xl:text-lg font-bold text-gray-800 mb-2">
          Gender
        </h1>
        <table>
          <thead className="text-[12px] 2xl:text-lg text-gray-800 bg-red-300">
            <tr>
              <td className="px-2">Perempuan</td>
              <td className="px-2">Laki-Laki</td>
            </tr>
          </thead>
          <tbody className="text-[12px] 2xl:text-lg text-gray- bg-gray-100">
            <tr>
              <td className="text-center text-[12px] 2xl:text-lg text-gray-800">
                {femaleCount}
              </td>
              <td className="text-center text-[12px] 2xl:text-lg text-gray-800">
                {maleCount}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
