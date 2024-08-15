
import React from 'react'
import Button from '../../atoms/Button/Button';
import './Modal.scss'

const Modal = ({ title, isOpen, onClose, onConfirm }) => {
    if (isOpen) {
        return <div className='modal'>
            <div className='modal-center' >
                <h3>{title}</h3>
                <div className="btns">
                    <Button children={'Yes,i do'} onClick={onConfirm} />
                    <Button children={'Cancel'} onClick={onClose} />
                </div>
            </div>
        </div>
    }
}


export default Modal