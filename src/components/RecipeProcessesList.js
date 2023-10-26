import React, {useContext} from "react";

import {RecipeFormContext} from '../context/context'
import RecipeProcessListItem from './RecipeProcessListItem';

const RecipeProcessesList = () => {
    const {processes} = useContext(RecipeFormContext);
    return (
        <div>
            <ul>
                {
                    processes.length === 0 ? (
                        <p>No processes yet</p>
                        ) : (
                        processes.map(process => (
                            <li key={process.processPid}>
                                <RecipeProcessListItem process={process}/>
                            </li>)
                        )
                    )

                }
            </ul>
        </div>
    );
}


export default RecipeProcessesList;
