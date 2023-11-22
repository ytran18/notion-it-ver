import React, { useEffect, useState } from "react";

import { useDispatch } from 'react-redux';
import { pagePackage } from "core/redux/actions";
import { usePagePackageHook } from "core/redux/hooks";
import PopUpPageOption from "core/components/PopUpPageOption";

import { ReactComponent as IconRight } from 'assets/icons/iconRight.svg';
import { ReactComponent as IconDown } from 'assets/icons/iconArrowDown.svg';
import { ReactComponent as IconDocument } from 'assets/icons/iconDocument.svg';
import { ReactComponent as IconMore } from 'assets/icons/iconMore.svg';
import { ReactComponent as IconPlus } from 'assets/icons/iconPlusSmall.svg';

import './style.css';

const PageTree = (props) => {

    const { entry, depth, handleSelectPage } = props;
    const dispatch = useDispatch();

    const [state, setState] = useState({
        isExpanded: false,
        isVisibleActionIcon: false,
        isVisiblePopUpOption: false,
    });

    const pageSelect = usePagePackageHook();

    const renderIcon = (icon) => {
        if (icon === '') return <IconDocument />
        const emojiCodePoint = parseInt(icon, 16);
        const emoji = String.fromCodePoint(emojiCodePoint);
        return emoji;
    };

    const handleExpandItem = () => {
        setState(prev => ({...prev, isExpanded: !prev.isExpanded}));
    };

    const handleSelect = (id) => {
        dispatch(pagePackage(id));
        handleSelectPage(entry);
    };

    const handleMouseEnter = () => {
        setState(prev => ({...prev, isVisibleActionIcon: true}));
    };
    
    const handleMouseLeave = () => {
        setState(prev => ({...prev, isVisibleActionIcon: false}));
    };

    const handleMoreAction = () => {
        setState(prev => ({...prev, isVisiblePopUpOption: !prev.isVisiblePopUpOption}));
    };
    
    return (
        <div className="w-full h-full" id={`id-${entry.id}`}>
            <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleSelect(entry._id)} 
                className={`w-full ${pageSelect === entry._id ? 'bg-[rgb(232,232,230)]' : ''} relative flex items-center hover:bg-[rgb(232,232,230)] rounded-md p-1 my-1 cursor-pointer`}
            >
                <div onClick={handleExpandItem} className="pr-2">
                    {state.isExpanded ? (
                        <IconDown className="hover:bg-[rgb(209,209,208)] transition-all duration-200"/>
                    ) : (
                        <IconRight className="hover:bg-[rgb(209,209,208)] transition-all duration-200"/>
                    )}
                </div>
                <div className="text-[13px] relative w-full justify-between font-medium flex items-center">
                    <div className={`flex items-center ${state.isVisibleActionIcon ? 'w-[60%]' : 'w-full'}`}>
                        <div className="mr-2 flex justify-center items-center text-[16px] select-none">
                            {renderIcon(entry?.page_icon)}
                        </div>
                        <div className="truncate select-none">
                            {entry?.page_name}
                        </div>
                    </div>
                    {state.isVisibleActionIcon && (
                        <div className='flex absolute items-center right-0'>
                            <div className="hover:bg-[rgb(209,209,208)] rounded-md" onClick={handleMoreAction}>
                                <IconMore className="transform scale-75"/>
                            </div>
                            <div className="p-[1px] hover:bg-[rgb(209,209,208)] rounded-md">
                                <IconPlus className=""/>
                            </div>
                        </div>
                    )}
                </div>
                {
                    state.isVisiblePopUpOption && (
                        <div className='absolute z-[999] top-[70%] left-[80%]'>
                            <PopUpPageOption itemId={entry.id} handleMoreAction={handleMoreAction} />
                        </div>
                    )
                }
            </div>
            {state.isExpanded && entry?.children?.length > 0 && (
                <div className="pl-5 w-full flex flex-col">
                    {entry.children.map((childEntry, index) => (
                        <PageTree key={index} entry={childEntry} depth={depth + 1} />
                    ))}
                </div>
            )}
            {state.isExpanded && !(entry?.children?.length > 0) && (
                <div className="w-full text-[13px] font-medium opacity-60 select-none cursor-default">No pages inside</div>
            )}
        </div>
    );
};

export default PageTree;