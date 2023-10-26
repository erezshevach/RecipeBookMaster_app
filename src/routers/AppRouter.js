import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";


import Header from "../components/Header";
import RecipesDashboardPage from "../components/RecipesDashboardPage";
import CreateRecipePage from "../components/CreateRecipePage";
import UpdateRecipePage from "../components/UpdateRecipePage";
import HelpPage from "../components/HelpPage";
import NotFoundPage from "../components/NotFoundPage";



const AppRouter = () => {

    console.log('loading router');
    return (
        <BrowserRouter basename='/app'>
            <div>
                <Header/>

                    <Routes fallbackElement={<p>Loading...</p>}>
                        <Route path="/dashboard" element={<RecipesDashboardPage/>}/>
                        <Route path="/create" element={<CreateRecipePage/>}/>
                        <Route path="/update/:recipePid" element={<UpdateRecipePage/>}/>
                        <Route path="/help" element={<HelpPage/>}/>
                        <Route path="*" element={<NotFoundPage/>}/>
                    </Routes>

            </div>
        </BrowserRouter>
    )
}

export {AppRouter as default};