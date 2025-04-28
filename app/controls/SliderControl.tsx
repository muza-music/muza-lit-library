import React, { useState, useRef, useEffect } from "react";

interface SliderControlProps {
  value?: number;
  disabled?: boolean;
  step?: number;
  min?: number;
  max?: number;
  className?: string;
  onChange?: (value: number) => void;
}

const SliderControl: React.FC<SliderControlProps> = ({
  value = 50,
  disabled = false,
  step = 1,
  min = 0,
  max = 100,
  className = "",
  onChange,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const handleRadius = 6;
    const minX = handleRadius;
    const maxX = rect.width - handleRadius;
    const x = Math.max(minX, Math.min(maxX, e.clientX - rect.left));
    const percentage = ((x - minX) / (maxX - minX)) * 100;
    const mappedValue = min + (percentage / 100) * (max - min);
    const steppedValue = Math.round(mappedValue / step) * step;
    onChange?.(steppedValue);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !sliderRef.current || disabled) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const handleRadius = 6;
    const minX = handleRadius;
    const maxX = rect.width - handleRadius;
    const x = Math.max(minX, Math.min(maxX, e.clientX - rect.left));
    const percentage = ((x - minX) / (maxX - minX)) * 100;
    const mappedValue = min + (percentage / 100) * (max - min);
    const steppedValue = Math.round(mappedValue / step) * step;
    onChange?.(steppedValue);
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

  const mapValueToPosition = (val: number): number => {
    const percentage = ((val - min) / (max - min)) * 100;
    return 6 + (percentage * 88) / 100;
  };

  return (
    <div
      className={`slider-control ${className} ${disabled ? "disabled" : ""}`}
    >
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
            r="6"
            onMouseDown={handleMouseDown}
          />
        </svg>
      </div>
    </div>
  );
};

export default SliderControl;
