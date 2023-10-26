import React from "react";
import RecipeComponentListItem from './RecipeComponentListItem';


const RecipeComponentsList = (props) => {
    const {components, isForm} = props

    return (
        <div>
            <ul>
                {
                    components.length === 0 ? (
                        isForm && <p>No components yet</p>
                    ) : (
                        components.map(component => (
                            <li key={component.componentPid}>
                                <RecipeComponentListItem isForm={isForm} component={component}/>
                            </li>)
                        )
                    )

                }
            </ul>
        </div>
    );
}


export default RecipeComponentsList;