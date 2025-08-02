import React from "react";
import "./UploadHeader.scss";

interface UploadHeaderProps {
  title: string;
  onCancel: () => void;
}

const UploadHeader: React.FC<UploadHeaderProps> = ({ title, onCancel }) => {
  return (
    <div className="upload-header">
      <h1>{title}</h1>
      <button className="cancel-button" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
};

export default UploadHeader; 