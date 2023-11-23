import React, { useEffect, useState } from "react";

import { useNavigate } from 'react-router-dom';

import Header from "components/Header";
import Sidebar from "components/Sidebar";
import Main from "components/Main";

// redux
import { useDispatch } from 'react-redux';
import { pagePackage } from "core/redux/actions";
import { useUserPackageHook, usePagePackageHook } from "core/redux/hooks";

// function
import { getPage, getSinglePage, addPage, deletePage } from './function';

import './main-page.css';

const MainPage = () => {

    const user = useUserPackageHook();
    const prevPage = usePagePackageHook();
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    const getAllPage = async (id) => {
        const res = await getPage(id);
        if (res?.success) {
            return res?.message;
        } else {
            return false;
        }
    };

    useEffect(() => {
        getAllPage(user?._id)
            .then((value) => {
                handleSelectPage(prevPage, true);
                setState(prev => ({...prev, pages: value}));
            })
            .catch((err) => {
                console.log(err);
            })
        },[]);
        
    useEffect(() => {
        getAllPage(user?._id)
            .then((value) => {
                setState(prev => ({...prev, pages: value}));
            })
            .catch((err) => {
                console.log(err);
            })
    },[state.currPage]);

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

    const handleSelectPage = async (currPage, isFirstRender) => {
        const res = isFirstRender ? await getSinglePage(currPage) : await getSinglePage(currPage?._id);
        if (res?.success) {
            setState(prev => ({...prev, currPage:res?.message}));
        };
    };

    const handleAddPage = async () => {
        const data = {
            page_name: '',
            page_owner: user?._id,
            page_icon: '',
            page_cover_img: '',
            public_access: false,
            children: '',
            blocks: [],
            is_favorite: false,
            is_shared: false,
            is_workspace: false,
            shared_user: [],
            isLock: false,
        };

        const res = await addPage(data);
        if (res?.success) {
            getAllPage(user?._id)
                .then((value) => {
                    dispatch(pagePackage(res?.message?._id));
                    handleSelectPage(res?.message?._id, true);
                    setState(prev => ({...prev, pages: value}));
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    };

    const handleOption = async (type, pageId) => {
        if (type === 0) {
            const data = {
                page_id: pageId,
            };
            const res = await deletePage(data);
            if (res?.success) {
                getAllPage(user?._id)
                    .then((value) => {
                        dispatch(pagePackage(value[0]?._id));
                        handleSelectPage(value[0]?._id, true);
                        setState(prev => ({...prev, pages: value}));
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        };
    };

    return (
        <div className="w-screen h-screen flex">
            <div className="h-full w-[220px] min-w-[220px] max-w-[480px]" id="sidebar">
                <Sidebar 
                    pages={state.pages} 
                    handleSelectPage={handleSelectPage} 
                    handleAddPage={handleAddPage} 
                    handleOption={handleOption}
                />
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