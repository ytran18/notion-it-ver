import React, { useState, useEffect } from "react";

import ModalBackgroundCover from "core/components/ModalBackgroundCover";

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

    const handleOptionHeader = (type) => {
        if (type === 'cover') {
            setState(prev => ({...prev, hasCoverBackground: true}));
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
        }
        setState(prev => ({...prev, isVisibleModalCoverBackground: !prev.isVisibleModalCoverBackground, isDisplayCoverOption: false}));
    };

    const classNameCoverOption = 'text-xs cursor-pointer font-medium p-2 hover:bg-[rgb(239,239,238)]';

    return (
        <div className="cursor-text h-full w-full flex flex-col justify-center items-center">
            <div 
                onMouseEnter={handleMouseEnterCoverOption} 
                onMouseLeave={handleMouseLeaveCoverOption}
                style={{
                    backgroundImage: `url(${state.randomImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                className={`${state.hasCoverBackground ? 'block opacity-100' : 'hidden opacity-0'} h-96 w-full relative cursor-default transition-opacity duration-300`}
            >
                <div className={`absolute flex bg-white items-center bottom-2 rounded-md right-1/4 transition-opacity duration-300 ${state.isDisplayCoverOption ? 'opacity-100 flex' : 'opacity-0 hidden'}`}>
                    <div 
                        className={`${classNameCoverOption} rounded-tl-md rounded-bl-md border-r`}
                        onClick={() => handleModalCover('add')}
                    >
                        Change cover
                    </div>
                    <div className={`${classNameCoverOption} rounded-tr-md rounded-br-md`}>Reposition</div>
                </div>
                {state.isVisibleModalCoverBackground && (
                    <ModalBackgroundCover handleModalCover={handleModalCover}/>
                )}
            </div>
            <div className={`w-[60%] ${state.hasCoverBackground ? 'pb-14 pt-4' : 'py-14'} h-full`}>
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
                    {
                        state.isDisplayOption && (
                            <div className="absolute -top-0 w-full flex">
                                {optionHeader.map((item, index) => {
                                    return (
                                        <div 
                                            className={`${state.hasCoverBackground && item.label === 'Add cover' ? 'hidden' : 'flex'} text-[rgb(175,174,172)] cursor-pointer items-center hover:bg-[rgb(239,239,239)] p-[5px]`}
                                            key={`option-header-${index}`}
                                            onClick={() => handleOptionHeader(item.type)}
                                        >
                                            <item.icon className="mr-1"/>
                                            <div className="text-sm font-normal">{item.label}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Main;