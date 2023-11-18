import React, { useEffect, useState } from "react";

import { ReactComponent as IconLock } from 'assets/icons/iconLock.svg';
import { ReactComponent as IconArrowDown } from 'assets/icons/iconArrowDown.svg';
import { ReactComponent as IconLink } from 'assets/icons/iconLink.svg';

const PopUpShare = React.forwardRef((props, ref) => {

    const { handlePopUpShare } = props;

    const [state, setState] = useState({
        tab: 0,
    });

    const tabs = [
        { label: 'Share', type: 0 },
        { label: 'Public', type: 1 },
    ];

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                console.log("2");
                handlePopUpShare();
            } else {
                // prevent close pop up
                console.log("3");
                handlePopUpShare(1);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    },[]);

    const handleChangeTab = (type) => {
        setState(prev => ({...prev, tab: type}));
    };
    
    return (
        <div 
            className="w-[500px] cursor-default flex flex-col bg-white rounded-md z-[500] border border-[rgb(213,213,213)]"
            style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}
        >
            <div className="flex p-2 relative border-b border-[rgb(219,219,219)]">
                {tabs.map((item, index) => {
                    return (
                        <div onClick={() => handleChangeTab(item.type)} className="mx-2 flex text-sm flex-col items-center cursor-pointer" key={`pop-up-share-${index}`}>
                            {item.label}
                            {state.tab === item.type && (
                                <div className="w-[45px] h-[2px] absolute bottom-0 bg-black"></div>
                            )}
                        </div>
                    )
                })}
            </div>
            <div className="p-2 w-full flex justify-between items-center border-b border-[rgb(219,219,219)]">
                <div className="w-[87%] h-8 border border-[rgb(235,235,233)] rounded-md">
                    <input 
                        type="text" 
                        placeholder="Add people, groups, or emails ..."
                        className="w-full text-xs bg-[rgb(247,247,245)] h-full outline-none p-2" 
                    />
                </div>
                <div className="w-[13%] flex h-8 justify-end">
                    <div className="rounded-md text-white text-xs cursor-pointer flex items-center justify-center h-full px-2 bg-[rgb(36,131,226)]">Invite</div>
                </div>
            </div>
            <div className="w-full p-2 flex items-center justify-between">
                <div className="w-[130px] h-9 hover:bg-[rgb(225,225,225)] cursor-pointer rounded-[25px] flex justify-center items-center border border-[rgb(219,219,219)]">
                    <IconLock className=""/>
                    <div className="text-xs opacity-50 font-medium mx-2">Invite only</div>
                    <IconArrowDown className=""/>
                </div>
                <div className="flex items-center hover:bg-[rgb(225,225,225)] p-1 rounded-md cursor-pointer">
                    <IconLink className="mr-2"/>
                    <div className="text-xs">Copy link</div>
                </div>
            </div>
        </div>
    );
});

export default PopUpShare;