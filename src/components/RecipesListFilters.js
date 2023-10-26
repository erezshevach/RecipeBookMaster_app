import React from "react";
import {
    setText,
    setMaxCal,
    setGlutenFree,
    setDairyFree,
    setNutsFree,
    setPeanutsFree,
    setVegan
} from "../actions/filters";

const RecipesListFilters = (props) => {

    const {filters, filtersDispatch} = props;

    return (
        <div>
            <input
                type='text'
                placeholder='Name contains'
                value={filters.text}
                onChange={(e) => filtersDispatch(setText(e.target.value))}
            />
            <input
                type='checkbox'
                id='gluten'
                checked={filters.glutenFree}
                onChange={(e) => filtersDispatch(setGlutenFree(e.target.checked === true))}
            />
            <label htmlFor='gluten'>
                Gluten free
            </label>
            <input
                type='checkbox'
                id='dairy'
                checked={filters.dairyFree}
                onChange={(e) => filtersDispatch(setDairyFree(e.target.checked === true))}
            />
            <label htmlFor='dairy'>
                Dairy free
            </label>
            <input
                type='checkbox'
                id='nuts'
                checked={filters.nutsFree}
                onChange={(e) => filtersDispatch(setNutsFree(e.target.checked === true))}
            />
            <label htmlFor='nuts'>
                Nuts free
            </label>
            <input
                type='checkbox'
                id='peanuts'
                checked={filters.peanutsFree}
                onChange={(e) => filtersDispatch(setPeanutsFree(e.target.checked === true))}
            />
            <label htmlFor='peanuts'>
                Peanuts free
            </label>
            <input
                type='checkbox'
                id='vegan'
                checked={filters.vegan}
                onChange={(e) => filtersDispatch(setVegan(e.target.checked === true))}
            />
            <label htmlFor='vegan'>
                Vegan
            </label>
            {/*<input*/}
            {/*    type='number'*/}
            {/*    placeholder='Max kCal'*/}
            {/*    value={filters.maxCal}*/}
            {/*    onChange={(e) => filterDispatch(setMaxCal(e.target.value))}*/}
            {/*/>*/}
        </div>
    )
}

export {RecipesListFilters as default};