import React, {useContext} from "react";
import {removeRecipeProcess} from "../actions/recipeProcesses";
import {RecipeFormContext} from "../context/context";
import RecipeComponentsList from "./RecipeComponentsList";


const RecipeProcessListItem = (props) => {
    const {readOnly, processesDispatch, setCurrentEditedProcess} = useContext(RecipeFormContext)
    const {processPid, sequence, description, components} = props.process;

    const onRemove = () => {
        processesDispatch(removeRecipeProcess(processPid));
    };
    const onEdit = () => {
        setCurrentEditedProcess(props.process);
    };

    return (
        <div style={{
            width: '100%',
            display: 'flex',
            direction: 'row'
        }}>
            <p style={{width: '50%'}}>{sequence}: {description} </p>
            <RecipeComponentsList
                id='components'
                isForm={false}
                components={components}
                style={{width: '50%'}}
            />

            {!readOnly &&
                <button className='button button--secondary' type='button' onClick={onRemove}>Remove process</button>}
            {!readOnly &&
                <button type='button' onClick={onEdit}>Edit process</button>}
        </div>
    );
};

export {RecipeProcessListItem as default};