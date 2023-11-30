import {sortRecipeProcesses} from "../selectors/recipeProcesses";

const recipeProcessesReducerDefaultState = [];

const recipeProcessesReducer = (state = recipeProcessesReducerDefaultState, action) => {
    switch (action.type) {
        case 'CREATE_PROCESS': {
            const processes = [...state, {...action.newProcess}];
            return sortRecipeProcesses(processes);
        }
        case 'REMOVE_PROCESS':
            return state.filter(({processPid}) => processPid !== action.processPid);

        case 'UPDATE_PROCESS':
            return state.map(process => {
                if (process.processPid === action.processPid) {
                    //use API to update process, and add the return val to the state
                    return {
                        ...process,
                        ...action.updatedProcess
                    };
                } else {
                    return process;
                }
            });
        default:
            return state;
    }
};

export {recipeProcessesReducer as default};
