import React from "react";
import "./PlayButton.scss";
import { FaPause, FaPlay } from "react-icons/fa";

interface PlayButtonProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  text: string;
  disabled?: boolean;
}

const PlayButton: React.FC<PlayButtonProps> = ({
  isPlaying,
  onPlayPause,
  text,
  disabled = false,
}) => {
  return (
    <div className="ctas-section" data-name="CTAs">
      <button
        className="play-album-button"
        onClick={onPlayPause}
        disabled={disabled}
        data-name="Button"
      >
        <div className="play-icon">{isPlaying ? <FaPause /> : <FaPlay />}</div>
        <span className="play-text">{text}</span>
      </button>
    </div>
  );
};

export default PlayButton;
