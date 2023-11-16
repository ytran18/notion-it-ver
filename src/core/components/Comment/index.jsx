import React, { useState } from "react";

import { ReactComponent as Avatar } from 'assets/icons/iconDefaultAvatar.svg';
import { ReactComponent as IconCircleUp } from 'assets/icons/iconCircleUp.svg';
import { ReactComponent as IconAttach } from 'assets/icons/iconAttach.svg';
import { ReactComponent as IconAl } from 'assets/icons/iconAl.svg';

const Comment = () => {

    const [state, setState] = useState({
        comment: '',
    });

    return (
        <div className="w-full h-9 flex items-center relative border-b border-[rgb(137,137,136)]">
            <div className="mr-2">
                <Avatar />
            </div>
            <input 
                type="text"
                value={state.comment}
                onChange={(e) => setState(prev => ({...prev, comment: e.target.value}))}
                className="w-full h-full pr-24 outline-none text-[13px] font-normal"
                placeholder="Add a comment ..."
            />
            <div className="absolute flex text-[rgb(176,175,173)] right-1 top-1/2 -translate-y-1/2">
                <IconAttach className="cursor-pointer hover:bg-[rgb(239,239,239)]"/>
                <IconAl className="mx-2 cursor-pointer hover:bg-[rgb(239,239,239)]"/>
                <IconCircleUp className={`cursor-pointer ${state.comment !== '' ? 'text-[rgb(36,131,226)] ' : 'text-[rgb(219,219,217)] '}`}/>
            </div>
        </div>
    );
};

export default Comment;