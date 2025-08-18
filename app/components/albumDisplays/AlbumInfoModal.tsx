import React from "react";
import "./AlbumInfoModal.scss";
import { useTranslation } from "~/lib/i18n/translations";

interface AlbumInfoProps {
  isOpen: boolean;
  onClose: () => void;
}

const AlbumInfoModal: React.FC<AlbumInfoProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <img
            className="album-cover"
            src="/art/imag_1.jpg"
            alt={t("albumInfo.balladsCover")}
          />
          <div className="album-info">
            <h2 className="album-title">{t("albumInfo.ballads")}</h2>
            <p className="artist-name">{t("albumInfo.johnColtrane")}</p>
          </div>
          <button className="modal-close" onClick={onClose}>
            {t("common.close")}
          </button>
        </div>

        <div className="modal-content">
          <div className="info-grid">
            <div className="info-label">{t("albumInfo.tenorSaxophone")}</div>
            <div className="info-value">{t("albumInfo.johnColtraneValue")}</div>

            <div className="info-label">{t("albumInfo.piano")}</div>
            <div className="info-value">{t("albumInfo.mccoyTyner")}</div>

            <div className="info-label">{t("albumInfo.bass")}</div>
            <div className="info-value">{t("albumInfo.jimmyGarrison")}</div>

            <div className="info-label">{t("albumInfo.drums")}</div>
            <div className="info-value">{t("albumInfo.elvinJones")}</div>

            <div className="info-label">{t("albumInfo.composer")}</div>
            <div className="info-value">{t("albumInfo.richardRodgers")}</div>

            <div className="info-label">{t("albumInfo.lyrics")}</div>
            <div className="info-value">{t("albumInfo.lorenzHart")}</div>

            <div className="info-label">{t("albumInfo.recordedOn")}</div>
            <div className="info-value">{t("albumInfo.recordingDate")}</div>

            <div className="info-label">{t("albumInfo.recordedBy")}</div>
            <div className="info-value">{t("albumInfo.rudyVanGelder")}</div>

            <div className="info-label">{t("albumInfo.producedBy")}</div>
            <div className="info-value">{t("albumInfo.bobThiele")}</div>

            <div className="info-label">{t("albumInfo.label")}</div>
            <div className="info-value">{t("albumInfo.impulseRecords")}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumInfoModal;
