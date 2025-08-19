import React from "react";
import "./MuzaButton.scss";
import MuzaIcon from "~/icons/MuzaIcon";

interface MuzaButtonProps {
  content?: string;
  iconName?: string;
  onClick?: () => void;
  disabled?: boolean;
  size?: "small" | "default" | "medium";
  className?: string;
  "data-name"?: string;
}

const MuzaButton: React.FC<MuzaButtonProps> = ({
  content,
  iconName,
  onClick,
  disabled = false,
  size = "default",
  className = "",
  "data-name": dataName,
  ...props
}) => {
  const sizeClass = size !== "default" ? `muza-button--${size}` : "";
  const buttonClasses = `muza-button ${sizeClass} ${className}`.trim();

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      data-name={dataName}
      {...props}
    >
      {iconName && <MuzaIcon iconName={iconName} />}
      {content && <span>{content}</span>}
    </button>
  );
};

export default MuzaButton;
