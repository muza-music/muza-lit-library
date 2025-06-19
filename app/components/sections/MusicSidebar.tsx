import React from "react";
import "./MusicSidebar.scss";
import MuzaIcon from "~/icons/MuzaIcon";
import type { MenuItem, Section } from "~/appData/models";
import { useNavigate } from "react-router";

interface MusicSidebarProps {
  logoSrc: string;
  logoAlt?: string;
  sections: Section[];
}

const MusicSidebar: React.FC<MusicSidebarProps> = ({
  logoSrc,
  logoAlt = "Logo",
  sections,
}) => {
  const navigate = useNavigate();

  const handleItemClick = (item: MenuItem) => {
    if (item.action) {
      navigate(item.action);
    }
  };

  const renderMenuItem = (item: MenuItem, index: number) => {
    return (
      <a
        key={index}
        className="menu-item"
        onClick={() => handleItemClick(item)}
      >
        <MuzaIcon iconName={item.svg} />
        <span>{item.text}</span>
      </a>
    );
  };

  const renderSection = (section: Section, index: number) => (
    <div key={index} className="section">
      {section.title && <div className="section-title">{section.title}</div>}
      {section.items.map(renderMenuItem)}
    </div>
  );

  return (
    <div className="music-sidebar">
      <div className="logo">
        <img src={logoSrc} alt={logoAlt} />
      </div>
      {sections.map(renderSection)}
    </div>
  );
};

export default MusicSidebar;
