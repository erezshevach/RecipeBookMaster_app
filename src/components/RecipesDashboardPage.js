import React, {useEffect, useReducer, useState} from 'react';
import {Link} from "react-router-dom";
import RecipesListFilters from "./RecipesListFilters";
import RecipesList from "./RecipesList";
import filtersReducer, {filtersReducerDefaultState} from "../reducers/filters";
import {getAllRecipesFromApi} from "../apiConnectors/recipeApiConnector";



const RecipesDashboardPage = () => {

    const [filters, filtersDispatch] = useReducer(filtersReducer, filtersReducerDefaultState)
    //const [recipes, recipeDispatch] = useReducer(recipesReducer, recipesReducerDefaultState)
    const [recipes, setRecipes] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [loadingError, setLoadingError] = useState(undefined);


    useEffect(() => {
        console.log('dashboard useEffect triggered. fetching recipes.');
        getAllRecipesFromApi()
            .then(result => setRecipes(result))
            .catch(err => setLoadingError(err))
            .finally(() => setIsLoading(false))

        // // reloadData();
        // //const storedRecipes = JSON.parse(localStorage.getItem('recipes'))
        // //console.log(storedRecipes);
        // //if (!storedRecipes || storedRecipes.length === 0) {
        //     console.log('getting recipes');
        //     getAllRecipesFromApi()
        //         .then(result => {
        //             recipeDispatch(setRecipes(result));
        //             //localStorage.setItem('recipes', JSON.stringify(result))
        //         })
        //         .catch(err => console.log(err))
        // //} else {
        // //    recipeDispatch(setRecipes(storedRecipes));
        // //}
        // if (loadingError) {
        //     console.log('Error: ', loadingError);
        // } else if (!isLoading){
        //     console.log('router useEffect setting data to recipes: ', data);
        //     recipeDispatch(setRecipes(data));
        // }
    }, []);

    console.log('loading dashboard');
    return (
        <div>
            {isLoading &&
                <div>Loading...</div>
            }
            {loadingError &&
                <div>{loadingError}</div>
            }
            {!isLoading &&
                <div>
                    <div className='page-header'>
                        <div className='content-container'>
                                <h1 className='page-header__title'> Recipes Dashboard</h1>
                            <div className='page-header__actions'>
                                <Link className='button' to="/create">Create Recipe</Link>
                            </div>
                        </div>
                    </div>
                    <div className='content-container'>
                        <RecipesListFilters filters={filters} filtersDispatch={filtersDispatch}/>
                        <RecipesList recipes={recipes} filters={filters}/>
                    </div>
                </div>
            }
        </div>
    );
}

export {RecipesDashboardPage as default};