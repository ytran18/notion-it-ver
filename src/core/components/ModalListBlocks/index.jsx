import React, { useRef, useEffect } from "react";

const ModalListBlocks = (props) => {

    const { handleModalListBlocks, idActive } = props;

    const modalRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                handleModalListBlocks(idActive);
            };
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    },[]);

    return (
        <div className="fixed w-screen h-screen cursor-default top-0 left-0 bottom-0 right-0 bg-[rgb(89,89,89)] bg-opacity-90 flex justify-center items-center drop-shadow-2xl shadow-2xl z-[120]">
            <div ref={modalRef} className="w-[324px] flex flex-col -mt-44 h-[550px] bg-white rounded-lg shadow-md">
            </div>
        </div>
    );
};

export default ModalListBlocks;