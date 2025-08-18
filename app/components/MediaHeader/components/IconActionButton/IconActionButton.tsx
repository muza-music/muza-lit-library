import React from "react";
import "./IconActionButton.scss";
import MuzaIcon from "~/icons/MuzaIcon";

interface IconActionButtonProps {
  iconName: string;
  onClick: () => void;
  variant?: 'default' | 'compact';
  disabled?: boolean;
  "data-name"?: string;
}

const IconActionButton: React.FC<IconActionButtonProps> = ({ 
  iconName, 
  onClick, 
  variant = 'default',
  disabled = false,
  "data-name": dataName
}) => {
  return (
    <button
      className={`action-button action-button--${variant}`}
      onClick={onClick}
      disabled={disabled}
      data-name={dataName}
    >
      <MuzaIcon iconName={iconName} />
    </button>
  );
};

export default IconActionButton;
