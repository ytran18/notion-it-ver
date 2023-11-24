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
import { getPage, getSinglePage, addPage, deletePage, handleFavoritePage, duplicatePage } from './function';

import './main-page.css';

const MainPage = () => {

    const user = useUserPackageHook();
    const prevPage = usePagePackageHook();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [state, setState] = useState({
        pages: [],
        currPage: {},
        favoritesPages: [],
        workspacePages: [],
        sharedPages: [],
        isShowSidebar: true,
        isCreatePage: false,
    });

    useEffect(() => {
        if (Object.keys(user).length === 0) {
            navigate({
                pathname: '/login',
            });
        };
    },[]);

    const getAllPage = async (id, isSelect, selectId, isFirstRender, isAdded) => {
        let favoritesPages = [];
        let workspacePages = [];
        let sharedPages = [];

        const res = await getPage(id);
        if (res?.success) {
            res?.message?.map((item) => {
                if (item?.is_favorite) {
                    favoritesPages.push(item);
                };
                if (item?.is_workspace) {
                    workspacePages.push(item);
                };
                if (item?.is_shared) {
                    sharedPages.push(item);
                };
            });

            if (isSelect) {
                if (selectId === null) {
                    dispatch(pagePackage(res?.message?.[0]?._id));
                    handleSelectPage(res?.message?.[0])
                } else {
                    handleSelectPage(selectId, isFirstRender);
                }
            };

            if (isAdded) {
                dispatch(pagePackage(isAdded));
                setState(prev => ({...prev, isCreatePage: true}));
            }
            setState(prev => ({
                ...prev, 
                pages: res?.message, 
                favoritesPages: favoritesPages, 
                workspacePages: workspacePages, 
                sharedPages: sharedPages,
            }));

        };
    };

    useEffect(() => {
        getAllPage(user?._id, true, prevPage, true);
    },[]);
        
    useEffect(() => {
        getAllPage(user?._id, false, false, false, false);
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
            setState(prev => ({...prev, currPage:res?.message, isCreatePage: false}));
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
            getAllPage(user?._id, true, res?.message?._id, true, res?.message?._id);
        };
    };

    const handleOption = async (type, pageId) => {
        let data = {
            page_id: pageId,
        };

        const func = {
            0: deletePage,
            1: handleFavoritePage,
            2: duplicatePage,
        }[type];

        const res = await func(data);

        if (res?.success) {
            getAllPage(user?._id, true, null, true, false);
        };
    };

    const handleFavorite = async (value) => {
        const data = {
            page_id: state.currPage?._id,
            is_favorite: value,
        }
        const res = await handleFavoritePage(data);
        if (res?.success) {
            getAllPage(user?._id);
        }
    };

    const handleHideSidebar = () => {
        setState(prev => ({...prev, isShowSidebar: !prev.isShowSidebar}));
    };

    return (
        <div
            className="w-screen h-screen flex"
            onContextMenu={(e) => {
                e.preventDefault();
            }}
        >
            {state.isShowSidebar && (
                <div className="h-full w-[220px] min-w-[220px] max-w-[480px]" id="sidebar">
                    <Sidebar 
                        pages={state.pages} 
                        handleSelectPage={handleSelectPage} 
                        handleAddPage={handleAddPage} 
                        handleOption={handleOption}
                        handleHideSidebar={handleHideSidebar}
                        favoritesPages={state.favoritesPages}
                        workspacePages={state.workspacePages}
                        sharedPages={state.sharedPages}
                        isShowSidebar={state.isShowSidebar}
                    />
                </div>
            )}
            <div id="resizeHandler" className='resize-handler' />
            <div className="flex flex-col w-full h-full" id="right-panel">
                <div className="">
                    <Header 
                        currPage={state.currPage}
                        isShowSidebar={state.isShowSidebar}
                        handleFavorite={handleFavorite}
                        handleHideSidebar={handleHideSidebar}
                    />
                </div>
                <div className="main">
                    <Main 
                        currPage={state.currPage}
                        isCreatePage={state.isCreatePage}
                    />
                </div>
            </div>
        </div>
    );
};

export default MainPage;