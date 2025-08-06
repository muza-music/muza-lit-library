import React from "react";
import "./WaveAnimation.scss";

interface WaveAnimationProps {
  className?: string;
}

const WaveAnimation: React.FC<WaveAnimationProps> = ({ className = "" }) => {
  return (
    <div className={`wave-container ${className}`}>
      <div className="bar" />
      <div className="bar" />
      <div className="bar" />
    </div>
  );
};

export default WaveAnimation;
