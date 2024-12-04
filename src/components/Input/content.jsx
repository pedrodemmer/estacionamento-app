export default function Input({
  placeholder,
  type = "text",
  id,
  value,
  onChange,
  onKeyDown,
  maxLength,
}) {
  const handleInputChange = (e) => {
    if (maxLength && e.target.value.length > maxLength) return;
    onChange(e);
  };

  return (
    <div>
      <input
        placeholder={placeholder}
        type={type}
        id={id}
        value={value}
        onKeyDown={onKeyDown}
        onChange={handleInputChange}
        className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 transition duration-200"
      />
    </div>
  );
}
