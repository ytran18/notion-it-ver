import React, { useState, useEffect, useRef } from "react";

import PageTree from "core/ui/PageTree";
import ModalUser from "core/components/ModalUser";
import ModalSearch from "core/components/ModalSearch";
import ModalSetting from "core/components/ModalSetting";
import PopUpUpdates from "core/components/PopUpUpdates";

import { useUserPackageHook } from "core/redux/hooks";

import { ReactComponent as IconDoubleLeft } from 'assets/icons/iconDoubleLeft.svg';
import { ReactComponent as IconDefaultAvatar } from 'assets/icons/iconIdentification.svg';
import { ReactComponent as IconSearch } from 'assets/icons/iconSearch.svg';
import { ReactComponent as IconClock } from 'assets/icons/iconClock.svg';
import { ReactComponent as IconSettings } from 'assets/icons/iconSettings.svg';
import { ReactComponent as IconNewCircle } from 'assets/icons/iconPlusCircleSolid.svg';
import { ReactComponent as IconPlusSmall } from 'assets/icons/iconPlusSmall.svg';
import { ReactComponent as IconTeamSpace } from 'assets/icons/iconTeamSpace.svg';
import { ReactComponent as IconTemplate } from 'assets/icons/iconTemplate.svg';
import { ReactComponent as IconImport } from 'assets/icons/iconImport.svg';
import { ReactComponent as IconTrash } from 'assets/icons/iconTrash.svg';

import { privatePage, workspace, shared } from 'assets/dummy';

import './sidebar.css';

const Sidebar = (props) => {

    const { pages, handleSelectPage } = props;

    const [state, setState] = useState({
        isVisibleIcon: false,
        isScroll: false,
        isVisibleModalUser: false,
        isVisiableModalSearch: false,
        isVisiablePopupUpdate: false,
        isVisiableModalSetting: false,
        isVisiableModalNewpage: false,
    });

    const currUser = useUserPackageHook();
    const popUpUserRef = useRef(null);
    const popUpUpdatesRef = useRef(null);

    const HeaderTopItem = [
        { label: `${currUser?.display_name}'s Notion`, icon: IconDefaultAvatar, type: 0 },
        { label: `Search`, icon: IconSearch, type: 1 },
        { label: `Updates`, icon: IconClock, type: 2 },
        { label: `Settings & members`, icon: IconSettings, type: 3 },
        { label: `New page`, icon: IconNewCircle, type: 4 },
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

    const handleModalUser = (type, log) => {
        const modal = {
            0: 'isVisibleModalUser',
            1: 'isVisiableModalSearch',
            2: 'isVisiablePopupUpdate',
            3: 'isVisiableModalSetting',
            4: 'isVisiableModalNewpage',
        }[type];

        if (log === 'outside' && state[modal] || log === 'modal') {
            return;
        };

        setState(prev => ({...prev, [modal]: !prev[modal]}));
    };

    // const handleMouseEnter = () => {
    //     setState(prev => ({...prev, isVisibleIcon: true}));
    // };

    // const handleMouseLeave = () => {
    //     setState(prev => ({...prev, isVisibleIcon: false}));
    // };

    const sidebarHeaderRef = (type) => {
        const ref = {
            0: popUpUserRef,
            2: popUpUpdatesRef,
        }[type];
        return ref;
    };

    const classNameTopSidebarItem = 'w-full flex select-none relative items-center hover:bg-[rgb(232,232,230)] rounded-md p-1 cursor-pointer';

    return (
        <>
            <div
                className="w-full z-0 h-full sidebar bg-[rgb(247,247,245)] border-r border-[rgb(241,241,239)]"
                // onMouseEnter={handleMouseEnter}
                // onMouseLeave={handleMouseLeave}
            >
                <div className={`w-full py-2 px-2 ${state.isScroll ? 'border-b-[2px] border-[rgb(238,238,236)]' : ''}`}>
                    <div className="w-full flex justify-end cursor-pointer mb-4">
                        <div className="hover:bg-[rgb(232,232,230)] p-[2px] rounded-md">
                            <IconDoubleLeft />
                        </div>
                    </div>
                    <div className="w-full flex flex-col mb-4">
                        {HeaderTopItem.map((item, index) => {
                            return (
                                <div ref={sidebarHeaderRef(item.type)} onClick={() => handleModalUser(item.type, 'outside')} className={classNameTopSidebarItem} key={`sidebar-top-item-${index}`}>
                                    <div className="mr-2">
                                        <item.icon />
                                    </div>
                                    <div className={`text-[13px] font-medium`}>{item.label}</div>
                                    {state.isVisibleModalUser && item.type === 0 && (
                                        <div className="absolute z-50 top-full">
                                            <ModalUser handleModalUser={handleModalUser} currUser={currUser} ref={popUpUserRef}/>
                                        </div>
                                    )}
                                    {state.isVisiablePopupUpdate && item.type === 2 && (
                                        <div className="absolute z-50 top-0 left-full">
                                            <PopUpUpdates handleModalUser={handleModalUser} ref={popUpUpdatesRef}/>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="w-full overflow-y-auto scrollbar-hide py-2 px-2 sidebar-bottom" id="sidebar-bottom">
                    {/* Workspace */}
                    <div className="w-full flex justify-between">
                        <div className="text-[rgb(150,150,146)] text-[13px] select-none cursor-pointer hover:text-[#333]">Workspace</div>
                        <div className="hover:bg-[rgb(232,232,230)] p-[2px] rounded-md cursor-pointer">
                            <IconPlusSmall />
                        </div>
                    </div>
                    {/* item workspace */}
                    <div className="mb-4">
                        {/* {workspace.map((item, index) => {
                            return (
                                <div className="" key={`item-workspace-${index}`}>
                                    <PageTree entry={item}/>
                                </div>
                            )
                        })} */}
                    </div>
                    {/* Shared */}
                    <div className="w-full flex justify-between">
                        <div className="text-[rgb(150,150,146)] text-[13px] select-none cursor-pointer hover:text-[#333]">Shared</div>
                    </div>
                    {/* item shared */}
                    <div className="mb-4">
                        {/* {shared.map((item, index) => {
                            return (
                                <div className="" key={`item-shared-${index}`}>
                                    <PageTree entry={item}/>
                                </div>
                            )
                        })} */}
                    </div>
                    {/* Private */}
                    <div className="w-full flex justify-between">
                        <div className="text-[rgb(150,150,146)] text-[13px] select-none cursor-pointer hover:text-[#333]">Private</div>
                        <div className="hover:bg-[rgb(232,232,230)] p-[2px] rounded-md cursor-pointer">
                            <IconPlusSmall />
                        </div>
                    </div>
                    {/* item private */}
                    <div className="mb-4">
                        { pages.map((item, index) => {
                            return (
                                <div className="" key={`item-private-${index}`}>
                                    <PageTree entry={item} handleSelectPage={handleSelectPage}/>
                                </div>
                            )
                        }) }
                    </div>
                    <div className="">
                        {ItemFooterSidebar.map((item, index) => {
                            return (
                                <div className={classNameTopSidebarItem} key={`sidebar-footer-item-${index}`}>
                                    <div className="mr-2 flex justify-center">
                                        <item.icon />
                                    </div>
                                    <div className={`select-none text-[13px] font-medium`}>{item.label}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            {state.isVisiableModalSearch && (
                <ModalSearch handleModalUser={handleModalUser}/>
            )}
            {state.isVisiableModalSetting && (
                <ModalSetting handleModalUser={handleModalUser} currUser={currUser}/>
            )}
        </>
    );
};

export default Sidebar;