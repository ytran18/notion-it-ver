import React, { useState, useEffect } from "react";

import data from '@emoji-mart/data';

import ModalBackgroundCover from "core/components/ModalBackgroundCover";
import ModalEmoji from "core/components/ModalEmoji";
import Comment from "core/components/Comment";

import { ReactComponent as IconSmile } from 'assets/icons/iconSmile.svg';
import { ReactComponent as IconChatSolid } from 'assets/icons/iconChatSolid.svg';
import { ReactComponent as IconPhoto } from 'assets/icons/iconPhoto.svg';


import allImages from "assets/img";

const Main = () => {

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
    });

    const optionHeader = [
        { label: 'Add icon', icon: IconSmile, type: 'icon' },
        { label: 'Add cover', icon: IconPhoto, type: 'cover' },
        { label: 'Add comment', icon: IconChatSolid, type: 'comment' },
    ];

    useEffect(() => {
        if (!state.hasCoverBackground) return;

        const randomImage = allImages[Math.floor(Math.random() * allImages.length)];
        setState(prev => ({...prev, randomImg: randomImage}));
    },[state.hasCoverBackground]);

    useEffect(() => {
        if (!state.isVisibleIconHeader) return;

        const emojis = data.emojis;

        const keys = Object.keys(emojis);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const randomEmoji = emojis[randomKey].skins?.[0]?.unified;
        
        const emojiCodePoint = parseInt(randomEmoji, 16);
        const emoji = String.fromCodePoint(emojiCodePoint);
    
        setState(prev => ({
            ...prev,
            randomEmoji: emoji
        }));
    },[state.isVisibleIconHeader]);

    const handleChangeBg = (img) => {
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

    const handleMouseEnterCoverOption = () => {
        if (state.isVisibleModalCoverBackground) return;
        setState(prev => ({...prev, isDisplayCoverOption: true}));
    };

    const handleMouseLeaveCoverOption = () => {
        setState(prev => ({...prev, isDisplayCoverOption: false}));
    };

    const handleModalCover = (type) => {
        if (type === 'remove') {
            setState(prev => ({...prev, hasCoverBackground: false}));
        };
        setState(prev => ({...prev, isVisibleModalCoverBackground: !prev.isVisibleModalCoverBackground, isDisplayCoverOption: false}));
    };
    
    const handleModalEmoji = (type) => {
        if (type === 'remove') {
            setState(prev => ({...prev, isVisibleIconHeader: false}));
        };
        setState(prev => ({...prev, isVisibleModalEmoji: !prev.isVisibleModalEmoji}));
    };

    const onEmojiSelect = (e) => {
        const emojiSelect = e.unified;
        
        const emojiCodePoint = parseInt(emojiSelect, 16);
        const emoji = String.fromCodePoint(emojiCodePoint);

        setState(prev => ({...prev, randomEmoji: emoji, isVisibleModalEmoji: false}));
    };

    const classNameCoverOption = 'text-xs cursor-pointer font-medium p-2 hover:bg-[rgb(239,239,238)]';

    return (
        <div className="cursor-text h-full w-full flex flex-col justify-center items-center overflow-y-auto">
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
                        <div onClick={handleModalEmoji}>{state.randomEmoji}</div>
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
                        placeholder="Untitled" 
                        type="text" 
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
                </div>
            </div>
        </div>
    );
};

export default Main;