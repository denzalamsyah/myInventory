export default function TabelAtasRoom() {
  return (
    <div className="flex space-x-[100px]">
      <div>
        <h1 className="text-[12px] font-bold text-blue-700 mb-2">Kategori</h1>
        <table>
          <thead>
            <tr>
              <td className="text-[12px] text-gray-800 font-bold">14</td>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr>
              <td className="text-[10px] text-center">7 hari terakhir</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h1 className="text-[12px] font-bold text-[#E19133] mb-2">
          Total Kategori
        </h1>
        <table>
          <thead>
            <tr>
              <td className="text-[12px] text-gray-800 font-bold">868</td>
              <td className="text-[12px] px-4 text-gray-800 font-bold">
                25000
              </td>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr>
              <td className="text-[10px] text-center">7 hari terakhir</td>
              <td className="px-4 text-[10px] text-center">pendapatan</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h1 className="text-[12px] font-bold text-[#845EBC] mb-2">Terlaris</h1>
        <table>
          <thead>
            <tr>
              <td className="text-[12px] text-gray-800 font-bold">5</td>
              <td className="text-[12px] px-4 text-gray-800 font-bold">2500</td>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr>
              <td className="text-[10px] text-center">7 hari terakhir</td>
              <td className="px-4 text-[10px] text-center">biaya</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h1 className="text-[12px] font-bold text-[#F36960] mb-2">
          Stok Sedikit
        </h1>
        <table>
          <thead>
            <tr>
              <td className="text-[12px] text-gray-800 font-bold">5</td>
              <td className="text-[12px] px-4 text-gray-800 font-bold">12</td>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr>
              <td className="text-[10px] text-center">dipesan</td>
              <td className="px-4 text-[10px] text-center">habis</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
