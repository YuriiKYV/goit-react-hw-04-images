import { Component } from 'react';
import css from '../Modal/Modal.module.css';
import { PropTypes } from 'prop-types';

export default class Modal extends Component {

    componentDidMount() {
        document.addEventListener("keydown", this.closeModal);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.closeModal)
    }

    closeModal = ({ target, currentTarget, code }) => {
        if (target === currentTarget || code === "Escape") {
            this.props.onClose();
        }

    }

    render() {
        const largeImageURL = this.props.largeImageURL;
        const { closeModal } = this;

        return (
            <div className={css.overlay} onClick={closeModal}>
                <div className={css.modal}>
                    <img src={largeImageURL} alt="" />
                </div>
            </div >
        )
    }
}

Modal.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

