import React, { useState } from "react";
import "./Navbar.css";
import MuzaIcon from "~/icons/MuzaIcon";


interface MenuItem {
  svg?: string;
  text: string;
  action?: () => void;
}


interface NavbarProps {
  manuItems: MenuItem[];
}

const Navbar: React.FC<NavbarProps> = ({ manuItems }) => {
  const handleItemClick = (action?: () => void) => {
    if (action) {
      action();
    }
  };

  const renderSection = (menuItem: MenuItem, index: number) => (
    <div key={index} className="nav-items" onClick={() => handleItemClick(menuItem.action)}
    >
      <MuzaIcon iconName={menuItem.svg || ""}></MuzaIcon>
      <div className="item-text">{menuItem.text}</div>
    </div>
  );
  
  

  return (
    <div className="nav-bar" >
          {manuItems.map(renderSection)}
    </div>
  );
};

export default Navbar;
