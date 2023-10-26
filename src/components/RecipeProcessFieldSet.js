import React, {useState, useContext, useEffect, useReducer} from 'react';
import {RecipeFormContext, RecipeProcessFormContext} from "../context/context";
import {createRecipeProcess, updateRecipeProcess} from "../actions/recipeProcesses";
import {resetRecipeComponentsState, loadRecipeComponentsState} from "../actions/recipeComponents";
import recipeComponentReducer, {recipeComponentsReducerDefaultState} from "../reducers/recipeComponents";
import RecipeComponentsList from "./RecipeComponentsList";
import RecipeComponentFieldSet from "./RecipeComponentFieldSet";


const RecipeProcessFieldSet = () => {
    const {processesDispatch, currentEditedProcess, setCurrentEditedProcess} = useContext(RecipeFormContext)

    const [components, componentsDispatch] = useReducer(recipeComponentReducer, recipeComponentsReducerDefaultState)
    const [processPid, setProcessPid] = useState('')
    const [sequence, setSequence] = useState('')
    const [description, setDescription] = useState('')
    const [validationErr, setValidationErr] = useState('')
    const [currentEditedComponent, setCurrentEditedComponent] = useState({})

    const isUpdate = !!currentEditedProcess.processPid

    useEffect(() => {
        if (isUpdate) {
            setProcessPid(currentEditedProcess.processPid)
            setSequence(currentEditedProcess.sequence)
            setDescription(currentEditedProcess.description)
            if (currentEditedProcess.components && currentEditedProcess.components.length > 0) {
                componentsDispatch(loadRecipeComponentsState(currentEditedProcess.components))
            }
        }
    }, [currentEditedProcess, isUpdate])


    const clearForm = () => {
        setProcessPid('');
        setSequence('');
        setDescription('');
        setValidationErr('');
        componentsDispatch(resetRecipeComponentsState());
    }
    const validateForm = () => {
        return (!sequence || !description) ? 'Please make sure the recipe-process includes sequence and description.' : '';
    }
    const onAddProcess = async (e) => {
        e.preventDefault();
        const err = validateForm();
        setValidationErr(err);
        if (err === '') {
            processesDispatch(createRecipeProcess({sequence, description, components}));
            clearForm();
        }
    }
    const onUpdateProcess = (e) => {
        e.preventDefault();
        const err = validateForm();
        setValidationErr(err);
        if (err === '') {
            processesDispatch(updateRecipeProcess(processPid, {processPid, sequence, description, components}));
            setCurrentEditedProcess({});
            clearForm();
        }
    }
    const onSequenceChange = (e) => {
        const sequence = e.target.value;
        if (!sequence || sequence.match(/^\d+(\.\d{0,2})?$/)) {
            setSequence(sequence);
        }
    };

    return (
        <RecipeProcessFormContext.Provider value={{components, componentsDispatch, currentEditedComponent, setCurrentEditedComponent}}>
            {validationErr && <p>{validationErr}</p>}
            <fieldset id='process'>
                <input
                    id='sequence'
                    type='text'
                    placeholder='Sequence'
                    value={sequence}
                    onChange={onSequenceChange}
                />
                <textarea
                    id='description'
                    rows='2'
                    cols='50'
                    placeholder='Description'
                    value={description}
                    onChange={(e) => (setDescription(e.target.value))}
                />
                <div>
                    <RecipeComponentFieldSet/>
                    <label htmlFor='components'>
                        Process' components:
                    </label>
                    <RecipeComponentsList
                        id='components'
                        isForm={true}
                        components={components}
                    />
                </div>
                {isUpdate ?
                    (<button type='button' onClick={onUpdateProcess}>Update recipe process</button>) :
                    (<button type='button' onClick={onAddProcess}>Add recipe process</button>)
                }
                <button type='button' onClick={clearForm}>Clear</button>
            </fieldset>
        < /RecipeProcessFormContext.Provider>
    );
}


export default RecipeProcessFieldSet;
