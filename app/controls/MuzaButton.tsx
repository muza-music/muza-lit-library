import React from "react";
import "./MuzaButton.css";

interface MuzaButtonProps {
  content: string;
}

const MuzaButton: React.FC<MuzaButtonProps> = ({ content }) => {
  return <div className="muza-button"> {content} </div>;
};

export default MuzaButton;
