import {v1 as uuid} from "uuid";

const createRecipeProcess = ({sequence, description, components} = {}) => ({
    type: 'CREATE_PROCESS',
    newProcess: {
        processPid: uuid(),
        sequence,
        description,
        components
    }
});

const removeRecipeProcess = (processPid = "") => ({
    type: 'REMOVE_PROCESS',
    processPid
});

const updateRecipeProcess = (processPid, updatedProcess) => ({
    type: 'UPDATE_PROCESS',
    processPid,
    updatedProcess
});

const createComponent = (processPid, newComponent) => ({
    type: 'CREATE_COMPONENT',
    processPid,
    newComponent
});

const updateComponent = (componentPid, field, updatedValue) => ({
    type: 'UPDATE_COMPONENT',
    componentPid,
    field,
    updatedValue
});



export {createRecipeProcess, removeRecipeProcess, updateRecipeProcess, createComponent, updateComponent};