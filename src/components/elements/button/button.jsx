export default function Button({
  href,
  children,
  type,
  className,
  onClick,
  name,
}) {
  return (
    <button href={href} type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
}
