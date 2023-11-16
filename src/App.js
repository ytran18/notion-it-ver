import React from "react";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppRoutes from "routes";

import './App.css';

const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                {
                    AppRoutes.map((item, index) => {
                        const Page = item.Component;
                        return (
                            <Route 
                                key={index}
                                path={item.path}
                                element={
                                    <Page />
                                }
                            />
                        )
                    })
                }
            </Routes>
        </BrowserRouter>
    );
}

export default App;
