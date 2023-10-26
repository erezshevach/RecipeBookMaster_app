import {v1 as uuid} from "uuid";


const createRecipeComponent = ({quantity, uom, ingredient, state} = {}) => ({
    type: 'CREATE_COMPONENT',
    newRecipeComponent: {
        componentPid: uuid(),
        quantity,
        uom,
        ingredient,
        state
    }
});

const removeRecipeComponent = ({componentPid} = {}) => ({
    type: 'REMOVE_COMPONENT',
    componentPid
});

const updateRecipeComponent = (componentPid, updatedComponent) => ({
    type: 'UPDATE_COMPONENT',
    componentPid,
    updatedComponent
});

const resetRecipeComponentsState = () => ({
    type: 'RESET_COMPONENTS'
});

const loadRecipeComponentsState = (components) => ({
    type: 'LOAD_COMPONENTS',
    components
});

export {createRecipeComponent, removeRecipeComponent, resetRecipeComponentsState, updateRecipeComponent, loadRecipeComponentsState};