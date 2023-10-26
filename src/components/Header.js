import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => (
    <header>
        <h1>Recipe Book Master App</h1>
        <NavLink to="/dashboard">Recipes Dashboard</NavLink>
        <NavLink to="/create">Create Recipe</NavLink>
        <NavLink to="/help">Help</NavLink>
    </header>
)

export {Header as default};