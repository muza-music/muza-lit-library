import React from "react";
import "./ToggleButton.scss";

interface ToggleButtonProps {
  checked: boolean;
  label?: string;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  checked,
  label = "",
  disabled = false,
  onChange,
}) => {
  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div className="toggle-wrapper" onClick={handleToggle}>
      <label className="toggle">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={handleToggle}
        />
        <span className="slider"> </span>
      </label>
      {label && <span className="label"> {label} </span>}
    </div>
  );
};

export default ToggleButton;
