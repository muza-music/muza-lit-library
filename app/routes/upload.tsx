import React from "react";
import { useNavigate } from "react-router";
import { useUploadStore } from "~/appData/uploadStore";
import UploadHeader from "~/components/upload/UploadHeader";
import UploadStepOne from "~/components/upload/steps/UploadStepOne";
import UploadStepTwo from "~/components/upload/steps/UploadStepTwo";
import UploadStepThree from "~/components/upload/steps/UploadStepThree";
import UploadFooter from "~/components/upload/UploadFooter";

import "../styles/scrollbar.scss";
import "../styles/variables.scss";
import "../styles/main.scss";

export default function Upload() {
  const navigate = useNavigate();
  
  // Get state and actions from upload store
  const {
    currentStep,
    formData,
    musicians,
    audioFiles,
    trackMetadata,
    coverImage,
    
    // Actions
    updateFormData,
    updateMusician,
    addMusician,
    setCoverImage,
    setAudioFiles,
    updateTrackMetadata,
    deleteTrack,
    reorderTracks,
    validateCurrentStep,
    nextStep,
    previousStep,
    resetUpload,
    getUploadData,
  } = useUploadStore();

  const handleCancel = () => {
    resetUpload();
    navigate("/");
  };

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updateFormData(field as keyof typeof formData, e.target.value);
  };

  const handleMusicianChange = (index: number, field: keyof typeof musicians[0]) => (e: React.ChangeEvent<HTMLInputElement>) => {
    updateMusician(index, field, e.target.value);
  };

  const handleFileUpload = (files: File[]) => {
    setAudioFiles(files);
  };

  const handleCoverUpload = (file: File) => {
    setCoverImage(file);
  };

  const handleNext = () => {
    if (currentStep === 3) {
      // Final submit logic
      const albumData = getUploadData();
      console.log("Album data ready for upload:", albumData);
      alert(`Upload complete! Album: "${formData.albumTitle}" with ${trackMetadata.length} tracks`);
      resetUpload();
      navigate("/");
    } else {
      nextStep();
    }
  };

  const handlePrevious = () => {
    previousStep();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <UploadStepOne
            formData={formData}
            musicians={musicians}
            audioFiles={audioFiles}
            onFormDataChange={handleInputChange}
            onMusicianChange={handleMusicianChange}
            onAddMusician={addMusician}
            onCoverUpload={handleCoverUpload}
            onFileUpload={handleFileUpload}
          />
        );
      case 2:
        return (
          <UploadStepTwo
            trackMetadata={trackMetadata}
            onTrackMetadataChange={updateTrackMetadata}
            onDeleteTrack={deleteTrack}
            onReorderTracks={reorderTracks}
          />
        );
      case 3:
        return (
          <UploadStepThree
            formData={formData}
            trackMetadata={trackMetadata}
            coverImage={coverImage}
            onSave={() => {
              // Handle save functionality if needed
              console.log("Save album data");
            }}
            onPublish={() => {
              // This will be handled by the footer's publish button
              console.log("Publish album");
            }}
          />
        );
      default:
        return null;
    }
  };

  const isNextDisabled = !validateCurrentStep();

  return (
    <div className="upload-page">
      <UploadHeader
        title="Album Upload"
        onCancel={handleCancel}
      />

      {renderStepContent()}

      <UploadFooter
        currentStep={currentStep}
        onNext={handleNext}
        onPrevious={handlePrevious}
        isNextDisabled={isNextDisabled}
        showBack={currentStep > 1}
        nextLabel={currentStep === 3 ? "Publish" : "Next"}
      />
    </div>
  );
} 