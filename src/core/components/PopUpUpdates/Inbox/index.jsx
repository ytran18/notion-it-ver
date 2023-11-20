import React from "react";

import InboxItem from "./InboxItem";

import { inboxItem } from "assets/dummy";

const Inbox = () => {

    const classNameItem = 'border border-[rgb(223,223,222)] p-[2px] text-sm flex items-center transition-all duration-200 opacity-70 justify-center hover:bg-[rgb(225,225,225)] rounded-md'

    return (
        <div className="w-full flex flex-col h-full">
            <div className="grid grid-cols-2 gap-3 mb-3">
                <div className={classNameItem}>Mark all as read</div>
                <div className={classNameItem}>Archive read</div>
            </div>
            <div className="overflow-y-auto p-2 h-fit max-h-[500px]">
                {inboxItem.map((item, index) => {
                    return (
                        <div className="" key={item.update_id}>
                            <InboxItem data={item} />
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Inbox;