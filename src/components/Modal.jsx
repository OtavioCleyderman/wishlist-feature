import React from 'react';
import PropTypes from 'prop-types';


const Modal = ({
  isOpen,
  onClose,
  title,
  content,
  showCloseButton = true,
  closeButtonText = 'Fechar',
  size = 'medium',
  overlayClose = false,
}) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleOverlayClick = (event) => {
    if (overlayClose && event.target === event.currentTarget) {
      handleClose();
    }
  };

  return (
    <div
      className={`modal modal--overlay ${isOpen ? 'modal--open' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className={`modal__dialog modal__dialog--${size}`}>
        <div className="modal__header">
          <h2 className="modal__title">{title}</h2>
        </div>
        <div className="modal__main">
          {content}
        </div>
        {showCloseButton && (
            <button className="modal__close" onClick={handleClose}>
              {closeButtonText}
            </button>
          )}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  showCloseButton: PropTypes.bool,
  closeButtonText: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  overlayClose: PropTypes.bool,
};

export default Modal;