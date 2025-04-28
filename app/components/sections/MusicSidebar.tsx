import React from "react";
import "./MusicSidebar.css";
import MuzaIcon from "~/icons/MuzaIcon";

interface MenuItem {
  svg?: string;
  icon?: string;
  text: string;
  action?: () => void;
}

interface Section {
  title: string;
  items: MenuItem[];
}

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
  const handleItemClick = (action?: () => void) => {
    if (action) {
      action();
    }
  };

  const renderMenuItem = (item: MenuItem, index: number) => {
    const icon = item.svg ? (
      // Placeholder: Replace `div` with your custom SVG component if needed
      <div
        style={{
          marginRight: "10px",
          width: "20px",
          height: "20px",
          fill: "#666",
        }}
      >
        {/* Could render actual SVG here */}
        <MuzaIcon iconName={item.svg} />
      </div>
    ) : (
      <i className={`fa-solid fa-${item.icon}`}></i>
    );

    return (
      <a
        key={index}
        className="menu-item"
        onClick={() => handleItemClick(item.action)}
      >
        {icon}
        <span>{item.text}</span>
      </a>
    );
  };

  const renderSection = (section: Section, index: number) => (
    <div key={index} className="section">
      <div className="section-title">{section.title}</div>
      {section.items.map(renderMenuItem)}
    </div>
  );

  return (
    <div className="music-sidebar">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
      />
      <div className="logo">
        <img src={logoSrc} alt={logoAlt} />
      </div>
      {sections.map(renderSection)}
    </div>
  );
};

export default MusicSidebar;
