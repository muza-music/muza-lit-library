import React from "react";
import "./UploadFooter.scss";
import MuzaIcon from "~/icons/MuzaIcon";

interface UploadFooterProps {
  currentStep: number;
  onNext: () => void;
  onPrevious?: () => void;
  isNextDisabled: boolean;
  showBack?: boolean;
  nextLabel?: string;
}

const UploadFooter: React.FC<UploadFooterProps> = ({
  currentStep,
  onNext,
  onPrevious,
  isNextDisabled,
  showBack = false,
  nextLabel = "Next",
}) => {
  const steps = [
    { number: 1, label: "Upload Files" },
    { number: 2, label: "Complete Metadata" },
    { number: 3, label: "Preview & Publish" },
  ];

  return (
    <div className="upload-footer">
      <div className="stepper">
        <div className="stepper-container">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className={`step ${currentStep === step.number ? 'active' : ''}`}>
                <div className="step-number">{step.number}</div>
                <div className="step-label">{step.label}</div>
              </div>
              
              {index < steps.length - 1 && <div className="step-connector">
                <MuzaIcon iconName="line-container" />
                </div>}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      <div className="footer-buttons">
        {showBack && (
          <button 
            className="back-button" 
            onClick={onPrevious}
          >
            Back
          </button>
        )}
        
        <button 
          className="next-button" 
          onClick={onNext}
          disabled={isNextDisabled}
        >
          {nextLabel}
        </button>
      </div>
    </div>
  );
};

export default UploadFooter; 