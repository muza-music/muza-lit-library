import React from "react";
import MuzaInputField from "~/controls/MuzaInputField";
import type { UploadFormData, Musician } from "~/appData/uploadStore";
import "./UploadForm.scss";

interface UploadFormProps {
  formData: UploadFormData;
  musicians: Musician[];
  onFormDataChange: (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onMusicianChange: (index: number, field: keyof Musician) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddMusician: () => void;
}

const UploadForm: React.FC<UploadFormProps> = ({
  formData,
  musicians,
  onFormDataChange,
  onMusicianChange,
  onAddMusician,
}) => {
  return (
    <div className="upload-form">
      {/* General Info Section */}
      <div className="form-section">
        <div className="upload-section-header">
          <span className="upload-section-title">General Info</span>
          <div className="upload-section-divider"></div>
        </div>
        
        <div className="form-fields">
          <MuzaInputField
            name="albumTitle"
            label="Album Title"
            placeholder="Your album's name"
            value={formData.albumTitle}
            onChange={onFormDataChange('albumTitle')}
          />
          
          <MuzaInputField
            name="mainArtist"
            label="Main Artist"
            placeholder="Ezra Blue"
            value={formData.mainArtist}
            onChange={onFormDataChange('mainArtist')}
          />
          
          <MuzaInputField
            name="bandName"
            label="Band Name (Optional)"
            placeholder="Your band's name"
            value={formData.bandName}
            onChange={onFormDataChange('bandName')}
          />
          
          <MuzaInputField
            name="recordingDate"
            label="Recording Date"
            placeholder="Select Date"
            type="date"
            value={formData.recordingDate}
            onChange={onFormDataChange('recordingDate')}
          />
        </div>
      </div>

      {/* Additional Musicians Section */}
      <div className="form-section">
        <div className="upload-section-header">
          <span className="upload-section-title">Additional Musicians</span>
          <div className="upload-section-divider"></div>
        </div>
        
        <div className="musicians-container">
          {musicians.map((musician, index) => (
            <div key={index} className="musician-fields">
              <MuzaInputField
                name={`musicianName-${index}`}
                label="Musician's Name"
                placeholder="Musician's Name"
                value={musician.name}
                onChange={onMusicianChange(index, 'name')}
              />
              
              <MuzaInputField
                name={`musicianInstruments-${index}`}
                label="Instruments"
                placeholder="type in instruments"
                helperText="Separate multiple instruments with commas."
                value={musician.instruments}
                onChange={onMusicianChange(index, 'instruments')}
              />
            </div>
          ))}
          
          <div className="add-musician-container">
            <button className="add-musician-button" onClick={onAddMusician}>
              <span className="plus-icon">+</span>
              Add Musician
            </button>
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="form-section">
        <div className="upload-section-header">
          <span className="upload-section-title">Additional Information</span>
          <div className="upload-section-divider"></div>
        </div>
        
        <div className="form-fields">
          <div className="textarea-field">
            <label htmlFor="linerNotes">Liner Notes</label>
            <textarea
              id="linerNotes"
              placeholder="Add liner notes..."
              value={formData.linerNotes}
              onChange={onFormDataChange('linerNotes')}
              rows={4}
            />
          </div>
          
          <div className="textarea-field">
            <label htmlFor="otherCredits">Other Credits</label>
            <textarea
              id="otherCredits"
              placeholder="Add other credits..."
              value={formData.otherCredits}
              onChange={onFormDataChange('otherCredits')}
              rows={4}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;
export type { UploadFormData, Musician }; 