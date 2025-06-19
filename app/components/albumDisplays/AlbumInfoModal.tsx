import React from "react";
import "./AlbumInfoModal.scss";

interface AlbumInfoProps {
  isOpen: boolean;
  onClose: () => void;
}

const AlbumInfoModal: React.FC<AlbumInfoProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-header">
        <img
          className="album-cover"
          src="../art/imag_1.jpg"
          alt="Ballads album cover"
        />
        <div className="album-info">
          <h2 className="album-title">Ballads</h2>
          <p className="artist-name">john coltrano</p>
        </div>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
      </div>

      <div className="modal-content">
        <div className="info-grid">
          <div className="info-label">Tenor Saxophone</div>
          <div className="info-value">John Coltrane</div>

          <div className="info-label">Piano</div>
          <div className="info-value">McCoy Tyner</div>

          <div className="info-label">Bass</div>
          <div className="info-value">Jimmy Garrison</div>

          <div className="info-label">Drums</div>
          <div className="info-value">Elvin Jones</div>

          <div className="info-label">Composer</div>
          <div className="info-value">Richard Rodgers</div>

          <div className="info-label">Lyrics</div>
          <div className="info-value">Lorenz Hart</div>

          <div className="info-label">Recorded on</div>
          <div className="info-value">Nov 13, 1962</div>

          <div className="info-label">Recorded by</div>
          <div className="info-value">By Rudy Van Gelder</div>

          <div className="info-label">Produced by</div>
          <div className="info-value">Bob Thiele</div>

          <div className="info-label">Label</div>
          <div className="info-value">Impulse Records</div>
        </div>
      </div>
    </div>
  );
};

export default AlbumInfoModal;
