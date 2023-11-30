import {v1 as uuid} from "uuid";

const recipeComponentsReducerDefaultState = [];

const recipeComponentsReducer = (state = recipeComponentsReducerDefaultState, action) => {
    switch (action.type) {
        case 'CREATE_COMPONENT':
            return [...state, {...action.newRecipeComponent, id: uuid()}];
        case 'REMOVE_COMPONENT':
            return state.filter(({id}) => id !== action.id);
        case 'RESET_COMPONENTS':
            return recipeComponentsReducerDefaultState;
        case 'LOAD_COMPONENTS':
            return [...action.recipeComponents];
        case 'UPDATE_COMPONENT':
            return state.map(component => {
                if (component.id === action.id) {
                    //use api to update component, and add the return val to the state
                    return {
                        ...component,
                        ...action.updatedRecipeComponent
                    };
                } else {
                    return component;
                }
            });
        default:
            return state;
    }
};

export {recipeComponentsReducer as default, recipeComponentsReducerDefaultState};