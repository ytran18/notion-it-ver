import React, { useRef, useEffect, useState } from "react";

import MyAccount from "./MyAccount";
import MySetting from "./MySetting";
import MyNotification from "./MyNotification";
import MyConnection from "./MyConnection";
import LanguageAndRegion from "./LanguageAndRegion";

import { getRandomColor, createImageFromInitials } from "core/functions";

import { ReactComponent as IconDefaultAvatar } from 'assets/icons/iconDefaultAvatar.svg';
import { ReactComponent as IconSettings } from 'assets/icons/iconSettingsTab.svg';
import { ReactComponent as IconNotification } from 'assets/icons/iconSettingsNotification.svg';
import { ReactComponent as IconSettingConnection } from 'assets/icons/iconSettingConnection.svg';
import { ReactComponent as IconLanguage } from 'assets/icons/iconLanguage.svg';

const ModalSetting = (props) => {

    const { handleModalUser, currUser } = props;

    const modalRef = useRef(null);

    const [state, setState] = useState({
        tab: 0,
        avatar_src: ``,
    });
    
    useEffect(() => {
        const avatar_src = currUser?.avatar_url?.length > 0 ? currUser?.avatar_url : createImageFromInitials(500, currUser?.display_name, getRandomColor());
        setState(prev => ({...prev, avatar_src: avatar_src}));
    },[]);

    const settings = [
        { label: 'My account', icon: IconDefaultAvatar, tab: 0 },
        { label: 'My settings', icon: IconSettings, tab: 1 },
        { label: 'My notifications', icon: IconNotification, tab: 2 },
        { label: 'My connections', icon: IconSettingConnection, tab: 3 },
        { label: 'Language & region', icon: IconLanguage, tab: 4 },
    ];

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                handleModalUser(3);
            };
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    },[]);

    const handleChangeTab = (tab) => {
        setState(prev => ({...prev, tab: tab}));
    };

    const renderTab = {
        0: <MyAccount avatar_src={state.avatar_src} currUser={currUser}/>,
        1: <MySetting />,
        2: <MyNotification />,
        3: <MyConnection />,
        4: <LanguageAndRegion />
    }[state.tab]; 

    return (
        <div className="fixed w-screen h-screen top-0 left-0 bottom-0 right-0 bg-[rgb(89,89,89)] bg-opacity-90 flex justify-center items-center drop-shadow-2xl shadow-2xl z-[120]">
            <div ref={modalRef} className="w-4/5 p-1 flex h-4/5 bg-white rounded-lg shadow-md">
                <div className="flex flex-col p-2 bg-[rgb(251,252,250)]">
                    <div className="text-xs font-medium mb-2">Account</div>
                    <div className="text-xs font-medium mb-2 flex items-center cursor-default">
                        <img src={state.avatar_src} className="w-[22px] rounded-full mr-2"/>
                        <div className="flex flex-col">
                            <div className="text-xs font-medium">{currUser?.display_name}</div>
                            <div className="text-xs opacity-50">{currUser?.email}</div>
                        </div>
                    </div>
                    <div className="">
                        {settings.map((item, index) => {
                            return (
                                <div
                                    onClick={() => handleChangeTab(item.tab)}
                                    className={`flex ${state.tab === item.tab ? 'bg-[rgb(235,235,234)]' : ''} hover:bg-[rgb(235,235,234)] p-[2px] cursor-pointer rounded-md items-center`} 
                                    key={`modal-setting-items-${index}`}
                                >
                                    <div className="p-[2px]">
                                        <item.icon className="mr-2"/>
                                    </div>
                                    <div className="text-xs">{item.label}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="py-6 px-10 flex-1">
                    {renderTab}
                </div>
            </div>
        </div>
    );
};

export default ModalSetting;