import React, { useRef, useEffect, useState } from "react";

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

import './emoji.css';

const ModalEmoji = (props) => {

    const { handleModalEmoji, onEmojiSelect } = props;

    const [state, setState] = useState({
        tab: 0, 
    });

    const modalRef = useRef(null);

    const tab = [
        { label: 'Emojis', tab: 0 },
        { label: 'Icons', tab: 1 },
        { label: 'Custom', tab: 2 },
    ];

    const categories = ['frequent', 'people', 'nature', 'foods', 'activity', 'places', 'objects', 'symbols', 'flags'];

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                handleModalEmoji('cancel');
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

    const classNameTab = 'text-sm cursor-pointer flex flex-col items-center hover:bg-[rgb(239,239,239)] py-1 px-2 rounded-md';

    return (
        <div ref={modalRef} className="w-full h-full flex flex-col z-30">
            <div className="w-full bg-white p-2 border-b relative flex justify-between items-center">
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
                                        <div className={`absolute bottom-0 bg-black h-[2px] w-[45px]`}></div>
                                    )}
                                </div>
                            )
                        })
                    }
                </div>
                <div 
                    className={`${classNameTab}`}
                    onClick={() => handleModalEmoji('remove')}
                >
                    Remove
                </div>
            </div>
            <Picker 
                data={data}
                previewPosition='none'
                theme='light'
                perLine='12'
                onEmojiSelect={onEmojiSelect}
                categories={categories}
                searchPosition='sticky'
                skinTonePosition='search'
                autoFocus='true'
                maxFrequentRows='9'
                navPosition='none'
            />
        </div>
    );
};

export default ModalEmoji;