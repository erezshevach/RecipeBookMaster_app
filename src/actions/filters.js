
const setText = (text = '') => ({
        type: 'SET_TEXT',
        text
});

const setMaxCal = (maxCal = 9999999999999999999) => ({
    type: 'SET_MAX_CAL',
    maxCal
});

const setGlutenFree = (glutenFree = false) => ({
    type: 'SET_GLUTEN_FREE',
    glutenFree
});

const setDairyFree = (dairyFree = false) => ({
    type: 'SET_DAIRY_FREE',
    dairyFree
});

const setNutsFree = (nutsFree = false) => ({
    type: 'SET_NUTS_FREE',
    nutsFree
});

const setPeanutsFree = (peanutsFree = false) => ({
    type: 'SET_PEANUTS_FREE',
    peanutsFree
});

const setVegan = (vegan = false) => ({
    type: 'SET_VEGAN',
    vegan
});

export {setText, setMaxCal, setGlutenFree, setDairyFree, setNutsFree, setPeanutsFree, setVegan};