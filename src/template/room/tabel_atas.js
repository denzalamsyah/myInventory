import { useEffect, useState } from "react";
export default function TabelAtasRoom() {
  const [dataRuangan, setDataRuangan] = useState(0);
  const fetchData = async () => {
    try {
      const ruangan = await fetch(
        `process.env.NEXT_PUBLIC_API_URL}/api/ruangan/count-ruangan`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(ruangan);
      if (ruangan.ok) {
        const data = await ruangan.json();
        setDataRuangan(data);
      }
    } catch {}
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="grid lg:grid-cols-5 2xl:grid-cols-4 gap-1">
      <div className="grid grid-cols-2 gap-1  shadow-md hover:bg-gradient-to-r hover:from-white hover:to-slate-300  bg-white  w-full border p-4 rounded-lg">
        <div className="grid col-span-2">
          <h1 className="text-[#154360] text-center mb-2 text-[12px] font-bold w-full">
            Jumlah Ruangan
          </h1>
          <p className="text-gray-500 text-[12px] text-center font-bold">
            {dataRuangan}
          </p>
        </div>
      </div>
    </div>
  );
}
