import React from "react";
import {Link} from "react-router-dom";


const XXXRecipesListItem = (props) => {
    const {recipePid, name, containsGluten, containsDairy, containsNuts} = props.recipe;

    return (
        <div>
            <Link className='list-item' to={`/view/${recipePid}`}>
                <h3 className='list-item__title'>
                    {name}
                </h3>
            <p>Gluten free: {(!containsGluten).toString()}, Dairy free: {!containsDairy}, Nuts free: {!containsNuts}</p>
            </Link>


        </div>
    );
};


export {XXXRecipesListItem as default};
