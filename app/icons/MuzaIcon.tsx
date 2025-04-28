import React from "react";

// Preload all SVGs at once
const icons = import.meta.glob("./icons/*.svg", {
  query: "?raw",
  eager: true,
  import: "default",
});

interface MuzaIconProps {
  iconName: string; // e.g., 'play', 'pause'
  svgStyle?: React.CSSProperties;
  className?: string;
}

const MuzaIcon: React.FC<MuzaIconProps> = ({
  iconName,
  svgStyle,
  className,
}) => {
  const svgContent = icons[`./icons/${iconName}.svg`]; // Get raw SVG content as string

  if (!svgContent) {
    return null; // Or show a placeholder
  }

  // Render the SVG content using `dangerouslySetInnerHTML`
  return (
    <i
      className={className}
      style={svgStyle}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export default MuzaIcon;
