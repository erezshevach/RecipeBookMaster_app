import React from 'react';
import {NavLink, Link} from 'react-router-dom';

const Header = () => (
    <header className='header'>
        <div className='content-container'>
            <div className='header__content'>
            <Link className='header__title' to="/dashboard">
                <h1>Recipe Book Master</h1>
            </Link>

            <NavLink className='header__navLink' to="/help">Help</NavLink>
        </div>
        </div>
    </header>
)

export {Header as default};