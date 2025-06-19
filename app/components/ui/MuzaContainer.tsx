import React, { type ReactNode } from "react";
import "./MuzaContainer.scss";

interface MuzaContainerProps {
  children: ReactNode | ReactNode[];
}

const MuzaContainer: React.FC<MuzaContainerProps> = ({ children }) => {
  return <div className="muza-container"> {children} </div>;
};

export default MuzaContainer;
