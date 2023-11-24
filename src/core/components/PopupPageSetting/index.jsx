import React, { useEffect, useState } from "react";

import { ReactComponent as IconLock } from 'assets/icons/iconLock.svg';
import { ReactComponent as IconUnlock } from 'assets/icons/iconUnlock.svg';
import { ReactComponent as IconCustomize } from 'assets/icons/iconCustomize.svg';
import { ReactComponent as IconNotification } from 'assets/icons/iconNotification.svg';
import { ReactComponent as IconLink } from 'assets/icons/iconLink.svg';
import { ReactComponent as IconDuplicate } from 'assets/icons/iconDuplicate.svg';
import { ReactComponent as IconPeekModeSide } from 'assets/icons/iconPeekModeSide.svg';
import { ReactComponent as IconRight } from 'assets/icons/iconRight.svg';
import { ReactComponent as IconUndo } from 'assets/icons/iconUndo.svg';
import { ReactComponent as IconHistory } from 'assets/icons/iconHistory.svg';
import { ReactComponent as IconAnalyticsSearch } from 'assets/icons/iconAnalyticsSearch.svg';
import { ReactComponent as IconShowDeletedPage } from 'assets/icons/iconShowDeletedPage.svg';
import { ReactComponent as IconDelete } from 'assets/icons/iconDelete.svg';
import { ReactComponent as IconImport } from 'assets/icons/iconImport.svg';
import { ReactComponent as IconExport } from 'assets/icons/iconExport.svg';

const PopUpPageSetting = React.forwardRef((props, ref) => {

    const { handlePageSettingPopUp } = props;

    const [state, setState] = useState({
        isLockedPage: false,
    });

    const styles = [ 'Default', 'Serif', 'Mono' ];
    const text = ['Small text', 'Full width'];
    const page = [
        { label: 'Customize page', icon: IconCustomize, type: 0 },
        { label: state.isLockedPage ? 'Unlock page' : 'Lock page', icon: state.isLockedPage ? IconUnlock : IconLock, type: 1 },
    ];
    const action1 = [
        { label: 'Get notified', icon: IconNotification, type: 0 },
        { label: 'Copy link', icon: IconLink, type: 1 },
        { label: 'Duplicate', icon: IconDuplicate, type: 2 },
        { label: 'Open in side peek', icon: IconPeekModeSide, type: 3 },
    ];
    const action2 = [
        { label: 'Undo', icon: IconUndo, type: 0 },
        { label: 'Page history', icon: IconHistory, type: 1 },
        { label: 'Page analytics', icon: IconAnalyticsSearch, type: 2 },
        { label: 'Show deleted page', icon: IconShowDeletedPage, type: 3 },
        { label: 'Delete', icon: IconDelete, type: 4 },
    ];
    const action3 = [
        { label: 'Import', icon: IconImport },
        { label: 'Export', icon: IconExport },
    ];

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                handlePageSettingPopUp();
            };
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    },[]);

    const handleChangeTextOption = (e, item) => {
        console.log(item, e.target.checked);
    };

    const handlePageOption = (type) => {
        if (type === 1) {
            setState(prev => ({...prev, isLockedPage: !prev.isLockedPage}));
        };
    };

    const handleAction1 = (type) => {

    };

    const classNameAction = "flex py-1 px-3 cursor-pointer items-center justify-between my-[2px] hover:bg-[rgb(239,239,239)]";

    // transition-property: opacity, transform;
    // transition-duration: 270ms;
    // transition-timing-function: ease;
    return (
        <div 
            className="w-[240px] bg-white rounded-md overflow-y-auto scrollbar-hide border border-[rgb(213,213,213)] shadow-md" 
            style={{height: 'calc(100vh - 150px)'}}
        >
            <div className="w-full p-3 flex flex-col border-b border-[rgb(219,219,219)]">
                <div className="text-xs font-medium opacity-50 mb-3">Style</div>
                <div className="grid grid-cols-3">
                    {styles.map((item, index) => {
                        return (
                            <div key={`pop-up-page-setting-styles-${index}`} className="flex flex-col cursor-pointer items-center justify-center p-2 rounded-md hover:bg-[rgb(239,239,239)]">
                                <div className={`text-2xl font-medium mb-1 ${index === 0 ? 'text-[rgb(35,131,226)]' : ''}`}>Ag</div>
                                <div className="text-xs">{item}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="w-full py-3 flex flex-col border-b border-[rgb(219,219,219)]">
                {text.map((item, index) => {
                    return (
                        <div key={`pop-up-page-setting-text-${index}`} className="flex py-1 px-3 cursor-pointer items-center justify-between hover:bg-[rgb(239,239,239)]">
                            <div className="text-sm font-medium">{item}</div>
                            <div className="flex items-center">      
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input onChange={(e) => handleChangeTextOption(e, item)} type="checkbox" value="" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>

                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="w-full py-3 flex flex-col border-b border-[rgb(219,219,219)]">
                {page.map((item, index) => {
                    return (
                        <div onClick={() => handlePageOption(item.type)} key={`pop-up-page-setting-page-${index}`} className="flex py-1 px-3 cursor-pointer items-center hover:bg-[rgb(239,239,239)]">
                            <item.icon className="mr-3"/>
                            <div className="text-sm font-medium select-none">{item.label}</div>
                        </div>
                    )
                })}
            </div>
            <div className="w-full py-3 flex flex-col border-b border-[rgb(219,219,219)]">
                {action1.map((item, index) => {
                    return (
                        <div onClick={() => handleAction1(item.type)} key={`pop-up-page-setting-action1-${index}`} className={classNameAction}>
                            <div className="flex items-center">
                                <item.icon className="mr-3"/>
                                <div className="text-sm font-medium select-none">{item.label}</div>
                            </div>
                            <div className="">
                                {item.type === 0 && (
                                    <IconRight />
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="w-full py-3 flex flex-col border-b border-[rgb(219,219,219)]">
                {action2.map((item, index) => {
                    return (
                        <div onClick={() => handleAction1(item.type)} key={`pop-up-page-setting-action1-${index}`} className={classNameAction}>
                            <div className="flex items-center">
                                <item.icon className="mr-3"/>
                                <div className="text-sm font-medium select-none">{item.label}</div>
                            </div>
                            <div className="">
                                {item.type === 2 && (
                                    <IconRight />
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="w-full py-3 flex flex-col border-b border-[rgb(219,219,219)]">
                {action3.map((item, index) => {
                    return (
                        <div onClick={() => handleAction1(item.type)} key={`pop-up-page-setting-action1-${index}`} className={classNameAction}>
                            <div className="flex items-center">
                                <item.icon className="mr-3"/>
                                <div className="text-sm font-medium select-none">{item.label}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="w-full py-3 flex flex-col">
                <div className={`${classNameAction} text-xs opacity-50 font-medium select-none`}>
                    {`Word count: 123`}
                </div>
                <div className={`${classNameAction} text-xs opacity-50 font-medium select-none`}>
                    {`Last edited by ytn`}
                </div>
                <div className={`${classNameAction} text-xs opacity-50 font-medium select-none`}>
                    {`Yesterday at 14:23`}
                </div>
            </div>
        </div>
    );
});

export default PopUpPageSetting;