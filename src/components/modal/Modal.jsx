import { createPortal } from 'react-dom';
import propTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children, onClose }) => {
  const handleEscapeClose = e => {
    if (e.code === 'Escape') {
      onClose();
      window.removeEventListener('keydown', handleEscapeClose);
      console.log('keydown Escape');
    }
  };

  window.addEventListener('keydown', handleEscapeClose);

  const handleBackdropClose = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={handleBackdropClose}>
      <div className={css.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  Children: propTypes.node,
  onClose: propTypes.func.isRequired,
};
