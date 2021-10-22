import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import './Modal.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ children, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };
  return createPortal(
    <div className="Overlay" onClick={handleBackdropClick}>
      <div className="Modal">{children}</div>
    </div>,
    modalRoot,
  );
}
Modal.propTypes = {
  children: PropTypes.any.isRequired,
};
