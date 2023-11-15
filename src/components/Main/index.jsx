import React, { useEffect, useState } from "react";

import { ReactComponent as IconSmile } from 'assets/icons/iconSmile.svg';
import { ReactComponent as IconChatSolid } from 'assets/icons/iconChatSolid.svg';
import { ReactComponent as IconPhoto } from 'assets/icons/iconPhoto.svg';

const Main = () => {

    const [state, setState] = useState({
        hasCoverBackground: false,
        isDisplayOption: false,
    });

    const optionHeader = [
        { label: 'Add icon', icon: IconSmile },
        { label: 'Add cover', icon: IconPhoto },
        { label: 'Add comment', icon: IconChatSolid },
    ];

    const handleMouseEnterTitle = () => {
        setState(prev => ({...prev, isDisplayOption: true}));
    };

    const handleMouseLeaveTitle = () => {
        setState(prev => ({...prev, isDisplayOption: false}));
    };

    return (
        <div className="cursor-text h-full w-full flex justify-center items-center">
            <div className="w-[60%] py-14 h-full">
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
                                            className="flex text-[rgb(175,174,172)] cursor-pointer items-center hover:bg-[rgb(239,239,239)] p-[5px]" 
                                            key={`option-header-${index}`}
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