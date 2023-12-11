import React, { useEffect, useState } from "react";

import { useNavigate } from 'react-router-dom';

import Header from "components/Header";
import Sidebar from "components/Sidebar";
import Main from "components/Main";

// Loading component
import Loading from "core/components/Loading";

// redux
import { useDispatch } from 'react-redux';
import { pagePackage } from "core/redux/actions";
import { useUserPackageHook, usePagePackageHook } from "core/redux/hooks";

// function
import { getPage, getSinglePage, addPage, deletePage, handleFavoritePage,
        duplicatePage, deletePagePernament, recoverPageFromTrash } from './function';

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
        deletedPages: [],
        render: false,
    });

    useEffect(() => {
        if (Object.keys(user).length === 0) {
            navigate({
                pathname: '/login',
            });
        };
    },[]);

    const getAllPage = async (id, isSelect, selectId, isFirstRender, isAdded, optionPageId, isEditPage) => {
        // id: id of user
        // isSelect: check is select page
        // selectId: if isSelect = true then selectId is id of page selected ( can be null )
        // isFirstRender: check that get page by id or object
        // isAdded: check if page is new page
        // optionPageId: id of context menu page select
        let pages = [];
        let favoritesPages = [];
        let workspacePages = [];
        let sharedPages = [];
        let deletedPages = [];

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

                if (item?.is_delete) {
                    deletedPages.push(item);
                } else {
                    pages.push(item);
                }
            });

            if (isSelect && !isEditPage) {
                if (selectId === null) {
                    if (optionPageId !== state.currPage?._id) {
                        dispatch(pagePackage(state.currPage?._id));
                        handleSelectPage(state.currPage);
                    } else {
                        dispatch(pagePackage(res?.message?.[0]?._id));
                        handleSelectPage(res?.message?.[0]);
                    }
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
                pages: pages, 
                favoritesPages: favoritesPages, 
                workspacePages: workspacePages, 
                sharedPages: sharedPages,
                deletedPages: deletedPages,
            }));

        };
    };

    useEffect(() => {
        if (!state.render) {
            getAllPage(user?._id, true, prevPage, true);
            setState(prev => ({...prev, render: true}));
        }
    },[state.render]);
        
    // useEffect(() => {
    //     getAllPage(user?._id, false, false, false, false);
    // },[state.currPage]);

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

    const handleOption = async (type, pageId, isFavorite) => {
        let data = {
            page_id: pageId,
        };

        if (type === 1) {
            data = {
                ...data,
                is_favorite: !isFavorite,
            };
        };

        const func = {
            0: deletePage,
            1: handleFavoritePage,
            2: duplicatePage,
        }[type];

        const res = await func(data);

        if (res?.success) {
            getAllPage(user?._id, true, null, true, false, type === 2 ? '' : pageId);
        };
    };

    const handleTrash = async (id, type) => {
        const data = {
            page_id: id,
        };
        const res = type === 'delete' ? await deletePagePernament(data) : await recoverPageFromTrash(data);
        if (res?.success) {
            getAllPage(user?._id, false, null, false, false, null);
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
        <div className="w-screen h-screen flex">
            {state.pages.length > 0 ? (
                <>
                    {state.isShowSidebar && (
                        <div className="h-full w-[220px] min-w-[220px] max-w-[480px] z-20" id="sidebar">
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
                                deletedPages={state.deletedPages}
                                handleTrash={handleTrash}
                            />
                        </div>
                    )}
                    <div id="resizeHandler" className='resize-handler' />
                    <div className="flex flex-col w-full h-full z-10" id="right-panel">
                        <div className="">
                            <Header 
                                currPage={state.currPage}
                                isShowSidebar={state.isShowSidebar}
                                handleFavorite={handleFavorite}
                                handleHideSidebar={handleHideSidebar}
                            />
                        </div>
                        <div className="main z-20">
                            <Main 
                                currPage={state.currPage}
                                isCreatePage={state.isCreatePage}
                                getAllPage={getAllPage}
                                currUser={user}
                                isShowSidebar={state.isShowSidebar}
                            />
                        </div>
                    </div>
                </>
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default MainPage;