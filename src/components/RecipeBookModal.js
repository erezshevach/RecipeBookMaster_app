import React from 'react';
import Modal from 'react-modal';

const RecipeBookModal = (props) => {


    return (
        <Modal
        isOpen={!!props.message}
        ariaHideApp={false}
        contentLabel='recipeBookModal'
        onRequestClose={props.onCloseModal}
        >
            <h1>{props.title}</h1>
            <p>{props.message}</p>
            <button onClick={props.onCloseModal}>OK</button>
        </Modal>
    )
};

export default RecipeBookModal;
