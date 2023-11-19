import React from "react";

import InboxItem from "./InboxItem";

const Inbox = () => {

    const classNameItem = 'border border-[rgb(223,223,222)] p-[2px] text-sm flex items-center transition-all duration-200 opacity-70 justify-center hover:bg-[rgb(225,225,225)] rounded-md'

    return (
        <div className="w-full flex flex-col">
            <div className="grid grid-cols-2 gap-3">
                <div className={classNameItem}>Mark all as read</div>
                <div className={classNameItem}>Archive read</div>
            </div>
            <div className=""></div>
        </div>
    );
};

export default Inbox;