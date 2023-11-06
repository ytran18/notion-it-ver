import React, { useState, useEffect } from "react";

import { ReactComponent as IconDoubleLeft } from 'assets/icons/iconDoubleLeft.svg';
import { ReactComponent as IconDefaultAvatar } from 'assets/icons/iconIdentification.svg';
import { ReactComponent as IconSearch } from 'assets/icons/iconSearch.svg';
import { ReactComponent as IconClock } from 'assets/icons/iconClock.svg';
import { ReactComponent as IconSettings } from 'assets/icons/iconSettings.svg';
import { ReactComponent as IconNewCircle } from 'assets/icons/iconPlusCircleSolid.svg';
import { ReactComponent as IconPlusSmall } from 'assets/icons/iconPlusSmall.svg';
import { ReactComponent as IconDocument } from 'assets/icons/iconDocument.svg';
import { ReactComponent as IconRight } from 'assets/icons/iconRight.svg';
import { ReactComponent as IconTeamSpace } from 'assets/icons/iconTeamSpace.svg';
import { ReactComponent as IconTemplate } from 'assets/icons/iconTemplate.svg';
import { ReactComponent as IconImport } from 'assets/icons/iconImport.svg';
import { ReactComponent as IconTrash } from 'assets/icons/iconTrash.svg';

import './sidebar.css';

const Sidebar = () => {

    const [state, setState] = useState({
        isVisibleIcon: false,
        isScroll: false,
    });

    const HeaderTopItem = [
        { label: `Roy's Notion`, icon: IconDefaultAvatar, type: 0 },
        { label: `Search`, icon: IconSearch, type: 1 },
        { label: `Updates`, icon: IconClock, type: 1 },
        { label: `Settings & members`, icon: IconSettings, type: 1 },
        { label: `New page`, icon: IconNewCircle, type: 1 },
    ];

    const ItemWorkSpace = [
        { label: 'Quỷ đỏ', icon: IconDocument },
    ];

    const ItemShare = [
        { label: 'Project Management', icon: IconDocument },
    ];

    const ItemPrivate = [
        { label: 'Untitled', icon: IconDocument },
        { label: 'Music', icon: IconDocument },
        { label: 'Nam', icon: IconDocument },
        { label: 'bug web', icon: IconDocument },
        { label: 'HR Future', icon: IconDocument },
        { label: 'Project Management', icon: IconDocument },
        { label: 'Memory Vest', icon: IconDocument },
        { label: 'Road', icon: IconDocument },
        { label: 'Aggregate', icon: IconDocument },
        { label: 'Dairy todo', icon: IconDocument },
        { label: 'Test 1', icon: IconDocument },
        { label: 'Test 2', icon: IconDocument },
        { label: 'Test 3', icon: IconDocument },
        { label: 'Test 4', icon: IconDocument },
        { label: 'Test 5', icon: IconDocument },
        { label: 'Test 6', icon: IconDocument },
        { label: 'Test 7', icon: IconDocument },
        { label: 'Test 8', icon: IconDocument },
        { label: 'Test 9', icon: IconDocument },
        { label: 'Test 10', icon: IconDocument },
    ];

    const ItemFooterSidebar = [
        { label: 'Create a teamspace', icon: IconTeamSpace },
        { label: 'Templates', icon: IconTemplate },
        { label: 'Import', icon: IconImport },
        { label: 'Trash', icon: IconTrash },
    ];

    useEffect(() => {
        const scrollElement = document.getElementById('sidebar-bottom');
    
        function handleScroll() {
            if (scrollElement.scrollTop > 0) {
                setState(prev => ({...prev, isScroll: true}));
            } else {
                setState(prev => ({...prev, isScroll: false}));
            }
        };
    
        if (scrollElement) {
            scrollElement.addEventListener('scroll', handleScroll);
        };
    
        return () => {
            scrollElement.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleMouseEnter = () => {
        setState(prev => ({...prev, isVisibleIcon: true}));
    };

    const handleMouseLeave = () => {
        setState(prev => ({...prev, isVisibleIcon: false}));
    };

    const classNameTopSidebarItem = 'w-full flex items-center hover:bg-[rgb(232,232,230)] rounded-md p-1 cursor-pointer';

    return (
        <div
            className="w-full h-full sidebar bg-[rgb(247,247,245)] border-r border-[rgb(241,241,239)]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className={`w-full py-2 px-2 ${state.isScroll ? 'border-b-[2px] border-[rgb(238,238,236)]' : ''}`}>
                <div className="w-full flex justify-end cursor-pointer mb-4">
                    <div className="hover:bg-[rgb(232,232,230)] p-[2px] rounded-md">
                        <IconDoubleLeft className={`${state.isVisibleIcon ? 'visible' : 'invisible'}`}/>
                    </div>
                </div>
                <div className="w-full flex flex-col mb-4">
                    {HeaderTopItem.map((item, index) => {
                        return (
                            <div className={classNameTopSidebarItem} key={`sidebar-top-item-${index}`}>
                                <div className="w-[15%]">
                                    <item.icon /> 
                                </div>
                                <div className={`w-[85%] text-[13px] ${item.type === 0 ? 'font-medium' : 'font-normal'}`}>{item.label}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="w-full overflow-y-auto py-2 px-2 sidebar-bottom" id="sidebar-bottom">
                {/* Workspace */}
                <div className="w-full flex justify-between">
                    <div className="text-[rgb(150,150,146)] text-[13px] cursor-pointer hover:text-[#333]">Workspace</div>
                    <div className="hover:bg-[rgb(232,232,230)] p-[2px] rounded-md cursor-pointer">
                        <IconPlusSmall className={`${state.isVisibleIcon ? 'visible' : 'invisible'}`}/>
                    </div>
                </div>
                {/* item workspace */}
                <div className="mb-4">
                    {ItemWorkSpace.map((item, index) => {
                        return (
                            <div className={classNameTopSidebarItem} key={`item-workspace-${index}`}>
                                <div className="w-[10%]">
                                    <IconRight />
                                </div>
                                <div className="w-[90%] text-[13px] flex items-center truncate">
                                    <item.icon className="mr-1"/>
                                    {item.label}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Shared */}
                <div className="w-full flex justify-between">
                    <div className="text-[rgb(150,150,146)] text-[13px] cursor-pointer hover:text-[#333]">Shared</div>
                </div>
                {/* item shared */}
                <div className="mb-4">
                    {ItemShare.map((item, index) => {
                        return (
                            <div className={classNameTopSidebarItem} key={`item-shared-${index}`}>
                                <div className="w-[10%]">
                                    <IconRight />
                                </div>
                                <div className="w-[90%] text-[13px] flex items-center truncate">
                                    <item.icon className="mr-1"/>
                                    {item.label}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Private */}
                <div className="w-full flex justify-between">
                    <div className="text-[rgb(150,150,146)] text-[13px] cursor-pointer hover:text-[#333]">Private</div>
                    <div className="hover:bg-[rgb(232,232,230)] p-[2px] rounded-md cursor-pointer">
                        <IconPlusSmall className={`${state.isVisibleIcon ? 'visible' : 'invisible'}`}/>
                    </div>
                </div>
                {/* item private */}
                <div className="mb-4">
                    {ItemPrivate.map((item, index) => {
                        return (
                            <div className={classNameTopSidebarItem} key={`item-private-${index}`}>
                                <div className="w-[10%]">
                                    <IconRight />
                                </div>
                                <div className="w-[90%] text-[13px] flex items-center truncate">
                                    <item.icon className="mr-1"/>
                                    {item.label}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="">
                    {ItemFooterSidebar.map((item, index) => {
                        return (
                            <div className={classNameTopSidebarItem} key={`sidebar-footer-item-${index}`}>
                                <div className="w-[15%] flex justify-center">
                                    <item.icon /> 
                                </div>
                                <div className={`w-[85%] text-[13px] ${item.type === 0 ? 'font-medium' : 'font-normal'}`}>{item.label}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;