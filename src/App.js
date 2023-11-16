import React from "react";

import Header from "components/Header";
import Sidebar from "components/Sidebar";
import Main from "components/Main";

import './App.css';

const App = () => {
    return (
        <div className="w-screen h-screen flex">
            <div className="h-full w-[220px] min-w-[220px] max-w-[220px]">
                <Sidebar />
            </div>
            <div className="flex flex-col h-full header">
                <div className="">
                    <Header />
                </div>
                <div className="main">
                    <Main />
                </div>
            </div>
        </div>
    );
}

export default App;
