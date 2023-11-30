import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import RecipeForm from "./RecipeForm";
import RecipeBookModal from "./RecipeBookModal";
import {getRecipeFromApi, updateRecipeInApi, deleteRecipeInApi} from "../apiConnectors/recipeApiConnector";


const UpdateRecipePage = () => {

    console.log('loading UpdatePage');
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [statusMsg, setStatusMsg] = useState('');
    const {recipePid} = useParams();


    useEffect(() => {
        console.log('UpdatePage useEffect triggered');
        getRecipeFromApi(recipePid)
            .then(recipe => setRecipe(recipe))
            .catch(err => setErrorMsg(err.message))
            .finally(() => setIsLoading(false))
    }, [recipePid]);

    const onSubmit = (recipeUpdates) => {
        updateRecipeInApi(recipeUpdates)
            .then(recipe => {
                setRecipe(recipe)
                setStatusMsg(`${recipe.name} recipe was updated successfully`)
            })
            .catch(err => {
                setErrorMsg(err.message)
            })
    };

    const onRemove = () => {
        deleteRecipeInApi(recipePid)
            .then(recipe => {
                setStatusMsg(`${recipe.name} was deleted successfully`)
                //navigate('/dashboard');
            })
            .catch(err => setErrorMsg(err.message))
    };

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
                    <h1 className='page-header__title'> Recipe Form </h1>
                    <div className='page-header__actions'>
                        <button className='button button--secondary' onClick={onRemove}>Remove recipe</button>
                    </div>
                </div>
            </div>
            <div className='content-container'>
                {isLoading &&
                    <div>Loading...</div>
                }
                {
                    !isLoading &&
                    <div>
                        {recipe.hasOwnProperty('recipePid') &&
                            <RecipeForm
                                recipe={recipe}
                                onSubmit={onSubmit}
                                readOnly={false}
                            />}
                    </div>
                }
                <RecipeBookModal
                    id='errorMsgModal'
                    modalType='error'
                    title='Error'
                    message={errorMsg}
                    onCloseModal={onCloseErrorModal}
                />
                <RecipeBookModal
                    id='statusMsgModal'
                    modalType='status'
                    message={statusMsg}
                    onCloseModal={onCloseStatusModal}
                />
            </div>
        </div>
    );
};


export {UpdateRecipePage as default};