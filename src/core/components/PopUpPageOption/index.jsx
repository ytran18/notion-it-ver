import React, { useEffect, useRef } from "react";

import { ReactComponent as IconDelete } from 'assets/icons/iconDelete.svg';
import { ReactComponent as IconStar } from 'assets/icons/iconStarNotSolid.svg';
import { ReactComponent as IconDuplicate } from 'assets/icons/iconDuplicate.svg';
import { ReactComponent as IconRename } from 'assets/icons/iconRename.svg';
import { ReactComponent as IconAlias } from 'assets/icons/iconAlias.svg';
import { ReactComponent as IconPeekModeSide } from 'assets/icons/iconPeekModeSide.svg';
import { ReactComponent as IconLink } from 'assets/icons/iconLink.svg';
import { ReactComponent as IconMoveTo } from 'assets/icons/iconMoveTo.svg';
import { ReactComponent as IconLoop } from 'assets/icons/iconLoop.svg';
import { ReactComponent as IconUnstar } from 'assets/icons/iconUnstar.svg';

const PopUpPageOption = (props) => {

    const { handleMoreAction, itemId, handleOption, isFavorite, type } = props;

    const popupRef = useRef(null);

    const OptionsHead = [
        { label: 'Delete', type: 0, icon: IconDelete },
        { label: isFavorite ? 'Remove from Favorites' : 'Add to Favorites', type: 1, icon: isFavorite ? IconUnstar : IconStar },
        { label: 'Duplicate', type: 2, icon: IconDuplicate },
        { label: 'Rename', type: 3, icon: IconRename },
    ];
    
    const OptionsMiddleTop = [
        { label: 'Open in new tab', type: 4, icon: IconAlias },
        { label: 'Open in new window', type: 5, icon: IconStar },
        { label: 'Open in side peek', type: 6, icon: IconPeekModeSide },
        { label: 'Copy link', type: 7, icon: IconLink },
    ]

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                handleMoreAction();
            } 
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    },[]);

    useEffect(() => {
        const popupElement = document.querySelector('.action-item');
        const relativeElement = document.querySelector(`#id-${itemId}${type}`);
        if (popupElement && relativeElement) {
            const popupRect = popupElement.getBoundingClientRect();
            const relativeRect = relativeElement.getBoundingClientRect();
            if (relativeRect.top - popupRect.height > 0) {
                popupElement.style.top = `${relativeRect.top - popupRect.height}px`;
            };
        };
    },[]);

    return (
        <div 
            ref={popupRef} 
            style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}
            className="w-[265px] flex flex-col action-item fixed bg-white border-[rgb(219,219,219)] shadow-md rounded-md"
        >
            <div className="border-b border-[rgb(219,219,219)] px-1 py-2">
                {OptionsHead.map((item, index) => {
                    return (
                        <div
                            onClick={() => {handleOption(item.type, itemId, isFavorite); handleMoreAction()}}
                            className="flex items-center py-[4px] px-4 hover:bg-[rgb(239,239,239)] rounded-md" 
                            key={`pop-up-page-option-${item.type}`}
                        >
                            <item.icon className="mr-3"/>
                            <div className="text-[13px] font-normal">{item.label}</div>
                        </div>
                    )
                })}
            </div>
            <div className="border-b border-[rgb(219,219,219)] px-1 py-2">
                {OptionsMiddleTop.map((item, index) => {
                    return (
                        <div className="flex items-center py-[4px] px-3 hover:bg-[rgb(239,239,239)] rounded-md" key={`pop-up-page-option-${item.type}`}>
                            <item.icon className="mr-3"/>
                            <div className="text-[13px] font-normal">{item.label}</div>
                        </div>
                    )
                })}
            </div>
            <div className="border-b border-[rgb(219,219,219)] px-1 py-2">
                <div className="flex items-center py-[4px] px-3 hover:bg-[rgb(239,239,239)] rounded-md">
                    <IconMoveTo className="mr-3"/>
                    <div className="text-[13px] font-normal">Move to</div>
                </div>
            </div>
            <div className="border-b border-[rgb(219,219,219)] px-1 py-2">
                <div className="flex items-center py-[4px] px-3 hover:bg-[rgb(239,239,239)] rounded-md">
                    <IconLoop className="mr-3"/>
                    <div className="text-[13px] font-normal">Turn into wiki</div>
                </div>
            </div>
            <div className="text-xs px-4 py-2 opacity-50">
                <div>Page</div>
                <div className="my-2">Last edited by ytn</div>
                <div>Yesterday at 2:19 PM</div>
            </div>
        </div>
    );
};

export default PopUpPageOption;