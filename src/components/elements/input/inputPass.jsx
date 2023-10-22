import { useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
export default function InputPassComp({
  icon,
  placeholder,
  id,
  value,
  onChange,
  icons,
  name,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="relative border-b-2 border-blue-500">
      <span className="bg-white absolute inset-y-0 left-0 flex items-center text-gray-400">
        {icon}
      </span>
      <input
        id={id}
        type={showPassword ? "text" : "password"}
        name={name}
        className="bg-white pl-10 pr-3 py-2 w-full text-gray-700 focus:none outline-none border-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        icons={icons}
      />
      <span
        className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
      </span>
    </div>
  );
}
