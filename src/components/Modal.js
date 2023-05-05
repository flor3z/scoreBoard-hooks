import React from 'react';

const Modal = ({ reset, onClose, open }) => {
  if (!open) return null;
  return (
    <div className="overlay">
      <div className="modal-container">
        <p>
          The game has ended.
          <br />
          Reset to start a new game.
        </p>
        <div className="button-container">
          <button className="btn-modal reset" onClick={reset}>
            Reset
          </button>
          <button className="btn-modal close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
