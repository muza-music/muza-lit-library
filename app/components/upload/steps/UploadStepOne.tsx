import React from "react";
import UploadForm from "../UploadForm";
import UploadFileArea from "../UploadFileArea";
import type { UploadFormData, Musician } from "~/appData/uploadStore";
import "./UploadStepOne.scss";

interface UploadStepOneProps {
  formData: UploadFormData;
  musicians: Musician[];
  audioFiles: File[]; // Add audioFiles prop
  onFormDataChange: (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onMusicianChange: (index: number, field: keyof Musician) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddMusician: () => void;
  onCoverUpload: (file: File) => void;
  onFileUpload: (files: File[]) => void;
}

const UploadStepOne: React.FC<UploadStepOneProps> = ({
  formData,
  musicians,
  audioFiles,
  onFormDataChange,
  onMusicianChange,
  onAddMusician,
  onCoverUpload,
  onFileUpload,
}) => {
  return (
    <div className="upload-step-one">
      <div className="upload-container">
        <div className="upload-left">
          <UploadForm
            formData={formData}
            musicians={musicians}
            onFormDataChange={onFormDataChange}
            onMusicianChange={onMusicianChange}
            onAddMusician={onAddMusician}
          />
        </div>

        <div className="upload-right">
          <UploadFileArea
            onCoverUpload={onCoverUpload}
            onFileUpload={onFileUpload}
            uploadedFiles={audioFiles}
          />
        </div>
      </div>
    </div>
  );
};

export default UploadStepOne; 