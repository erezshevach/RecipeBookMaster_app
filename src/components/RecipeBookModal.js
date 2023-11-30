import React from 'react';
import Modal from 'react-modal';

const RecipeBookModal = (props) => {

    const titles = {
        validation: 'Please fix the following:',
        status: 'Hooray!',
        error: 'Oops...'
    }
    return (
        <Modal
        isOpen={!!props.message}
        ariaHideApp={false}
        contentLabel='recipeBookModal'
        onRequestClose={props.onCloseModal}
        closeTimeoutMS={200}
        className={`modal modal--${props.modalType}`}
        >
            <h2 className='modal__title'>{titles[props.modalType]}</h2>
            <p className='modal__body'>{props.message}</p>
            <button className='button button--secondary' onClick={props.onCloseModal}>OK</button>
        </Modal>
    )
};

export default RecipeBookModal;
