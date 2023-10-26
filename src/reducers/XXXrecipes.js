import {createRecipeInApi, deleteRecipeInApi} from "../apiConnectors/recipeApiConnector";

/**
 * NOT IN USE
 */


const recipesReducerDefaultState = [];


const recipesReducer = (state = recipesReducerDefaultState, action) => {

    switch (action.type) {
        case 'CREATE_RECIPE': {
            createRecipeInApi(action.newRecipe)
                .then(createdRecipe => state.unshift(createdRecipe))
            return state;
        }
        case 'REMOVE_RECIPE': {
            deleteRecipeInApi(action.recipePid);
            return state.filter(({recipePid}) => recipePid !== action.recipePid)
        }
        case 'UPDATE_RECIPE': {
            return state.map(recipe => {
                if (recipe.recipePid === action.recipePid) {
                    //use API to update recipe, and add only the header to the state (or re-retrieve the recipes-headers list)
                    return {
                        ...recipe,
                        ...action.updatedRecipe
                    };
                } else {
                    return recipe;
                }
            });
        }
        case 'SET_RECIPES': {
            return action.recipes;
        }
        default: {
            return state;
        }
    }
};


export {recipesReducer as default, recipesReducerDefaultState};