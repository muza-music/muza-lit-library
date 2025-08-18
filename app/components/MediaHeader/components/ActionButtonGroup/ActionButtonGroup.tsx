import React from "react";
import "./ActionButtonGroup.scss";

interface ActionButtonGroupProps {
  children: React.ReactNode;
  alignment?: 'start' | 'center' | 'end';
  gap?: 'small' | 'medium' | 'large';
}

const ActionButtonGroup: React.FC<ActionButtonGroupProps> = ({ 
  children, 
  alignment = 'end',
  gap = 'medium'
}) => {
  return (
    <div className={`action-buttons action-buttons--${alignment} action-buttons--gap-${gap}`}>
      {children}
    </div>
  );
};

export default ActionButtonGroup;
