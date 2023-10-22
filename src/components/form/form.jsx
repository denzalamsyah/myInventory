import LabelComp from "../elements/label/label";

export default function FormComp({
  id,
  type,
  placeholder,
  value,
  onChange,
  children,
}) {
  return (
    <div className="flex justify-center items-center">
      <LabelComp htmlFor="noInduk" className="text-gray-600 w-48 text-sm">
        {children}
      </LabelComp>
      <input
        id={id}
        type={type}
        className="px-[20px] py-1 w-full text-sm text-gray-700 border rounded-md focus:none outline-none bg-white"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
