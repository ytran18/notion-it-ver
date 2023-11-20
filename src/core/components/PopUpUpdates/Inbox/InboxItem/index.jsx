import React, { useState } from "react";

import { getHoursAgo } from "core/functions";

import { ReactComponent as IconNotificationsRead } from 'assets/icons/iconNotificationsRead.svg';
import { ReactComponent as IconArchive } from 'assets/icons/iconArchive.svg';
import { ReactComponent as IconMore } from 'assets/icons/iconMore.svg';

// test
const imgSrc = 'https://lh3.googleusercontent.com/a/ACg8ocIsYVVjXmItPPEpsy_Td4La9MnmrcOrTO2cfcRJb6l8=s100';

const InboxItem = (props) => {

    const { data } = props;

    const [state, setState] = useState({
        isVisibleOption: false,
    });
    
    const handleMouseEnter = () => {
        setState(prev => ({...prev, isVisibleOption: true}));
    };
    
    const handleMouseLeave = () => {
        setState(prev => ({...prev, isVisibleOption: false}));
    };

    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`w-full flex p-1 mb-2 relative cursor-default ${data.isReaded ? 'opacity-70' : 'opacity-100'}`}
        >
            <div className={`absolute ${state.isVisibleOption ? 'opacity-100' : 'opacity-0'} transition-opacity duration-[200ms] py-[1px] px-[2px] flex items-center right-0 top-0 border border-[rgb(219,219,219)] shadow-md rounded-md`}>
                <div className="p-[1px] hover:bg-[rgb(239,239,239)] cursor-pointer">
                    <IconNotificationsRead className=""/>
                </div>
                <div className="p-[1px] mx-[2px] hover:bg-[rgb(239,239,239)] cursor-pointer">
                    <IconArchive className=""/>
                </div>
                <div className="p-[1px] hover:bg-[rgb(239,239,239)] cursor-pointer">
                    <IconMore className="text-[rgb(198,198,196)]"/>
                </div>
            </div>
            <div className="mr-2 h-[24px] relative">
                <img src={imgSrc} className="w-[24px] rounded-full"/>
                {!data.isReaded && (
                    <div className="absolute top-1/2 -translate-y-1/2 right-[110%] w-[6px] h-[6px] bg-blue-600 rounded-full"></div>
                )}
            </div>
            <div className="flex flex-col">
                <div className="text-xs font-normal mb-3 cursor-text">
                    <span className="font-semibold">ytn </span> 
                    {`and you commented on this page `}
                    <span className="font-medium opacity-50 ml-2">{`${getHoursAgo(data?.createdAt)}`}</span>
                </div>
                <div className="text-xs font-medium opacity-50">{data.path}</div>
                <div className="mb-3"></div>
                <div className="">
                    {data?.comment?.map((item, index) => {
                        return (
                            <div className="flex flex-col text-xs mb-2" key={item.comment_id}>
                                <div className="font-medium opacity-60">ytn</div>
                                <div className="font-semibold">{item.content}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default InboxItem;