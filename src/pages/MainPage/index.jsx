import React, { useEffect, useState } from "react";

import { useNavigate } from 'react-router-dom';

import Header from "components/Header";
import Sidebar from "components/Sidebar";
import Main from "components/Main";

// redux
import { useUserPackageHook } from "core/redux/hooks";

// function
import { getPage } from './function';

import './main-page.css';

const MainPage = () => {

    const user = useUserPackageHook();
    const navigate = useNavigate();

    const [state, setState] = useState({
        pages: [],
        currPage: {},
    });

    useEffect(() => {
        if (Object.keys(user).length === 0) {
            navigate({
                pathname: '/login',
            });
        };
    },[]);

    useEffect(() => {
        async function getAllPage () {
            const res = await getPage(user?._id);
            if (res?.success) {
                setState(prev => ({...prev, pages: res?.message}));
            };
        };

        getAllPage();
    },[]);

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

    const handleSelectPage = (currPage) => {
        setState(prev => ({...prev, currPage:currPage}));
    };

    return (
        <div className="w-screen h-screen flex">
            <div className="h-full w-[220px] min-w-[220px] max-w-[480px]" id="sidebar">
                <Sidebar pages={state.pages} handleSelectPage={handleSelectPage} />
            </div>
            <div id="resizeHandler" className='resize-handler' />
            <div className="flex flex-col w-full h-full" id="right-panel">
                <div className="">
                    <Header />
                </div>
                <div className="main">
                    <Main currPage={state.currPage}/>
                </div>
            </div>
        </div>
    );
};

export default MainPage;