import React, { useEffect, useState } from "react";

import { ReactComponent as IconCheck } from 'assets/icons/iconCheck.svg';

const PopUpComment = React.forwardRef((props, ref) => {

    const { handlePopUp } = props;

    const [state, setState] = useState({
        selected: 0,
    });

    const items = [
        { label: 'Open comments', type: 0 },
        { label: 'Resolves comments', type: 1 },
    ];

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                handlePopUp();
            };
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    },[]);

    const handleSelect = ( type ) => {
        setState(prev => ({...prev, selected: type}));
    };

    return (
        <div className="w-[182px] bg-white shadow-2xl border border-[rgb(233,233,233)] p-1 flex flex-col rounded-md">
            {items.map((item, index) => {
                return (
                    <div onClick={() => handleSelect(item.type)} className="w-full flex items-center justify-between p-2 text-sm font-medium rounded hover:bg-[rgb(239,239,239)]" key={`pop-up-comment-${index}`}>
                        <div className="text-xs">{item.label}</div>
                        {state.selected === item.type && (
                            <IconCheck className=""/>
                        )}
                    </div>
                )
            })}
        </div>
    );
});

export default PopUpComment;