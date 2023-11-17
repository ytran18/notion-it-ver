import React, { useRef, useEffect, useState } from "react";

import { ReactComponent as IconFilter } from 'assets/icons/iconFilterCircle.svg';
import { ReactComponent as IconSearch } from 'assets/icons/iconSearch.svg';
import { ReactComponent as IconDocument } from 'assets/icons/iconDocument.svg';

const ModalSearch = (props) => {

    const { handleModalUser } = props;

    const [state, setState] = useState({
        searchValue: '',
    });

    const modalRef = useRef(null);
    const searchRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                handleModalUser(1);
            };
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    },[]);

    useEffect(() => {
        if (searchRef.current) {
            searchRef.current.focus();
        };
    },[]);

    return (
        <div className="fixed w-screen h-screen top-0 left-0 bottom-0 right-0 bg-[rgb(89,89,89)] bg-opacity-90 flex justify-center items-center drop-shadow-2xl shadow-2xl z-[120]">
            <div ref={modalRef} className="w-[700px] flex flex-col -mt-44 h-[550px] bg-white rounded-lg shadow-md">
                <div className="w-full flex items-center justify-between p-3 border-b border-[rgb(237,237,236)]">
                    {state.searchValue.length > 0 ? <IconDocument /> : <IconSearch />}
                    <input 
                        ref={searchRef} 
                        type="text"
                        value={state.searchValue}
                        onChange={(e) => setState(prev => ({...prev, searchValue: e.target.value}))}
                        className="outline-none w-full mx-4 placeholder:opacity-70"
                        placeholder="Search ytn's Notion"
                    />
                    <IconFilter />
                </div>
                <div className=""></div>
            </div>
        </div>
    );
};

export default ModalSearch;