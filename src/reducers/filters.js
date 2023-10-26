
const filtersReducerDefaultState = {
    text: '',
    maxCal: 999999999,
    onlyGlutenFree: false,
    onlyDairyFree: false,
    onlyNutsFree: false,
    onlyPeanutsFree: false,
    onlyVegan: false
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT':
            return {...state, text: action.text};
        case 'SET_MAX_CAL':
            return {...state, maxCal: action.maxCal};
        case 'SET_GLUTEN_FREE':
            return {...state, onlyGlutenFree: action.glutenFree};
        case 'SET_DAIRY_FREE':
            return {...state, onlyDairyFree: action.dairyFree};
        case 'SET_NUTS_FREE':
            return {...state, onlyNutsFree: action.nutsFree};
        case 'SET_PEANUTS_FREE':
            return {...state, onlyPeanutsFree: action.peanutsFree};
        case 'SET_VEGAN':
            return {...state, onlyVegan: action.vegan};
        default:
            return state;
    }
};

export {filtersReducer as default, filtersReducerDefaultState};