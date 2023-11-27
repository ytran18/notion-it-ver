import React, { useState, useRef, useEffect } from "react";

import { ReactComponent as IconSearch } from 'assets/icons/iconSearch.svg'; 
import { ReactComponent as IconDocument } from 'assets/icons/iconDocument.svg'; 
import { ReactComponent as IconUndo } from 'assets/icons/iconUndo.svg'; 
import { ReactComponent as IconDelete } from 'assets/icons/iconDelete.svg'; 

const All = (props) => {

    const { deletedPages, handleTrash } = props;

    const [state, setState] = useState({
        searchValue: '',
    });

    useEffect(() => {
        if (searchRef.current) {
            searchRef.current.focus();
        };
    },[]);

    const renderIcon = (icon) => {
        if (icon === '') return <IconDocument />
        const emojiCodePoint = parseInt(icon, 16);
        const emoji = String.fromCodePoint(emojiCodePoint);
        return emoji;
    };

    const searchRef = useRef(null);

    return (
        <div className="w-full flex flex-col p-1">
            <div className="flex items-center w-full mb-3">
                <IconSearch className="mr-2"/>
                <div className="w-full h-8 border border-[rgb(224,224,222)] rounded">
                    <input 
                        type="text"
                        ref={searchRef}
                        value={state.searchValue}
                        onChange={(e) => setState(prev => ({...prev, searchValue: e.target.value}))}
                        className="w-full h-full rounded p-2 text-sm"
                        placeholder="Filter by page title..."
                    />
                </div>
            </div>
            <div className="">
                { deletedPages?.map((item, index) => {
                    return (
                        <div className="flex cursor-pointer hover:bg-[rgb(239,239,239)] rounded-md items-center p-[2px] justify-between" key={`deleted-pages-${index}`}>
                            <div className="flex items-center">
                                <div className="mr-2 flex justify-center items-center text-[20px] select-none">
                                    {renderIcon(item?.page_icon)}
                                </div>
                                <div className="text-xs font-medium">{item?.page_name}</div>
                            </div>
                            <div className="flex items-center">
                                <div onClick={() => handleTrash(item?._id, 'undo')} className="p-[3px] mr-2 flex hover:bg-[rgb(225,225,225)]">
                                    <IconUndo className=""/>
                                </div>
                                <div onClick={() => handleTrash(item?._id, 'delete')} className="p-[3px] hover:bg-[rgb(225,225,225)]">
                                    <IconDelete className=""/>
                                </div>
                            </div>
                        </div>
                    )
                }) }
            </div>
        </div>
    )
}

export default All;