import React, { useState } from "react";

import Updates from "./Updates";
import Analytics from "./Alalytics";

import { ReactComponent as IconBell } from 'assets/icons/iconBell.svg';

const ModalHistory = (props) => {

    const [state, setState] = useState({
        tab: 0,
    });

    const tabs = [
        { label: 'Updates', tab: 0 },
        { label: 'Analytics', tab: 1 }
    ];

    const handleChangeTab = (tab) => {
        setState(prev => ({...prev, tab: tab}));
    };

    return (
        <div className="w-[385px] flex pt-10 flex-col h-screen bg-white border-l border-[rgb(219,219,219)]">
            <div className="p-3">
                <div className="text-sm font-medium mb-2 select-none">Page notification settings</div>
                <div className="relative">
                    <select defaultValue="All" id="small" className="block cursor-pointer w-full py-2 px-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500">
                        <option value="All" className="text-sm">All comments</option>
                        <option value="RAM">Replies and @mentions</option>
                    </select>
                    <IconBell className="absolute top-1/2 left-2 -translate-y-1/2"/>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex items-center border-b border-[rgb(237,237,236)]">
                    {tabs.map((item, index) => {
                        return (
                            <div onClick={() => handleChangeTab(item.tab)} className="flex relative flex-col items-center" key={`modal-history-tab-${index}`}>
                                <div className="text-sm mx-2 p-2 font-medium">
                                    {item.label}
                                </div>
                                {state.tab === item.tab && (
                                    <div className="w-[50px] absolute bottom-0 h-[2px] bg-black"></div>
                                )}
                            </div>
                        )
                    })}
                </div>
                {state.tab === 0 ? (
                    <Updates />
                ) : (
                    <Analytics />
                )}
            </div>
        </div>
    );
};

export default ModalHistory;