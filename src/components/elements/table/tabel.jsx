export default function TabelComp({ title }) {
  const divisi = [
    {
      id: 1,
      divisi: "BackEnd",
      kuantitas: 10,
    },
    {
      id: 2,
      divisi: "FrontEnd",
      kuantitas: 5,
    },
    {
      id: 3,
      divisi: "UI/UX",
      kuantitas: 6,
    },
    {
      id: 4,
      divisi: "Marketing",
      kuantitas: 5,
    },
  ];
  return (
    <table className="table caption-top">
      <caption className="text-start text-blue-600 px-[10px] text-sm font-semibold">
        {title}
      </caption>
      <thead>
        <tr className="">
          {divisi && divisi.length > 0 ? (
            divisi.map((item, index) => (
              <th
                key={index}
                scope="col"
                className="font-semibold text-center text-gray-600 text-sm"
                style={{ padding: "10px" }}
              >
                {item.divisi}
              </th>
            ))
          ) : (
            <th colSpan="4" className="text-center">
              Tidak ada data
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        <tr className="text-center">
          <td style={{ padding: "2px", fontSize: "12px" }}>5</td>
          <td style={{ padding: "2px", fontSize: "12px" }}>5</td>
          <td style={{ padding: "2px", fontSize: "12px" }}>5</td>
          <td style={{ padding: "2px", fontSize: "12px" }}>5</td>
        </tr>
      </tbody>
    </table>
  );
}
