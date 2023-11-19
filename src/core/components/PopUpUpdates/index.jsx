import React, { useRef, useEffect, useState } from "react";

import Inbox from "./Inbox";
import Archived from "./Archived";
import All from "./All";

import { ReactComponent as IconFilterCircle } from 'assets/icons/iconFilterCircle.svg';
import { ReactComponent as IconSettings } from 'assets/icons/iconSettings.svg';
import { ReactComponent as IconHelp } from 'assets/icons/iconHelp.svg';

const PopUpUpdates = React.forwardRef((props, ref) => {

    const { handleModalUser } = props;

    const [state, setState] = useState({
        tab: 0,
    });

    const popupRef = useRef(null);

    const tabsTitle = [
        { lable: 'Inbox', type: 0 },
        { lable: 'Archived', type: 1 },
        { lable: 'All', type: 2 },
    ];

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (Boolean(ref.current) && ref.current.contains(e.target)) {
                return;
            }
            if (Boolean(popupRef.current) && !popupRef.current.contains(e.target)){
                handleModalUser(2);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    },[]);

    const handleChangeTab = (tab) => {
        setState(prev => ({...prev, tab: tab}));
    };

    const borderWidth = (tab) => {
        const width = {
            0: 'w-[30px]',
            1: 'w-[40px]',
            2: 'w-[25px]',
        }[tab];
        return width;
    };

    const renderTab = {
        0: <Inbox />,
        1: <Archived />,
        2: <All />
    }[state.tab];

    return (
        <div
            ref={popupRef}
            className="w-[500px] h-[280px] flex flex-col bg-white rounded-md border border-[rgb(231,231,231)]"
            style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}
        >
            <div className="p-2 flex items-center relative justify-between border-b border-[rgb(219,219,219)]">
                <div className="flex items-center">
                    {tabsTitle.map((item, index) => {
                        return (
                            <div
                                onClick={() => handleChangeTab(item.type)}
                                className={`px-2 hover:bg-[rgb(239,239,239)] p-[2px] rounded flex flex-col items-center text-sm ${index === 1 ? 'border-r' : ''}`} key={`pop-up-updates-${index}`}
                            >
                                {item.lable}
                                {state.tab === item.type && (
                                    <div className={` ${borderWidth(item.type)} absolute bottom-0 h-[2px] bg-black`}></div>
                                )}
                            </div>
                        )
                    })}
                    <div className="hover:bg-[rgb(239,239,239)] p-[2px] rounded"> <IconHelp /> </div>
                </div>
                <div className="flex items-center">
                    <div className="p-[2px] hover:bg-[rgb(239,239,239)] mx-2 rounded">
                        <IconFilterCircle />
                    </div>
                    <div className="p-[2px] hover:bg-[rgb(239,239,239)] rounded">
                        <IconSettings />
                    </div>
                </div>
            </div>
            <div className="p-2 w-full">
                {renderTab}
            </div>
        </div>
    );
});

export default PopUpUpdates;