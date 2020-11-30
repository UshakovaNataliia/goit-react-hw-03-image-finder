import React, { Component } from 'react';
import { createPortal } from 'react-dom';

const modal = document.querySelector('#modal-root');

class Modal extends Component { 
  componentDidMount = () => {
    window.addEventListener('keydown', this.handleKeydown);
  }
  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = e => {
    if (e.code === 'Escape') this.props.onClose();
  }

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) this.props.onClose();
  }

  render () {
    return createPortal(
      <div className="Overlay" onClick={this.handleBackdropClick}>
        <div className="Modal">
          <img src={this.props.img} alt=""/>
        </div>
      </div>,
      modal,
    );
  }
};

export default Modal;