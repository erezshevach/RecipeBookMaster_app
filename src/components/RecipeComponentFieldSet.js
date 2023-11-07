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
        <fieldset className='form'>
            <div className='form__header'>
                <h2 className='form__title'>
                    Add a component to the process:
                </h2>
            </div>
            {validationErr && <p className='form__error'>{validationErr}</p>}
            <div id='component' className='fieldset'>
                <input
                    id='quantity'
                    type='text'
                    className='text-input'
                    placeholder='Quantity'
                    value={quantity}
                    onChange={onQuantityChange}
                />
                <select name="uom"
                        id="uom"
                        className='select'
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
                    className='text-input'
                    placeholder='Ingredient'
                    value={ingredient}
                    onChange={(e) => (setIngredient(e.target.value))}
                />
                <input
                    id='state'
                    type='text'
                    className='text-input'
                    placeholder='Ingredient state'
                    value={state}
                    onChange={(e) => (setState(e.target.value))}
                />

            </div>
            <div className='buttons-group'>
                {isUpdate ?
                    (<button type='button' className='button' onClick={onUpdateComponent}>Update component</button>) :
                    (<button type='button' className='button' onClick={onAddComponent}>Add component</button>)
                }
                <button type='button' className='button button--secondary' onClick={clearForm}>Clear</button>
            </div>
        < /fieldset>
    );
}


export default RecipeComponentFieldSet;
