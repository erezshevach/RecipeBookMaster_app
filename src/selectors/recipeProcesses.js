
const sortRecipeProcesses = (recipeProcesses) => {
    return recipeProcesses.sort((a, b) => a.sequence < b.sequence ? -1 : 1);
};

export {sortRecipeProcesses};