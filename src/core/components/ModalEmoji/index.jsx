import React, { useRef, useEffect } from "react";

import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

const ModalEmoji = (props) => {

    const { handleModalEmoji } = props;

    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                handleModalEmoji();
            };
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    },[])

    return (
        <div ref={modalRef} className="w-full h-full">
            <Picker 
                data={data}
                previewPosition='none'
                theme='light'
                perLine='12'
            />
        </div>
    );
};

export default ModalEmoji;