import React, {useContext} from "react";
import {RecipeProcessFormContext} from "../context/context";
import {removeRecipeComponent} from "../actions/recipeComponents";


const RecipeComponentListItem = (props) => {
    const {componentsDispatch, setCurrentEditedComponent} = useContext(RecipeProcessFormContext)

    const {componentPid, quantity, uom, ingredient, state} = props.component;

    const onRemove = () => {
        componentsDispatch(removeRecipeComponent({componentPid}));
    }
    const onEdit = () => {
        setCurrentEditedComponent(props.component);
    }

    const stateText = state ? `(${state})` : "";
    return (
        <>
            <p>{quantity} {uom} {ingredient} {stateText}</p>
            {props.isForm && <button type='button' onClick={onRemove}>Remove component</button>}
            {props.isForm && <button type='button' onClick={onEdit}>Edit component</button>}
        </>
    );
};

export {RecipeComponentListItem as default};