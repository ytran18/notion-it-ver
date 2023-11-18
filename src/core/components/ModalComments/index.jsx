import React, { useState, useRef } from "react";

import PopUpComment from "./PopupComment";

import { ReactComponent as IconArrowDown } from 'assets/icons/iconArrowDown.svg';
import { ReactComponent as IconCommentZero } from 'assets/icons/iconCommentZero.svg';

const ModalComments = () => {

    const [state, setState] = useState({
        isVisiblePopUp: false,
    });

    const handlePopUp = () => {
        setState(prev => ({...prev, isVisiblePopUp: !prev.isVisiblePopUp}));
    };

    return (
        <div className="w-[385px] flex pt-10 flex-col h-screen bg-white border-l border-[rgb(219,219,219)]">
            <div className="w-full p-3 flex border-b border-[rgb(219,219,219)] justify-between items-center">
                <div className="font-medium text-sm">Comments</div>
                <div onClick={handlePopUp} className="px-2 py-1 relative rounded flex items-center opacity-70 hover:bg-[rgb(237,237,237)]">
                    <div className="text-sm select-none">Open</div>
                    <IconArrowDown className="transform scale-75"/>
                    {state.isVisiblePopUp && (
                        <div className="absolute top-full right-0 z-[200]">
                            <PopUpComment />
                        </div>
                    )}
                </div>
            </div>
            <div className="flex-1 w-full flex flex-col items-center justify-center">
                <IconCommentZero />
                <div className="font-semibold text-sm opacity-60 mb-1">No open comment yet</div>
                <div className="text-sm opacity-50">Open comments on this page</div>
                <div className="text-sm opacity-50">will appear here</div>
            </div>
        </div>
    );
};

export default ModalComments;