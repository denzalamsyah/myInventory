import LabelComp from "../elements/label/label";

export default function SelectInput({
  id,
  name,
  value,
  onChange,
  className,
  children,
  label,
}) {
  return (
    <div className="flex justify-center items-center">
      <LabelComp htmlFor="noInduk" className="text-gray-600 w-48 text-sm">
        {label}
      </LabelComp>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={className}
      >
        {children}
      </select>
    </div>
  );
}
