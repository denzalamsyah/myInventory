import { useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
export default function InputComp({
  icon,
  placeholder,
  type,
  id,
  value,
  onChange,
  name,
}) {
  return (
    <div className=" bg-white relative border-b-2 border-blue-500">
      <span className="bg-white absolute inset-y-0 left-0 flex items-center text-gray-400">
        {icon}
      </span>
      <input
        id={id}
        type={type}
        name={name}
        className="bg-white pl-10 pr-3 py-2 w-full text-gray-700 focus:none outline-none border-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
}
