import React, {useReducer, useState} from 'react';
import {RecipeFormContext} from "../context/context";
import recipeProcessesReducer from '../reducers/recipeProcesses';
import RecipeProcessesList from "./RecipeProcessesList";
import RecipeProcessFieldSet from "./RecipeProcessFieldSet";


const RecipeForm = (props) => {
    console.log('loading form');
    const recipePid = props.recipe.recipePid ? props.recipe.recipePid : ''
    const isUpdate = !!recipePid
    const [name, setName] = useState(isUpdate ? props.recipe.name : '')
    const [containsGluten, setContainsGluten] = useState(isUpdate ? props.recipe.containsGluten : false)
    const [processes, processesDispatch] = useReducer(recipeProcessesReducer, isUpdate ? props.recipe.processes : [])
    const [validationErr, setValidationErr] = useState('')
    const [currentEditedProcess, setCurrentEditedProcess] = useState({})


    const validateForm = () => {
        let err = ''
        if (!name) { err += 'Please provide recipe\'s name. '; }
        if (processes.length === 0) { err += 'A recipe must include at least one process. '; }
        return err;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const err = validateForm();
        setValidationErr(err);
        if (!err) {
            props.onSubmit({
                recipePid,
                name,
                containsGluten,
                processes
            });
        }
    }

    const preventFormSubmit = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    }

    document.addEventListener("keydown", preventFormSubmit);
    return (
        < div>
            <RecipeFormContext.Provider
                value={{processes: processes, processesDispatch: processesDispatch, currentEditedProcess, setCurrentEditedProcess}}>
                {validationErr && <p>{validationErr}</p>}
                <form id='recipe' onSubmit={onSubmit}>
                    <div>
                        <label htmlFor='name'>
                            Name:
                        </label>
                        <input
                            type='text'
                            id='name'
                            placeholder='Name'
                            autoFocus
                            value={name}
                            onChange={(e) => (setName(e.target.value))}
                        />
                    </div>
                    <div>
                        <input
                            type='checkbox'
                            id='gluten'
                            checked={containsGluten}
                            onChange={(e) => (setContainsGluten(e.target.checked === true))}
                        />
                        <label htmlFor='gluten'>
                            Contains gluten
                        </label>
                    </div>
                    <div>
                        <label htmlFor='processes'>
                            Processes:
                        </label>
                        <RecipeProcessesList id='processes'/>
                    </div>
                    <div>
                        <RecipeProcessFieldSet/>
                    </div>
                    <button>
                        {isUpdate ? 'Update recipe' : 'Add recipe'}
                    </button>
                </form>
            </RecipeFormContext.Provider>
        < /div>);

}


export {RecipeForm as default};