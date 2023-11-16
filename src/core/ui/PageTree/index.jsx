import React, { useState } from "react";

import { ReactComponent as IconRight } from 'assets/icons/iconRight.svg';
import { ReactComponent as IconDown } from 'assets/icons/iconArrowDown.svg';
import { ReactComponent as IconDocument } from 'assets/icons/iconDocument.svg';

const PageTree = (props) => {

    const { entry, depth } = props;

    const [state, setState] = useState({
        isExpanded: false,
    });

    const renderIcon = (icon) => {
        if (icon === '') return <IconDocument />
        const emojiCodePoint = parseInt(icon, 16);
        const emoji = String.fromCodePoint(emojiCodePoint);
        return emoji;
    };

    const handleExpandItem = () => {
        setState(prev => ({...prev, isExpanded: !prev.isExpanded}));
    };

    return (
        <div className="w-full h-full">
            <div className="w-full flex items-center hover:bg-[rgb(232,232,230)] rounded-md p-1 cursor-pointer">
                <div onClick={handleExpandItem} className="mr-2">
                    {state.isExpanded ? (
                        <IconDown className="hover:bg-[rgb(209,209,208)] transition-all duration-200"/>
                    ) : (
                        <IconRight className="hover:bg-[rgb(209,209,208)] transition-all duration-200"/>
                    )}
                </div>
                <div className="text-[13px] font-medium flex items-center">
                    <div className="mr-2 flex justify-center items-center text-[13px] select-none">
                        {renderIcon(entry?.icon)}
                    </div>
                    <div className="truncate select-none">
                        {entry?.name}
                    </div>
                </div>
            </div>
            {state.isExpanded && entry?.children?.length > 0 && (
                <div className="pl-5 w-full flex flex-col">
                    {entry.children.map((childEntry, index) => (
                        <PageTree key={index} entry={childEntry} depth={depth + 1} />
                    ))}
                </div>
            )}
            {state.isExpanded && !(entry?.children?.length > 0) && (
                <div className="w-full text-[13px] font-medium opacity-60 select-none cursor-default">No pages inside</div>
            )}
        </div>
    );
};

export default PageTree;