

const url = 'http://localhost:8080/recipe-book-master/api/recipes'


const getRecipeFromApi = async (recipePid) => {
    console.log(`fetching recipe ${recipePid} from API`);
    const res = await fetch(`${url}/${recipePid}`);
    const parsedRes = await res.json();
    if (res.ok) { console.log(`fetched recipe: ${parsedRes.name}`) }
    else { throw TypeError(`${parsedRes.identifier}: ${parsedRes.errorMessage}`) }
    return parsedRes;
}

const getAllRecipesFromApi = async (page = 1, limit = 30) => {
        const res = await fetch(`${url}?page=${page}&limit=${limit}`);
        return await res.json();
}

const createRecipeInApi = async (newRecipe) => {
    const res = await fetch(`${url}`, {
        method: 'POST',
        body: JSON.stringify(newRecipe),
        headers: {'Content-type': 'application/json; charset=UTF-8'}
    });
    const parsedRes = await res.json();
    if (res.ok) { console.log(`created recipe for: ${parsedRes.name}`) }
    else { throw TypeError(`${parsedRes.identifier}: ${parsedRes.errorMessage}`) }
    return parsedRes;
}

const updateRecipeInApi = async (recipeUpdates) => {
    const res = await fetch(`${url}/${recipeUpdates.recipePid}`, {
        method: 'PUT',
        body: JSON.stringify(recipeUpdates),
        headers: {'Content-type': 'application/json; charset=UTF-8'}
    });
    const parsedRes = await res.json();
    if (res.ok) { console.log(`updated recipe for: ${parsedRes.name}`) }
    else { throw TypeError(`${parsedRes.identifier}: ${parsedRes.errorMessage}`) }
    return parsedRes;
}

const deleteRecipeInApi = async (recipePid) => {
    const res = await fetch(`${url}/${recipePid}`, {
        method: 'DELETE',
        body: null,
        headers: {'Content-type': 'application/json; charset=UTF-8'}
    });
    const parsedRes = await res.json();
    if (res.ok) { console.log(`deleted recipe ${parsedRes.name}`) }
    else { throw TypeError(`${parsedRes.identifier}: ${parsedRes.errorMessage}`) }
    return parsedRes;
}

//////////////////////////////////////////////////////////////

// /**
//  * converting recipe object to a RecipeRequestModel required by the API
//  * @param recipe
//  * @returns {{processes: *[], name}}
//  */
// const convertRecipeToRequestModel = (recipe) => {
//     const {name, recipeProcesses} = recipe;
//     const processes = []
//     recipeProcesses.forEach(recipeProcess => {
//         const {sequence, description, recipeComponents} = recipeProcess;
//         let process = {
//             sequence,
//             description
//         }
//         if (recipeComponents && recipeComponents.length > 0) {
//             const components = [];
//             recipeComponents.forEach(recipeComponent => {
//                 const component = {
//                     ...recipeComponent,
//                     uom: recipeComponent.uom.toUpperCase()
//                 }
//                 components.push(component)
//             })
//             process = {
//                 ...process,
//                 components
//             }
//         }
//         processes.push(process)
//     })
//     return {name, processes};
// }


export {getRecipeFromApi, getAllRecipesFromApi, createRecipeInApi, updateRecipeInApi, deleteRecipeInApi}//, convertRecipeToRequestModel};