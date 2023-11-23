import React, { useState, useRef, useEffect } from "react";

import Gallery from "./Gallery";
import Link from "./Link";
import Upload from "./Upload";

import './modalCoverBg.css';

const ModalBackgroundCover = (props) => {

    const { handleModalCover, handleChangeBg } = props;

    const modalRef = useRef(null);

    const [state, setState] = useState({
        tab: 0,
    });

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                handleModalCover();
            };
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    },[])

    const tab = [
        { label: 'Gallery', tab: 0 },
        { label: 'Upload', tab: 1 },
        { label: 'Link', tab: 2 },
    ];

    const handleChangeTab = (tab) => {
        setState(prev => ({...prev, tab: tab}));
    };

    const bottom = {
        0: '-bottom-[460px]',
        1: '-bottom-[96px]',
        2: '-bottom-[136px]',
    }[state.tab] || 0;

    const renderTab = {
        0: <Gallery handleChangeBg={handleChangeBg}/>,
        1: <Upload />,
        2: <Link />,
    }[state.tab] || 0;

    const classNameTab = 'text-sm cursor-pointer flex flex-col items-center hover:bg-[rgb(239,239,239)] py-1 px-2 rounded-md';

    return (
        <div ref={modalRef} className={`flex z-[999] ${bottom} flex-col absolute right-10 bg-white shadow-lg w-[540px] min-w-[180px] ${state.tab === 0 ? 'h-[485px]' : 'h-auto'} max-h-[485px] modal-background-cover rounded-md`}>
            <div className="w-full p-2 border-b relative flex justify-between items-center">
                <div className="flex items-center">
                    {
                        tab.map((item, index) => {
                            return (
                                <div 
                                    onClick={() => handleChangeTab(item.tab)}
                                    className={`${classNameTab} ${item.tab === 1 ? 'mx-3' : ''}`} key={`modal-tab-${index}`}
                                >
                                    {item.label}
                                    {state.tab === item.tab && (
                                        <div className={`absolute bottom-0 bg-black h-[2px] ${item.tab === 2 ? 'w-[30px]' : 'w-[45px]'}`}></div>
                                    )}
                                </div>
                            )
                        })
                    }
                </div>
                <div 
                    className={`${classNameTab}`}
                    onClick={() => handleModalCover('remove')}
                >
                    Remove
                </div>
            </div>
            <div className="w-full p-2 overflow-y-auto">
                {renderTab}
            </div>
        </div>
    );
};

export default ModalBackgroundCover;