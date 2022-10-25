import { useEffect } from 'react';
import css from '../Modal/Modal.module.css';
import { PropTypes } from 'prop-types';

export default function Modal({ onClose, largeImageURL }) {


    useEffect(() => {
        document.addEventListener("keydown", closeModal);
        return () => {
            document.removeEventListener("keydown", closeModal)
        }
    },)


    const closeModal = ({ target, currentTarget, code }) => {
        console.log(code)
        if (target === currentTarget || code === "Escape") {
            onClose();
        }
    }

    return (
        <div className={css.overlay} onClick={closeModal}>
            <div className={css.modal}>
                <img src={largeImageURL} alt="" />
            </div>
        </div >
    )
}

Modal.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};
