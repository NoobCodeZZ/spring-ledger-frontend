const Input = ({ label, type = "text", value, onChange, placeholder, required = false, name }) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        required={required}
        className="px-3 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow bg-white dark:bg-slate-900 dark:text-white dark:placeholder-gray-500"
      />
    </div>
  );
};
export default Input;
