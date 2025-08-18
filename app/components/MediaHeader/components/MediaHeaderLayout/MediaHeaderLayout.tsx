import React from "react";
import "./MediaHeaderLayout.scss";

interface MediaHeaderLayoutProps {
  children: React.ReactNode;
  hasBackButton?: boolean;
}

const MediaHeaderLayout: React.FC<MediaHeaderLayoutProps> = ({ 
  children, 
  hasBackButton = true 
}) => {
  return (
    <div className={`media-header-layout ${hasBackButton ? 'has-back-button' : ''}`}>
      {children}
    </div>
  );
};

export default MediaHeaderLayout;
