import React from "react";
import "./BackButton.scss";
import MuzaIcon from "~/icons/MuzaIcon";

interface BackButtonProps {
  onClick: () => void;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick, className = "" }) => {
  return (
    <div className={`back-close-section ${className}`} data-name="back & close">
      <div className="back-button" data-name="back" onClick={onClick}>
        <div className="back-icon">
          <MuzaIcon iconName="ChevronDown" />
        </div>
      </div>
    </div>
  );
};

export default BackButton;
