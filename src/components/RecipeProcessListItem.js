import React, {useContext} from "react";
import {removeRecipeProcess} from "../actions/recipeProcesses";
import {RecipeFormContext} from "../context/context";
import RecipeComponentsList from "./RecipeComponentsList";

const RecipeProcessListItem = (props) => {
    const {processesDispatch, setCurrentEditedProcess} = useContext(RecipeFormContext)
    const {processPid, sequence, description, components} = props.process;

    const onRemove = () => {
        processesDispatch(removeRecipeProcess(processPid));
    };
    const onEdit = () => {
        setCurrentEditedProcess(props.process);
    };

    return (
        <>
            <p>{sequence}: {description} </p>
            <RecipeComponentsList
                id='components'
                isForm={false}
                components={components}
            />
            <button type='button' onClick={onRemove}>Remove process</button>
            <button type='button' onClick={onEdit}>Edit process</button>
        </>
    );
};

export {RecipeProcessListItem as default};