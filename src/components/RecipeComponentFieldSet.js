import React, {useState, useContext, useEffect} from 'react';
import {RecipeProcessFormContext} from "../context/context";
import {createRecipeComponent, updateRecipeComponent} from "../actions/recipeComponents";


const RecipeComponentFieldSet = () => {
    const {componentsDispatch, currentEditedComponent, setCurrentEditedComponent} = useContext(RecipeProcessFormContext)

    const [componentPid, setComponentPid] = useState('')
    const [quantity, setQuantity] = useState('')
    const [uom, setUom] = useState('G')
    const [ingredient, setIngredient] = useState('')
    const [state, setState] = useState('')
    const [validationErr, setValidationErr] = useState('')

    const isUpdate = !!currentEditedComponent.id

    useEffect(() => {
        if (isUpdate) {
            setComponentPid(currentEditedComponent.componentPid)
            setQuantity(currentEditedComponent.quantity)
            setUom(currentEditedComponent.uom)
            setIngredient(currentEditedComponent.ingredient)
            setState(currentEditedComponent.state ? currentEditedComponent.state : '')
        }
    }, [currentEditedComponent, isUpdate]);

    const validateForm = () => {
        return (!quantity || !uom || !ingredient) ? 'Please make sure the component includes quantity, unit and ingredient.' : '';
    };
    const clearForm = () => {
        setComponentPid('');
        setQuantity('');
        setUom('G');
        setIngredient('');
        setState('');
        setValidationErr('');
    };
    const onAddComponent = (e) => {
        e.preventDefault();
        const err = validateForm();
        setValidationErr(err);
        if (err === '') {
            componentsDispatch(createRecipeComponent({quantity, uom, ingredient, state}));
            clearForm();
        }
    };
    const onUpdateComponent = (e) => {
        e.preventDefault();
        const err = validateForm();
        setValidationErr(err);
        if (err === '') {
            componentsDispatch(updateRecipeComponent(componentPid, {componentPid, quantity, uom, ingredient, state}));
            setCurrentEditedComponent({});
            clearForm();
        }
    }

    const onQuantityChange = (e) => {
        const quantity = e.target.value;
        if (!quantity || quantity.match(/^\d+(\.\d{0,2})?$/)) {
            setQuantity(quantity);
        }
    };

//            console.log(processComponents);
    return (
        < div>
            {validationErr && <p>{validationErr}</p>}
            <fieldset id='component'>
                <input
                    id='quantity'
                    type='text'
                    placeholder='Quantity'
                    value={quantity}
                    onChange={onQuantityChange}
                />
                <select name="uom"
                        id="uom"
                        value={uom}
                        onChange={(e) => (setUom(e.target.value))}
                >
                    <option value="G">g</option>
                    <option value="UNIT">unit</option>
                    <option value="KG">kg</option>
                </select>
                <input
                    id='ingredient'
                    type='text'
                    placeholder='Ingredient'
                    value={ingredient}
                    onChange={(e) => (setIngredient(e.target.value))}
                />
                <input
                    id='state'
                    type='text'
                    placeholder='Ingredient state'
                    value={state}
                    onChange={(e) => (setState(e.target.value))}
                />
                {isUpdate ?
                    (<button type='button' onClick={onUpdateComponent}>Update recipe component</button>) :
                    (<button type='button' onClick={onAddComponent}>Add recipe component</button>)
                }
                <button type='button' onClick={clearForm}>Clear</button>
            </fieldset>
        < /div>
    );
}


export default RecipeComponentFieldSet;
