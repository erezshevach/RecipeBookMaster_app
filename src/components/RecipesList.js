import React from "react";
import RecipesListItem from "./RecipesListItem";
import {getVisibleRecipes} from "../selectors/recipes";

const RecipesList = (props) => {
    let {recipes, filters} = props;

    console.log('loading list. recipes: ', recipes);
    return (
        <div>
            <div className='list-header'>
                <div className='show-for-mobile'>Recipes</div>
                <div className='show-for-desktop'>Recipe name</div>
                <div className='show-for-desktop'>Gluten free</div>
                <div className='show-for-desktop'>Dairy free</div>
                <div className='show-for-desktop'>Nuts free</div>
                <div className='show-for-desktop'>Peanuts free</div>
                <div className='show-for-desktop'>Vegan</div>

            </div>
            {
                recipes.length === 0 ? (
                    <p>No recipes yet</p>
                ) : (

                    getVisibleRecipes(recipes, filters).map((recipe) => (
                        <RecipesListItem key={recipe.recipePid} recipe={{...recipe}}/>))
                )
            }
        </div>
    );
}


export {RecipesList as default};