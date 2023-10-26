import React, {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import RecipeForm from "./RecipeForm";
import {getRecipeFromApi, updateRecipeInApi, deleteRecipeInApi} from "../apiConnectors/recipeApiConnector";


const UpdateRecipePage = () => {

    console.log('loading UpdatePage');
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(undefined);
    const {recipePid} = useParams();


    useEffect(() => {
        console.log('UpdatePage useEffect triggered');
        getRecipeFromApi(recipePid)
            .then(result => setRecipe(result))
            .catch(err => setError(err))
            .finally(() => setIsLoading(false))
    }, [recipePid]);

    const onSubmit = (recipeUpdates) => {
        updateRecipeInApi(recipeUpdates)
            .then(result => {
                setRecipe(result)
                //navigate('/dashboard');)
            })
            .catch(err => setError(err))
    };

    const onRemove = () => {
        deleteRecipeInApi(recipePid)
            .then(res => {
                if (res.operationStatus === "SUCCESS") {
                    console.log(`${res.entityIdentifier} was deleted successfully`)
                } else if (res.operationStatus === "FAILURE") {
                    console.log(`${res.entityIdentifier} deletion failed`)
                }
                navigate('/dashboard');
            })
            .catch(err => console.log(err))
    };

    return (
        <div>
            {isLoading &&
                <div>Loading...</div>
            }
            {error &&
                <div>{error}</div>
            }
            {
                !isLoading &&
                <div>
                    {recipe.hasOwnProperty('recipePid') && <RecipeForm
                        recipe={recipe}
                        onSubmit={onSubmit}
                    />}
                    <button onClick={onRemove}>Remove recipe</button>
                </div>
            }
        </div>
    );
};


export {UpdateRecipePage as default};