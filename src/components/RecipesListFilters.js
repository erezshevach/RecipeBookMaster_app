import React from "react";
import {
    setText,
    //setMaxCal,
    setGlutenFree,
    setDairyFree,
    setNutsFree,
    setPeanutsFree,
    setVegan
} from "../actions/filters";

const RecipesListFilters = (props) => {

    const {filters, filtersDispatch} = props;

    return (
        <div className='fieldset'>
            <input
                type='text'
                className='text-input'
                placeholder='Name contains'
                value={filters.text}
                onChange={(e) => filtersDispatch(setText(e.target.value))}
            />
            <div className='checkbox'>
                <label htmlFor='gluten'>
                    Gluten free
                </label>
                <input
                    type='checkbox'
                    id='gluten'
                    checked={filters.glutenFree}
                    onChange={(e) => filtersDispatch(setGlutenFree(e.target.checked === true))}
                />
            </div>
            <div className='checkbox'>
                <label htmlFor='dairy'>
                    Dairy free
                </label>
                <input
                    type='checkbox'
                    id='dairy'
                    checked={filters.dairyFree}
                    onChange={(e) => filtersDispatch(setDairyFree(e.target.checked === true))}
                />
            </div>
            <div className='checkbox'>
                <label htmlFor='nuts'>
                    Nuts free
                </label>
                <input
                    type='checkbox'
                    id='nuts'
                    checked={filters.nutsFree}
                    onChange={(e) => filtersDispatch(setNutsFree(e.target.checked === true))}
                />
            </div>
            <div className='checkbox'>
                <label htmlFor='peanuts'>
                    Peanuts free
                </label>
                <input
                    type='checkbox'
                    id='peanuts'
                    checked={filters.peanutsFree}
                    onChange={(e) => filtersDispatch(setPeanutsFree(e.target.checked === true))}
                />
            </div>
            <div className='checkbox'>
                <label htmlFor='vegan'>
                    Vegan
                </label>
                <input
                    type='checkbox'
                    id='vegan'
                    checked={filters.vegan}
                    onChange={(e) => filtersDispatch(setVegan(e.target.checked === true))}
                />
            </div>
            {/*    <input*/}
            {/*        type='number'*/}
            {/*        className='text-input'*/}
            {/*        placeholder='Max kCal'*/}
            {/*        value={filters.maxCal}*/}
            {/*        onChange={(e) => filtersDispatch(setMaxCal(e.target.value))}*/}
            {/*    />*/}
        </div>
    )
}

export {RecipesListFilters as default};