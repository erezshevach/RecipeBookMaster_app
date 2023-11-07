import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import RecipeForm from "./RecipeForm";
import RecipeBookModal from "./RecipeBookModal";
import {getRecipeFromApi} from "../apiConnectors/recipeApiConnector";


const ViewRecipePage = () => {

    console.log('loading ViewPage');
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');
    const [statusMsg, setStatusMsg] = useState('');
    const {recipePid} = useParams();


    useEffect(() => {
        console.log('ViewPage useEffect triggered');
        getRecipeFromApi(recipePid)
            .then(recipe => setRecipe(recipe))
            .catch(err => setErrorMsg(err.message))
            .finally(() => setIsLoading(false))
    }, [recipePid]);

    const onEdit = () => {
        navigate(`/update/${recipePid}`);
    };

    const onCloseErrorModal = () => {
        setErrorMsg('');
    };

    const onCloseStatusModal = () => {
        setStatusMsg('');
        navigate('/dashboard');
    };

    const title = recipe.name ? recipe.name.toUpperCase() : 'Recipe Page';

    return (
        <div>
            <div className='page-header'>
                <div className='content-container'>
                    <h1 className='page-header__title'> {title} </h1>
                    <div className='page-header__actions'>
                        <button className='button' onClick={onEdit}>Edit recipe</button>
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
                                onSubmit={null}
                                readOnly={true}
                            />}
                    </div>
                }
                <RecipeBookModal
                    id='errorMsgModal'
                    title='Error'
                    message={errorMsg}
                    onCloseModal={onCloseErrorModal}
                />
                <RecipeBookModal
                    id='statusMsgModal'
                    title=''
                    message={statusMsg}
                    onCloseModal={onCloseStatusModal}
                />
            </div>
        </div>
    );
};


export {ViewRecipePage as default};