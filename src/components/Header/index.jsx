import React, { useState, useRef } from "react";

import PopUpPageSetting from "core/components/PopupPageSetting";
import ModalHistory from "core/components/ModalHistory";
import ModalComments from "core/components/ModalComments";

import { ReactComponent as IconLeft } from 'assets/icons/iconLeft.svg';
import { ReactComponent as IconRightBig } from 'assets/icons/iconRightBig.svg';
import { ReactComponent as IconPlus } from 'assets/icons/iconPlus.svg';
import { ReactComponent as IconClock } from 'assets/icons/iconClock.svg';
import { ReactComponent as IconStar } from 'assets/icons/iconStar.svg';
import { ReactComponent as IconComment } from 'assets/icons/iconComment.svg';
import { ReactComponent as IconMore } from 'assets/icons/iconMore.svg';
import { ReactComponent as IconDoubleLeft } from 'assets/icons/iconDoubleLeft.svg';

const Header = () => {

    const [state, setState] = useState({
        isVisiblePopupPageSetting: false,
        isFavorite: false,
        isVisibleModalHistory: false,
        isVisibleModalComment: false,
    });

    const modalSettingPopUpRef = useRef(null);

    const handlePageSettingPopUp = () => {
        setState(prev => ({...prev, isVisiblePopupPageSetting: !prev.isVisiblePopupPageSetting}));
    };

    const handleAddToFavorite = () => {
        setState(prev => ({...prev, isFavorite: !prev.isFavorite}));
    };

    const handleModalHistory = () => {
        setState(prev => ({...prev, isVisibleModalHistory: true, isVisibleModalComment: false}));
    };
    
    const handleHideModal = () => {
        setState(prev => ({...prev, isVisibleModalHistory: false, isVisibleModalComment: false}));
    };
    
    const handleModalComment = () => {
        setState(prev => ({...prev, isVisibleModalComment: true, isVisibleModalHistory: false}));
    };

    return (
        <>
            <div className="w-full h-full z-[101] relative flex justify-between py-2">
                <div className="flex items-center">
                    <div title="Go back" className="mx-2 hover:bg-[rgb(239,239,239)]">
                        <IconLeft className="cursor-pointer "/>
                    </div>
                    <div title="Go forward" className="mr-2 hover:bg-[rgb(239,239,239)]">
                        <IconRightBig className="cursor-pointer"/>
                    </div>
                    <div title="New tab" className="mr-2 hover:bg-[rgb(239,239,239)]">
                        <IconPlus className="cursor-pointer"/>
                    </div>
                    <div className="px-2 hover:bg-[rgb(239,239,239)] text-sm font-medium cursor-pointer select-none">Quy do</div>
                </div>
                <div className="flex items-center justify-between w-[385px]">
                    <div className="fle items-center ml-4">
                        {(state.isVisibleModalHistory || state.isVisibleModalComment) && (
                            <IconDoubleLeft
                                onClick={handleHideModal}
                                className="transform rotate-180 cursor-pointer hover:bg-[rgb(239,239,239)]"
                            />
                        )}
                    </div>
                    <div className="flex items-center">
                        <div className="ml-2 p-[3px] hover:bg-[rgb(239,239,239)] select-none font-medium cursor-pointer text-sm">Share</div>
                        <div className="ml-2 p-[3px] hover:bg-[rgb(239,239,239)]"> 
                            <IconComment onClick={handleModalComment} className="cursor-pointer"/>
                        </div>
                        <div className="ml-2 p-[3px] hover:bg-[rgb(239,239,239)]">
                            <IconClock onClick={handleModalHistory} className="cursor-pointer"/>
                        </div>
                        <div className="ml-2 p-[3px] hover:bg-[rgb(239,239,239)]">
                            <IconStar onClick={handleAddToFavorite} className={`cursor-pointer ${state.isFavorite ? 'text-[rgb(247,192,80)]' : 'fill-white'}`}/>
                        </div>
                        <div ref={modalSettingPopUpRef} className="mx-2 p-[3px] hover:bg-[rgb(239,239,239)] relative">
                            <IconMore
                                className="cursor-pointer "
                                onClick={handlePageSettingPopUp}
                            />
                            {state.isVisiblePopupPageSetting && (
                                <div className={`absolute ${state.isVisiblePopupPageSetting ? 'opacity-100' : 'opacity-0'} transition-opacity right-2 top-[130%] duration-[270ms] z-50`}>
                                    <PopUpPageSetting handlePageSettingPopUp={handlePageSettingPopUp} ref={modalSettingPopUpRef}/>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div 
                className={`absolute right-0 cursor-pointer ease-out duration-[270ms] top-0 ${state.isVisibleModalHistory ? 'opacity-100 z-[100]' : 'opacity-0 z-0'}`}
            >
                <ModalHistory />
            </div>
            <div 
                className={`absolute right-0 cursor-pointer ease-out duration-[270ms] top-0 ${state.isVisibleModalComment ? 'opacity-100 z-[100]' : 'opacity-0 z-0'}`}
            >
                <ModalComments />
            </div>
        </>
    );
};

export default Header;