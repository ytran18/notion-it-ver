import React, { useState } from "react";

import PopUpPageSetting from "core/components/PopupPageSetting";

import { ReactComponent as IconLeft } from 'assets/icons/iconLeft.svg';
import { ReactComponent as IconRightBig } from 'assets/icons/iconRightBig.svg';
import { ReactComponent as IconPlus } from 'assets/icons/iconPlus.svg';
import { ReactComponent as IconClock } from 'assets/icons/iconClock.svg';
import { ReactComponent as IconStar } from 'assets/icons/iconStar.svg';
import { ReactComponent as IconComment } from 'assets/icons/iconComment.svg';
import { ReactComponent as IconMore } from 'assets/icons/iconMore.svg';

const Header = () => {

    const [state, setState] = useState({
        isVisiblePopupPageSetting: false,
        isFavorite: false,
    });

    const handlePageSettingPopUp = () => {
        setState(prev => ({...prev, isVisiblePopupPageSetting: !prev.isVisiblePopupPageSetting}));
    };

    const handleAddToFavorite = () => {
        setState(prev => ({...prev, isFavorite: !prev.isFavorite}));
    };

    return (
        <div className="w-full h-full flex justify-between py-2">
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
            <div className="flex items-center">
                <div className=""></div>
                <div className=""></div>
                <div className="ml-2 p-[3px] hover:bg-[rgb(239,239,239)] select-none font-medium cursor-pointer text-sm">Share</div>
                <div className="ml-2 p-[3px] hover:bg-[rgb(239,239,239)]"> <IconComment className="cursor-pointer"/> </div>
                <div className="ml-2 p-[3px] hover:bg-[rgb(239,239,239)]"> <IconClock className="cursor-pointer"/> </div>
                <div className="ml-2 p-[3px] hover:bg-[rgb(239,239,239)]">
                    <IconStar onClick={handleAddToFavorite} className={`cursor-pointer ${state.isFavorite ? 'text-[rgb(247,192,80)]' : 'fill-white'}`}/>
                </div>
                <div className="mx-2 p-[3px] hover:bg-[rgb(239,239,239)] relative"> 
                    <IconMore 
                        className="cursor-pointer "
                        onClick={handlePageSettingPopUp}
                    /> 
                    {state.isVisiblePopupPageSetting && (
                        <div className="absolute right-2 top-[130%] transition-all duration-1000 z-50">
                            <PopUpPageSetting handlePageSettingPopUp={handlePageSettingPopUp}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;