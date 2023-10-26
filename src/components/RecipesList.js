import React from "react";
import RecipesListItem from "./RecipesListItem";
import {getVisibleRecipes} from "../selectors/recipes";

const RecipesList = (props) => {
    let {recipes, filters} = props;

    console.log('loading list. recipes: ', recipes);
    return (
        <div>
            {
                recipes.length === 0 ? (
                    <p>No recipes yet</p>
                ) : (
                    getVisibleRecipes(recipes, filters).map((recipe) => (<RecipesListItem key={recipe.recipePid} recipe={{...recipe}}/>))
                )
            }
        </div>
    );
}


export {RecipesList as default};