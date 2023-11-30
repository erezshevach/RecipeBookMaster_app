import {v4 as uuid} from "uuid";
import {sortRecipeProcesses} from "../selectors/recipeProcesses";

const recipeProcessesReducerDefaultState = [];

const recipeProcessesReducer = (state = recipeProcessesReducerDefaultState, action) => {

    const processesMap = new Map();
    const componentsMap = new Map();
    state.forEach(process => {
        processesMap.set(process.processPid, process);
        if (process.components) {
            process.components.forEach(component => {
                componentsMap.set(component.componentPid, component);
            })
        }
    })

    const addProcessToMap = (newProcess) => {
        processesMap.set(action.newProcess.processPid, action.newProcess);
        if (newProcess.components) {
            newProcess.components.forEach(component => {
                componentsMap.set(component.componentPid, component);
            })
        }

    }

    switch (action.type) {
        case 'CREATE_PROCESS': {
            //takes: newProcess
            addProcessToMap(action.newProcess);
            const processes = [...state, {...action.newProcess}];
            return sortRecipeProcesses(processes);
        }
        case 'REMOVE_PROCESS': {
            //takes: processPid
            return state.filter(({processPid}) => processPid !== action.processPid);
        }
        case 'UPDATE_PROCESS': {
            //takes: processPid, field, updatedValue
            return state.map(process => {
                if (process.processPid === action.processPid) {
                    return {
                        ...process,
                        ...action.updatedProcess
                    }
                } else {
                    return process;
                }
            })
        }
        case 'CREATE_COMPONENT': {
            //takes: processPid, newComponent
            componentsMap.set(action.newComponent.componentPid, action.newComponent);
            const editedProcess = processesMap.get(action.processPid);
            editedProcess.components = [...editedProcess.components, action.newComponent];
            processesMap.set(action.processPid, editedProcess);
            return state;
        }
        case 'REMOVE_COMPONENT': {
            //takes: processPid?, componentPid
            return state;
        }
        case 'UPDATE_COMPONENT': {
            //takes: processPid?, componentPid, field, updatedValue
            const updatedComponent = componentsMap.get(action.componentPid);
            updatedComponent[action.field] = (action.field == 'quantity') ? Number(action.updatedValue) : action.updatedValue;
            componentsMap.set(action.componentPid, updatedComponent);
            return state;
        }
        default:
            return state;
    }
};

export {recipeProcessesReducer as default};
