import React, { useRef, useEffect, useState } from "react";

const ModalSetting = (props) => {

    const { handleModalUser } = props;

    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                handleModalUser(3);
            };
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    },[]);

    return (
        <div className="fixed w-screen h-screen top-0 left-0 bottom-0 right-0 bg-[rgb(89,89,89)] bg-opacity-90 flex justify-center items-center drop-shadow-2xl shadow-2xl z-[120]">
            <div ref={modalRef} className="w-4/5 flex flex-col h-4/5 bg-white rounded-lg shadow-md">
            </div>
        </div>
    );
};

export default ModalSetting;