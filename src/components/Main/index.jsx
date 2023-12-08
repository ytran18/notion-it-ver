import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";

import data from '@emoji-mart/data';
import { v4 as uuidv4 } from 'uuid';

import { storage } from "core/firebase/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";

import ModalBackgroundCover from "core/components/ModalBackgroundCover";
import ModalEmoji from "core/components/ModalEmoji";
import Comment from "core/components/Comment";
import Block from "core/components/Block";

import { changePageTitle, updatePageCover, updateIcon } from './function';

import { ReactComponent as IconSmile } from 'assets/icons/iconSmile.svg';
import { ReactComponent as IconChatSolid } from 'assets/icons/iconChatSolid.svg';
import { ReactComponent as IconPhoto } from 'assets/icons/iconPhoto.svg';


import allImages from "assets/img";

const Main = (props) => {

    const { currPage, isCreatePage, getAllPage, currUser } = props;

    const [state, setState] = useState({
        hasCoverBackground: false,
        isDisplayOption: false,
        isDisplayCoverOption: false,
        isVisibleModalCoverBackground: false,
        randomImg: ``,
        isVisibleIconHeader: false,
        randomEmoji: ``,
        isVisibleModalEmoji: false,
        isVisibleComment: false,
        pageTitle: currPage?.page_name || '',
        status: 0,
        idBlockActive: '',
        blocks: [],
        deleteId: 0,
    });
    
    const titleRef = useRef(null);

    useEffect(() => {
        if (isCreatePage && titleRef.current) {
            titleRef.current.focus();
        };
    },[isCreatePage]);

    useEffect(() => {
        if (titleRef.current) {
            titleRef.current.focus();
        };
    },[currPage]);

    const optionHeader = [
        { label: 'Add icon', icon: IconSmile, type: 'icon' },
        { label: 'Add cover', icon: IconPhoto, type: 'cover' },
        { label: 'Add comment', icon: IconChatSolid, type: 'comment' },
    ];

    useEffect(() => {
        if (currPage) {
            const emojiCodePoint = parseInt(currPage?.page_icon, 16);
            let emoji = ''
            if (emojiCodePoint) {
                emoji = String.fromCodePoint(emojiCodePoint);
            }

            setState(prev => ({
                ...prev, 
                pageTitle: currPage?.page_name,
                randomImg: currPage?.page_cover_img,
                randomEmoji: emoji,
                hasCoverBackground: currPage?.page_cover_img?.length > 0 ? true: false,
                status: 1,
                isVisibleIconHeader: currPage?.page_icon?.length > 0 ? true : false,
            }));
        };
    },[currPage]);

    useEffect(() => {
        async function getRandomBgCover () {

            if (!state.hasCoverBackground || state.randomImg.length > 0) return;
    
            const randomImage = allImages[Math.floor(Math.random() * allImages.length)];
    
            const regex = /\/static\/media\/(.*?)\./;
            const selectedImage = regex.exec(randomImage)[1];
    
            const regexStorage = /\/(.*?)\./;
            const storageRef = await ref(storage, "bg-cover");
            const result = await listAll(storageRef);
            const bgCover = result.items.map((imageRef) => (
                {
                    path: regexStorage.exec(imageRef?._location?.path)[1],
                    url: getDownloadURL(imageRef)
                }
            ));
            
            bgCover.map((item) => {
                if (item.path === selectedImage) {
                    item.url.then(async(url) => {
                        const data = {
                            page_id: currPage?._id,
                            page_cover_img: url,
                        };
                        await updatePageCover(data);
                    });
                }
            })
            setState(prev => ({...prev, randomImg: randomImage}));
        }

        getRandomBgCover();

    },[state.hasCoverBackground]);

    useEffect(() => {
        async function getRandomIcon () {
            if (!state.isVisibleIconHeader || state.randomEmoji.length > 0) return;
    
            const emojis = data.emojis;
    
            const keys = Object.keys(emojis);
            const randomKey = keys[Math.floor(Math.random() * keys.length)];
            const randomEmoji = emojis[randomKey].skins?.[0]?.unified;
            
            const emojiCodePoint = parseInt(randomEmoji, 16);
            const emoji = String.fromCodePoint(emojiCodePoint);

            const value = {
                page_id: currPage?._id,
                page_icon: randomEmoji
            };

            await updateIcon(value);
        
            setState(prev => ({
                ...prev,
                randomEmoji: emoji
            }));
        }

        getRandomIcon();
    },[state.isVisibleIconHeader]);

    const handleChangeBg = async (img) => {
        const regex = /\/static\/media\/(.*?)\./;
        const selectedImage = regex.exec(img)[1];

        const regexStorage = /\/(.*?)\./;
        const storageRef = await ref(storage, "bg-cover");
        const result = await listAll(storageRef);
        const bgCover = result.items.map((imageRef) => (
            {
                path: regexStorage.exec(imageRef?._location?.path)[1],
                url: getDownloadURL(imageRef)
            }
        ));
        
        bgCover.map((item) => {
            if (item.path === selectedImage) {
                item.url.then(async(url) => {
                    const data = {
                        page_id: currPage?._id,
                        page_cover_img: url,
                    };
                    await updatePageCover(data);
                });
            }
        })

        setState(prev => ({...prev, randomImg: img}));
    };

    const handleOptionHeader = (type) => {
        if (type === 'cover') {
            setState(prev => ({...prev, hasCoverBackground: true}));
        };
        if (type === 'icon') {
            setState(prev => ({...prev, isVisibleIconHeader: true}));
        };
        if (type === 'comment') {
            setState(prev => ({...prev, isVisibleComment: true}));
        };
    };

    const handleMouseEnterTitle = () => {
        setState(prev => ({...prev, isDisplayOption: true}));
    };

    const handleMouseLeaveTitle = () => {
        setState(prev => ({...prev, isDisplayOption: false}));
    };

    const handleMouseEnterCoverOption = useCallback(() => {
        if (state.isVisibleModalCoverBackground) return;
        setState(prev => ({...prev, isDisplayCoverOption: true}));
    },[]);

    const handleMouseLeaveCoverOption = useCallback(() => {
        setState(prev => ({...prev, isDisplayCoverOption: false}));
    },[]);

    const handleModalCover = async (type) => {
        if (type === 'remove') {
            const data = {
                page_id: currPage?._id,
                page_cover_img: "",
            }

            await updatePageCover(data);
            setState(prev => ({...prev, hasCoverBackground: false}));
        };
        setState(prev => ({...prev, isVisibleModalCoverBackground: !prev.isVisibleModalCoverBackground, isDisplayCoverOption: false}));
    };
    
    const handleModalEmoji = async (type) => {
        if (type === 'remove') {
            setState(prev => ({...prev, isVisibleIconHeader: false}));
            const data = {
                page_id: currPage?._id,
                page_icon: "",
            };
    
            await updateIcon(data);
        };
        
        setState(prev => ({...prev, isVisibleModalEmoji: !prev.isVisibleModalEmoji}));
    };

    const onEmojiSelect = async (e) => {
        const emojiSelect = e.unified;
        
        const emojiCodePoint = parseInt(emojiSelect, 16);
        const emoji = String.fromCodePoint(emojiCodePoint);

        const data = {
            page_id: currPage?._id,
            page_icon: emojiSelect,
        };

        await updateIcon(data);
        getAllPage(currUser?._id, true, currPage?._id, false, false, null, true);

        setState(prev => ({...prev, randomEmoji: emoji, isVisibleModalEmoji: false}));
    };

    const handleChangePageTitle = async (data) => {
        await changePageTitle(data);
        getAllPage(currUser?._id, true, currPage?._id, false, false, null, true);
    };

    useEffect(() => {
        if (state.status === 1) {
            return;
        }
        const data = {
            page_name: state.pageTitle,
            page_id: currPage?._id,
        };

        const saveTimeout = setTimeout(() => {
            handleChangePageTitle(data);
        }, 2000);


        return () => clearTimeout(saveTimeout);
    },[state.pageTitle, state.status]);

    // render block
    const handleEnter = (e, currIndex) => {
        if (e.key === 'ArrowDown') {
            if (state.blocks.length > 0) {
                const element = document.getElementById(`block-id-${state.blocks?.[0]?.uuid}`);
                if (element) element.focus();
            };
        };

        if (e.key === 'Enter') {
            setState(prev => {
                const newBlocks = [...prev.blocks];
                const id = uuidv4();

                const blockElement = {
                    element: (
                        <div
                            className="my-2 w-full"
                            key={`block-${id}`}
                            id={`block-parent-id-${id}`}
                        >
                            
                        </div>
                    ),
                    uuid: id, 
                };

                
                if (currIndex !== undefined && currIndex >= -1 && currIndex < newBlocks.length - 1) {
                    newBlocks.splice(currIndex + 1, 0, blockElement);
                } else {
                    newBlocks.push(blockElement);
                }
            
                return { ...prev, blocks: newBlocks, idBlockActive: `block-id-${id}` };
            });            
        };
    };

    const handleArrow = (index, type, prevOrNextId) => {
        let element;
        if (type === 'ArrowUp' && prevOrNextId === undefined) {
            element = document.getElementById('page-title');
        } else {
            element = document.getElementById(`${prevOrNextId}`);
        };

        if (element) {
            element.focus();
            setState(prev => ({...prev, idBlockActive: prevOrNextId}));
        };
    };

    const handleDelete = async (index, prevId) => {
        let prevElement;

        if (prevId !== undefined) {
            prevElement = document.getElementById(`${prevId}`);
            setState(prev => ({...prev, idBlockActive: prevId}));
        } else {
            prevElement = document.getElementById('page-title')
        }

        if (prevElement) {
            setState(prev => ({...prev, deleteId: index}));
            prevElement.focus();

            const range = document.createRange();
            const sel = window.getSelection();
            const lastChild = prevElement.lastChild;

            if (lastChild && lastChild.nodeType === Node.TEXT_NODE) {
                range.selectNodeContents(lastChild);
                range.collapse(false);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    };

    const handleClickInBlock = (id) => {
        setState(prev => ({...prev, idBlockActive: id}));
    };

    // handle remove block (setState)
    useEffect(() => {
        const blocks = state.blocks;
        if (state.deleteId) {
            const blocksCopy = [...blocks];
            const blockToRemove = blocksCopy.find((item) => `block-${state.deleteId}` === item.key);
            if (blockToRemove) {
                const updateBlocks = blocksCopy.filter((item) => `block-${state.deleteId}` !== item.key);
                setState(prev => ({...prev, blocks: updateBlocks}))
            }
        }
    }, [state.deleteId]);

    const classNameCoverOption = 'text-xs cursor-pointer font-medium p-2 hover:bg-[rgb(239,239,238)]';

    return (
        <div className="cursor-text relative z-10 h-full w-full flex flex-col items-center overflow-y-auto">
            <div 
                onMouseEnter={handleMouseEnterCoverOption} 
                onMouseLeave={handleMouseLeaveCoverOption}
                style={{
                    backgroundImage: `url(${state.randomImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                className={`${state.hasCoverBackground ? 'block opacity-100' : 'hidden opacity-0'} h-[30vh] min-h-[30vh] w-full relative cursor-default transition-opacity duration-300`}
            >
                <div className={`absolute flex bg-white items-center bottom-2 rounded-md right-1/4 transition-opacity duration-[270ms] ${state.isDisplayCoverOption ? 'opacity-100' : 'opacity-0'}`}>
                    <div 
                        className={`${classNameCoverOption} rounded-tl-md rounded-bl-md border-r`}
                        onClick={() => handleModalCover('add')}
                    >
                        Change cover
                    </div>
                    <div className={`${classNameCoverOption} rounded-tr-md rounded-br-md`}>Reposition</div>
                </div>
                {state.isVisibleModalCoverBackground && (
                    <ModalBackgroundCover handleModalCover={handleModalCover} handleChangeBg={handleChangeBg}/>
                )}
            </div>
            <div className={`w-[65%] ${state.hasCoverBackground ? 'pb-14 pt-4' : 'py-14'} h-full`}>
                {state.isVisibleIconHeader && (
                    <div 
                        className={`w-[78px] mb-2 h-[78px] flex items-center justify-center hover:bg-[rgb(239,239,239)] z-10 relative text-7xl cursor-pointer`}
                    >
                        <div onClick={() => handleModalEmoji('open')}>{state.randomEmoji}</div>
                        {state.isVisibleModalEmoji && (
                            <div className="absolute -bottom-[400px]">
                                <ModalEmoji handleModalEmoji={handleModalEmoji} onEmojiSelect={onEmojiSelect}/>
                            </div>
                        )}
                    </div>
                )}
                <div 
                    className="w-full relative" 
                    onMouseEnter={handleMouseEnterTitle} 
                    onMouseLeave={handleMouseLeaveTitle}
                >
                    <input
                        ref={titleRef}
                        placeholder="Untitled"
                        id="page-title"
                        value={state.pageTitle || ''}
                        onChange={(e) => setState(prev => ({...prev, pageTitle: e.target.value, status: 2}))}
                        type="text"
                        onKeyDown={handleEnter}
                        className="w-full mt-8 outline-none truncate text-4xl py-3 h-14 text-[rgb(55,53,47)] font-bold placeholder:opacity-50"
                    />
                    <div className={`absolute ${state.isDisplayOption ? 'opacity-100' : 'opacity-0'} -top-0 transition-opacity duration-[270ms] w-full flex flex-wrap`}>
                        {
                            state.isDisplayOption && (
                                optionHeader.map((item, index) => {
                                    return (
                                        <div 
                                            className={`${state.hasCoverBackground && item.label === 'Add cover' ? 'hidden' : 'flex'} ${state.isVisibleIconHeader && item.label === 'Add icon' ? 'hidden' : 'flex'} ${state.isVisibleComment && item.label === 'Add comment' ? 'hidden' : 'flex'}  text-[rgb(175,174,172)] cursor-pointer items-center hover:bg-[rgb(239,239,239)] p-[5px]`}
                                            key={`option-header-${index}`}
                                            onClick={() => handleOptionHeader(item.type)}
                                        >
                                            <item.icon className="mr-1"/>
                                            <div className="text-sm font-normal">{item.label}</div>
                                        </div>
                                    )
                                })
                            )
                        }
                    </div>
                    {state.isVisibleComment && (
                        <div className="">
                            <Comment />
                        </div>
                    )}
                    <div className="flex flex-col w-full">
                        {state.blocks.map((item) => {
                            return (
                                <React.Fragment key={item.uuid}>
                                    {React.cloneElement(item.element, { 
                                        children: (
                                            <Block
                                                id={`block-id-${item.uuid}`}
                                                handleEnter={handleEnter} 
                                                handleArrow={handleArrow}
                                                handleDelete={handleDelete}
                                                handleClickInBlock={handleClickInBlock}
                                                index={item.uuid}
                                                idActive={state.idBlockActive}
                                            />
                                        )
                                    })}
                                </React.Fragment>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;