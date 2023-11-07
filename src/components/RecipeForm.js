import React, {useReducer, useState} from 'react';
import {RecipeFormContext} from "../context/context";
import recipeProcessesReducer from '../reducers/recipeProcesses';
import RecipeProcessesList from "./RecipeProcessesList";
import RecipeProcessFieldSet from "./RecipeProcessFieldSet";
import RecipeBookModal from "./RecipeBookModal";


const RecipeForm = (props) => {
    console.log('loading form');
    const recipePid = props.recipe.recipePid ? props.recipe.recipePid : ''
    const isUpdate = !!recipePid
    const readOnly = props.readOnly
    const [name, setName] = useState(isUpdate ? props.recipe.name : '')
    const [containsGluten, setContainsGluten] = useState(isUpdate ? props.recipe.containsGluten : false)
    const [containsDairy, setContainsDairy] = useState(isUpdate ? props.recipe.containsDairy : false)
    const [containsNuts, setContainsNuts] = useState(isUpdate ? props.recipe.containsNuts : false)
    const [containsPeanuts, setContainsPeanuts] = useState(isUpdate ? props.recipe.containsPeanuts : false)
    const [vegan, setVegan] = useState(isUpdate ? props.recipe.vegan : false)
    const [processes, processesDispatch] = useReducer(recipeProcessesReducer, isUpdate ? props.recipe.processes : [])
    const [validationErrorMsg, setValidationErrorMsg] = useState('')
    const [currentEditedProcess, setCurrentEditedProcess] = useState({})
    console.log(readOnly);

    const validateForm = () => {
        let err = ''
        if (!name) {
            err += 'Please provide recipe\'s name. ';
        }
        if (processes.length === 0) {
            err += 'A recipe must include at least one process. ';
        }
        return err;
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const err = validateForm();
        setValidationErrorMsg(err);
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

    const onCloseErrorModal = () => {
        setValidationErrorMsg('');
    };

    document.addEventListener("keydown", preventFormSubmit);
    return (
        <RecipeFormContext.Provider
            value={{
                readOnly,
                processes,
                processesDispatch,
                currentEditedProcess,
                setCurrentEditedProcess
            }}>
            <form id='recipe' className='form' onSubmit={onSubmit}>
                <div className='fieldset'>
                    <label htmlFor='name'>
                        Name:
                    </label>
                    <input
                        type='text'
                        className='text-input'
                        id='name'
                        placeholder='Name'
                        autoFocus
                        value={name}
                        onChange={(e) => (setName(e.target.value))}
                        disabled={readOnly}
                    />
                </div>

                <div className='fieldset'>
                    <div className='checkbox'>
                        <label htmlFor='gluten'>
                            Contains gluten
                        </label>
                        <input
                            type='checkbox'
                            id='gluten'
                            checked={containsGluten}
                            onChange={(e) => (setContainsGluten(e.target.checked === true))}
                        />
                    </div>
                    <div className='checkbox'>
                        <label htmlFor='dairy'>
                            Contains dairy
                        </label>
                        <input
                            type='checkbox'
                            id='dairy'
                            checked={containsDairy}
                            onChange={(e) => (setContainsDairy(e.target.checked === true))}
                        />
                    </div>
                    <div className='checkbox'>
                        <label htmlFor='nuts'>
                            Contains nuts
                        </label>
                        <input
                            type='checkbox'
                            id='nuts'
                            checked={containsNuts}
                            onChange={(e) => (setContainsNuts(e.target.checked === true))}
                        />
                    </div>
                    <div className='checkbox'>
                        <label htmlFor='peanuts'>
                            Contains peanuts
                        </label>
                        <input
                            type='checkbox'
                            id='peanuts'
                            checked={containsPeanuts}
                            onChange={(e) => (setContainsPeanuts(e.target.checked === true))}
                        />
                    </div>
                    <div className='checkbox'>
                        <label htmlFor='vegan'>
                            Vegan
                        </label>
                        <input
                            type='checkbox'
                            id='vegan'
                            checked={vegan}
                            onChange={(e) => (setVegan(e.target.checked === true))}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor='processes'>
                        Processes:
                    </label>
                    <RecipeProcessesList id='processes'/>
                </div>

                {!readOnly &&
                    <div className='buttons-group'>
                        <button className='button'>
                            {isUpdate ? 'Update recipe' : 'Add recipe'}
                        </button>
                    </div>}
                {!readOnly &&
                    <div>
                        <RecipeProcessFieldSet/>
                    </div>}
            </form>

            <RecipeBookModal
                id='errorMsgModal'
                title='Error'
                message={validationErrorMsg}
                onCloseModal={onCloseErrorModal}
            />
        </RecipeFormContext.Provider>);

}


export {RecipeForm as default};