import React, { useState, useRef, useEffect } from "react";
import "./VolumeControl.scss";
import { FaVolumeUp, FaVolumeDown, FaVolumeMute } from "react-icons/fa";

interface VolumeControlProps {
  value?: number;
  muted?: boolean;
  disabled?: boolean;
  volumeStep?: number;
  onVolumeChange?: (value: number) => void;
  noSymbol?: boolean;
}

const VolumeControl: React.FC<VolumeControlProps> = ({
  value = 75,
  muted = false,
  disabled = false,
  volumeStep = 1,
  onVolumeChange,
  noSymbol = false,
}) => {
  const [isMuted, setIsMuted] = useState(muted);
  const [isDragging, setIsDragging] = useState(false);
  const previousVolume = useRef(value);
  const sliderRef = useRef<HTMLDivElement>(null);

  const toggleMute = () => {
    if (disabled) return;
    if (isMuted) {
      setIsMuted(false);
      onVolumeChange?.(previousVolume.current);
    } else {
      previousVolume.current = value;
      setIsMuted(true);
      onVolumeChange?.(0);
    }
  };

  const getVolumeIcon = () => {
    if (isMuted || value === 0) return "volume-mute";
    if (value < 50) return "volume-down";
    return "volume-up";
  };

  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const handleRadius = 8;
    const minX = handleRadius;
    const maxX = rect.width - handleRadius;
    const x = Math.max(minX, Math.min(maxX, e.clientX - rect.left));
    const percentage = ((x - minX) / (maxX - minX)) * 100;
    const steppedValue = Math.round(percentage / volumeStep) * volumeStep;
    setIsMuted(false);
    onVolumeChange?.(steppedValue);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !sliderRef.current || disabled) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const handleRadius = 8;
    const minX = handleRadius;
    const maxX = rect.width - handleRadius;
    const x = Math.max(minX, Math.min(maxX, e.clientX - rect.left));
    const percentage = ((x - minX) / (maxX - minX)) * 100;
    const steppedValue = Math.round(percentage / volumeStep) * volumeStep;
    onVolumeChange?.(steppedValue);
  };

  const handleMouseDown = () => {
    if (disabled) return;
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const mapValueToPosition = (value: number): number => {
    return 8 + (value * 84) / 100;
  };

  return (
    <div className={`volume-control ${disabled ? "disabled" : ""}`}>
      {!noSymbol && (
        <>
          <i
            className="fa-solid fa-speaker volume-icon"
            onClick={toggleMute}
          ></i>
          <i
            className={`fa-solid fa-${getVolumeIcon()} volume-icon`}
            onClick={toggleMute}
          ></i>
        </>
      )}
      <div className="slider" ref={sliderRef} onClick={handleSliderClick}>
        <svg viewBox="0 0 100 24">
          <line className="track" x1="2" y1="12" x2="98" y2="12" />
          <line
            className="fill"
            x1="2"
            y1="12"
            x2={mapValueToPosition(value)}
            y2="12"
          />
          <circle
            className="handle"
            cx={mapValueToPosition(value)}
            cy="12"
            r="8"
            onMouseDown={handleMouseDown}
          />
        </svg>
      </div>
    </div>
  );
};

export default VolumeControl;
