import React from "react";
import {Link} from "react-router-dom";


const RecipesListItem = (props) => {
    const {recipePid, name, containsGluten, containsDairy, containsNuts} = props.recipe;

    return (
        <div>
            <Link to={`/update/${recipePid}`}>
                <h3>
                    {name}
                </h3>
            </Link>
            <p>Gluten free: {(!containsGluten).toString()}, Dairy free: {!containsDairy}, Nuts free: {!containsNuts}</p>

        </div>
    );
};


export {RecipesListItem as default};
