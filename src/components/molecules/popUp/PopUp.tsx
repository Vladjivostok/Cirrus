import React, { MouseEventHandler } from 'react';
import Modal from 'react-modal';

import './popUp.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: '2rem',
    transform: 'translate(-50%, -50%)',
    boxShadow: '-5px 5px 4px 0px rgba(0, 0, 0, 0.33)',
    borderRadius: '0.2rem'
  },
  overlay: {
    backgroundColor: 'rgb(70 70 70 / 75%)'
  }
};

type PopUpProps = {
  label: string;
  children: JSX.Element;
  isOpen: boolean;
  closeModal: MouseEventHandler<HTMLDivElement> | undefined;
};

const PopUp: React.FC<PopUpProps> = ({ children, isOpen, closeModal }) => {
  return (
    <div>
      <Modal ariaHideApp={false} isOpen={isOpen} style={customStyles} onRequestClose={closeModal}>
        {children}
      </Modal>
    </div>
  );
};

export default PopUp;
