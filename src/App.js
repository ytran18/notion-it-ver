import React, { useEffect } from "react";

import Header from "components/Header";
import Sidebar from "components/Sidebar";
import Main from "components/Main";

import './App.css';

const App = () => {

    useEffect(() => {
        const resizer = document.getElementById('resizeHandler');
        const element = document.getElementById('sidebar');
        if (!resizer || !element) {
            return;
        }

        const resize = (e) => {
            const newWidth = e.pageX - element.getBoundingClientRect().left;
            if (newWidth > 50) {
                element.style.width = `${newWidth}px`;
            }
        };
        const stopResize = () => {
            window.removeEventListener('mousemove', resize);
        };

        resizer.addEventListener('mousedown', (e) => {
            e.preventDefault();
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResize);
        });
    }, []);

    return (
        <div className="w-screen h-screen flex">
            <div className="h-full w-[220px] min-w-[220px] max-w-[480px]" id="sidebar">
                <Sidebar />
            </div>
            <div id="resizeHandler" className='resize-handler' />
            <div className="flex flex-col w-full h-full" id="right-panel">
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
