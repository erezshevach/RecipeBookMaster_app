
const getVisibleRecipes = (recipes, filters) => {
    const {text='', onlyGlutenFree, onlyDairyFree, onlyNutsFree, onlyPeanutsFree, onlyVegan, maxCal} = filters;
    const visibleRecipes = recipes.filter(recipe => {
        const textMatch = text === '' || recipe.name.toLowerCase().includes(text.toLowerCase());
        const glutenMatch = onlyGlutenFree === true ? recipe.containsGluten === false : true;
        const dairyMatch = onlyDairyFree === true ? recipe.containsDairy === false : true;
        const nutsMatch = onlyNutsFree === true ? recipe.containsNuts === false : true;
        const peanutsMatch = onlyPeanutsFree === true ? recipe.containsPeanuts === false : true;
        const veganMatch = onlyVegan === true ? recipe.vegan === true : true;
        const maxCalMatch = true; //TODO
        return textMatch && glutenMatch && dairyMatch && nutsMatch && peanutsMatch && veganMatch && maxCalMatch;
    });
    return visibleRecipes.sort((a, b) => a.name < b.name ? -1 : 1);
};

export { getVisibleRecipes };