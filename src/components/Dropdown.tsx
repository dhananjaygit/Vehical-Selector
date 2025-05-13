import { useEffect } from "react";

interface DropdownItem {
  code: string;
  name: string;
}

interface DropdownProps {
  id: string;
  label: string;
  value: string;
  items: DropdownItem[];
  changeValue: (value: string) => void;
  disabled: boolean;
}

const Dropdown = ({
  id,
  label,
  value,
  items,
  changeValue,
  disabled,
}: DropdownProps) => {

  useEffect(() => {
  document.getElementById('manufacturer-select')?.focus();
}, []);

  return (
    <div className="dropdown-item">
      <label htmlFor={id}>{label}:</label>
      <select
        id={id}
        value={value}
        onChange={(e) => changeValue(e.target.value)}
        disabled={disabled}
      >
        <option value="">-- Select {label} --</option>
        {items.map((element) => (
          <option key={element.code} value={element.code}>
            {element.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
