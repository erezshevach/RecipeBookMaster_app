import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import RecipeForm from './RecipeForm';
import RecipeBookModal from "./RecipeBookModal";
import {createRecipeInApi} from "../apiConnectors/recipeApiConnector";


const CreateRecipePage = () => {

    console.log('loading CreatePage');
    const navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState('')
    const [statusMsg, setStatusMsg] = useState('')

    const onSubmit = (newRecipe) => {
        createRecipeInApi(newRecipe)
            .then(recipe => {
                setStatusMsg(`${recipe.name} recipe was created successfully`)
                //navigate('/dashboard')
            })
            .catch(err => { setErrorMsg(err.message) });
    }

    const onCloseErrorModal = () => {
        setErrorMsg('');
    };

    const onCloseStatusModal = () => {
        setStatusMsg('');
        navigate('/dashboard');
    };

    return (
        <div>
            <div className='page-header'>
                <div className='content-container'>
                    <h1 className='page-header__title'> Create New Recipe</h1>
                </div>
            </div>
            <div className='content-container'>
                {statusMsg && <p>{statusMsg}</p>}
                <RecipeForm
                    recipe={{}}
                    onSubmit={onSubmit}
                    readOnly={false}
                />
                <RecipeBookModal
                    id='errorMsgModal'
                    message={errorMsg}
                    onCloseModal={onCloseErrorModal}
                    modalType='error'
                />
                <RecipeBookModal
                    id='statusMsgModal'
                    message={statusMsg}
                    onCloseModal={onCloseStatusModal}
                    modalType='status'
                />
            </div>
        </div>
    );
}


export {CreateRecipePage as default};