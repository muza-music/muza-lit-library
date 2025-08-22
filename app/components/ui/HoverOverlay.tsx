import React from "react";
import "./HoverOverlay.scss";
import MuzaIcon from "~/icons/MuzaIcon";

interface HoverAction {
  icon: string;
  onClick: (e: React.MouseEvent) => void;
  title?: string;
}

interface HoverOverlayProps {
  isPlaying?: boolean;
  onPlayPause?: (e: React.MouseEvent) => void;
  actions?: HoverAction[];
  showPlayButton?: boolean;
}

const HoverOverlay: React.FC<HoverOverlayProps> = ({
  isPlaying = false,
  onPlayPause,
  actions = [],
  showPlayButton = true,
}) => {
  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation();
    onPlayPause?.(e);
  };

  return (
    <>
      {/* Hover overlay background */}
      <div className="hover-overlay" />

      {/* Play/Pause button in center */}
      {showPlayButton && onPlayPause && (
        <button className="hover-play-pause-btn" onClick={handlePlayPause}>
          <MuzaIcon iconName={isPlaying ? "pause" : "play-hover"} />
        </button>
      )}

      {/* Action buttons in top-right */}
      {actions.length > 0 && (
        <div className="hover-overlay-actions">
          {actions.map((action, index) => (
            <button
              key={index}
              className="hover-overlay-btn"
              onClick={action.onClick}
              title={action.title}
            >
              <MuzaIcon iconName={action.icon} />
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default HoverOverlay;
