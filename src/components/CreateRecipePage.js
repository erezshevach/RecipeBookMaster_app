import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import RecipeForm from './RecipeForm';
import {createRecipeInApi} from "../apiConnectors/recipeApiConnector";


const CreateRecipePage = () => {

    console.log('loading CreatePage');
    const navigate = useNavigate()
    const [submitError, setSubmitError] = useState('')

    const onSubmit = (newRecipe) => {
        createRecipeInApi(newRecipe)
            .then(res => {
                console.log(`${res.name} was created successfully`)
                navigate('/dashboard')
            })
            .catch(err => { setSubmitError(err.message) });
    }

    return (
        <div>
            {submitError && <p>{submitError}</p>}
            <RecipeForm
                recipe={{}}
                onSubmit={onSubmit}
            />
        </div>
    );
}


export {CreateRecipePage as default};