import React from 'react';
import './DataBankModal.css';

interface DataBankModalProps {
  isOpen: boolean;
  onGoBack?: () => void;
  onManualFill?: () => void;
  onAutoFill?: () => void;
}

const DataBankModal: React.FC<DataBankModalProps> = ({
  isOpen,
  onGoBack,
  onManualFill,
  onAutoFill,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-content">
          <div className="modal-upper">
            {/* Modal header */}
            <div className="modal-header">
              <h3 className="modal-title">Auto-Fill Your Song Details?</h3>
            </div>
            {/* Modal body */}
            <div className="modal-body">
              <p className="modal-text">
                We'll Use The Artist And Album Name You Entered To Match Your
                Release With Existing Records.
              </p>
              <p className="modal-text">
                If We Find A Match, Song Titles, Composers, And More Will Be
                Filled In Automatically.
              </p>
              <p className="modal-text">You Can Still Edit Everything Later.</p>
            </div>
          </div>
          {/* Modal footer */}
          <div className="modal-footer">
            <button className="button button-red" onClick={onGoBack}>
              Go back
            </button>
            <div className="button-container">
              <button
                className="button button-gray"
                onClick={onManualFill}
              >
                No I'll do it manually
              </button>
              <button
                className="button button-blue"
                onClick={onAutoFill}
              >
                Yes please Auto-Fill
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataBankModal;