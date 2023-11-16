import Headers from "../header";
import { useState } from "react";
export default function Section({ children, tittle }) {
  const [mode, setMode] = useState(false);
  return (
    <main
      className={`${!mode ? "bg-gray-100" : "bg-[#474747]"} min-h-screen p-4`}
    >
      <Headers
        tittle={tittle}
        onClick={() => setMode(!mode)}
        className={`flex justify-between mb-4 ${
          !mode ? "text-gray-800" : "text-white"
        }`}
      />
      {children}
    </main>
  );
}
