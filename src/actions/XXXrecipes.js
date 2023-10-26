/**
 * NOT IN USE
 */

const createRecipe = ({name = '', containsGluten = undefined, processes = []} = {}) => ({
    type: 'CREATE_RECIPE',
    newRecipe: {
        name,
        containsGluten,
        processes
    }
});

const removeRecipe = ({recipePid} = {}) => ({
    type: 'REMOVE_RECIPE',
    recipePid
});

const updateRecipe = (recipePid, updatedRecipe) => ({
    type: 'UPDATE_RECIPE',
    recipePid,
    updatedRecipe
});

const setRecipes = () => ({
    type: 'SET_RECIPES',
});

export {createRecipe, removeRecipe, updateRecipe, setRecipes};