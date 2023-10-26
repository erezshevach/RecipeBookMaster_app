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


export {createRecipeProcess, removeRecipeProcess, updateRecipeProcess};