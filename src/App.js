import React from "react";

import Header from "components/Header";
import Sidebar from "components/Sidebar";
import Main from "components/Main";

const App = () => {
    return (
        <div className="w-screen h-screen flex">
            <div className="h-full min-w-[17%] w-[17%]">
                <Sidebar />
            </div>
            <div className="flex flex-col h-full w-[83%]">
                <div className="">
                    <Header />
                </div>
                <div className="">
                    <Main />
                </div>
            </div>
        </div>
    );
}

export default App;
