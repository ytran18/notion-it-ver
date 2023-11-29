import React, { useState, useEffect } from "react";

import All from "./All";
import CurrentPage from "./CurrentPage";
import LastEdited from "./LastEdited";

const PopUpTrash = React.forwardRef((props, ref) => {

    const { handleFooterAction, deletedPages, handleTrash } = props;

    const [state, setState] = useState({
        tab: 0
    });

    const tabs = [
        { label: 'All pages', type: 0 },
        { label: 'In current pages', type: 1 },
        { label: 'Last edited by me', type: 2 },
    ];

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                handleFooterAction(3, 'popup');
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

    const renderTab = {
        0: <All deletedPages={deletedPages} handleTrash={handleTrash} />,
        1: <CurrentPage />,
        2: <LastEdited />
    }[state.tab] || 0;

    const renderWidth = {
        0: 'w-[60px]',
        1: 'w-[100px]',
        2: 'w-[110px]',
    }[state.tab] || 0;

    return (
        <div 
            className="w-[414px] cursor-default flex flex-col fixed bottom-3 z-[999] border-[rgb(219,219,219)] rounded-md min-w-[180px] h-[50vh] max-h-[70vh] bg-white"
            style={{boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'}}
        >
            <div className="flex relative items-center p-1 border-b border-[rgb(237,237,236)]">
                {tabs.map((item, index) => {
                    return (
                        <div className="flex flex-col items-center" key={`pop-up-trash-${index}`}>
                            <div
                                onClick={() => handleChangeTab(item.type)}
                                className="text-sm px-3 py-1 cursor-pointer hover:bg-[rgb(239,239,239)] rounded" 
                            >
                                {item.label}
                            </div>
                            {state.tab === item.type && (
                                <div className={`absolute bottom-0 ${renderWidth} h-[2px] bg-black`}></div>
                            )}
                        </div>
                    )
                })}
            </div>
            <div className="p-1">
                {renderTab}
            </div>
        </div>
    );
});

export default PopUpTrash;