import SelectInput from "@/components/form/select";
import React, { useState, useEffect } from "react";
export default function TabelAtasKategori() {
  // const [categoryCount, setCategoryCount] = useState(0);
  const [namaKategori, setNamaKategori] = useState([]);
  const [categoriCount, setCategoryCount] = useState(0);
  const [dataApk, setDataApk] = useState(0);
  const [dataAPL, setDataAPL] = useState(0);
  const [dataAK, setDataAK] = useState(0);

  //   const fetchData = async () => {
  //     try {
  //       const responseCategoryName = await fetch(
  //         "http://localhost:9000/api/kategori/count",
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: "Bearer " + localStorage.getItem("token"),
  //           },
  //         }
  //       );
  //       if (responseCategoryName.ok) {
  //         const data = await responseCategoryName.json();
  //         setCategoryCount(data);
  //       }
  //     } catch {
  //       console.error("failed to fetch data", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const fetchKategori = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/kategori`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        setNamaKategori(data.data);
      }
      const countcategory = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/kategori/count`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (countcategory.ok) {
        const data = await countcategory.json();
        setCategoryCount(data);
      }

      const resAPK = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/inventory/count-apk`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (resAPK.ok) {
        const data = await resAPK.json();
        setDataApk(data);
      }

      const resAPL = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/inventory/count-apl`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (resAPL.ok) {
        const data = await resAPL.json();
        setDataAPL(data);
      }
      const resAK = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/inventory/count-ak`,
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
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchKategori();
  }, []);
  return (
    <div className="flex space-x-[100px]">
      <div>
        <table>
          <thead className="text-[12px] font-bold text-gray-800">
            <tr className="bg-green-200 2xl:text-[16px]">Nama kategori</tr>
          </thead>
          <tbody className="text-[12px] 2xl:text-[16px] text-gray-800 ">
            <tr>
              <td>
                {namaKategori.map((item) => {
                  return (
                    <tr className="text-left text-[12px] px-10" key={item.id}>
                      {item.nama}
                    </tr>
                  );
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <table>
          <thead className="text-[12px] font-bold text-gray-800">
            <tr>Total Kategori</tr>
          </thead>
          <tbody className="text-[12px] text-gray-800">
            <tr className="2xl:text-[16px]">
              <td className="text-center px-10">{categoriCount}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <table>
          <thead className="text-[12px] font-bold text-gray-800">
            <tr className="bg-green-200 2xl:text-[16px]">
              {namaKategori.map((item) => {
                return (
                  <td className="text-left text-[12px] px-10" key={item.id}>
                    {item.nama}
                  </td>
                );
              })}
            </tr>
          </thead>
          <tbody className="text-[12px] 2xl:text-[16px] text-gray-800 bg-gray-100">
            <tr>
              <td className="text-center px-10">{dataAK}</td>
              <td className="text-center px-10">{dataAPL}</td>
              <td className="text-center px-10">{dataApk}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
