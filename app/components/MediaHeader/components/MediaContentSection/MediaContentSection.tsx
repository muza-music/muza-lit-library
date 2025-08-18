import React from "react";
import "./MediaContentSection.scss";

interface MediaContentSectionProps {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
}

const MediaContentSection: React.FC<MediaContentSectionProps> = ({ 
  children, 
  orientation = 'horizontal' 
}) => {
  return (
    <div className={`media-content-section media-content-section--${orientation}`}>
      {children}
    </div>
  );
};

export default MediaContentSection;
