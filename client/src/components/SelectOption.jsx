export default function SelectOption({ value, options, onChange = () => {} }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="p-2 border border-gray-300 rounded-md outline-none"
    >
      <option value="" disabled>
        Select an option
      </option>
      {options?.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
}
