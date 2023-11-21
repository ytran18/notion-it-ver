import React, { useEffect, useRef } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clear } from "core/redux/actions";

import { ReactComponent as IconMore } from 'assets/icons/iconMore.svg';
import { ReactComponent as IconCheck } from 'assets/icons/iconCheck.svg';

// test
const imgSrc = 'https://lh3.googleusercontent.com/a/ACg8ocIsYVVjXmItPPEpsy_Td4La9MnmrcOrTO2cfcRJb6l8=s100';

const ModalUser = React.forwardRef((props, ref) => {

    const { handleModalUser, currUser } = props;

    const popUpRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                handleModalUser(0);
            } else {
                handleModalUser(0, 'modal');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    },[]);

    const handleLogout = () => {
        dispatch(clear());
        setTimeout(() => {
            navigate({
                pathname: '/login'
            });
        },2000);
    };

    const classNameItem = 'w-full p-2 cursor-pointer hover:bg-[rgb(239,239,239)] text-[12px]';

    return (
        <div ref={popUpRef} className="w-[320px] cursor-default flex flex-col bg-white border border-[rgb(224,224,223)] rounded-md shadow-md">
            <div className="w-full flex items-center justify-between p-3">
                <div className="text-[11px] font-medium">{currUser?.email}</div>
                <IconMore className="transform scale-75"/> 
            </div>
            <div className="w-full border-b border-[rgb(237,237,236)] flex items-center justify-between p-3 cursor-pointer hover:bg-[rgb(239,239,239)]">
                <div className="flex items-center">
                    <img src={imgSrc} className="w-[32px] rounded-md mr-4"/>
                    <div className="flex flex-col text-[11px]">
                        <div className="text-[12px] font-medium">{`${currUser?.display_name}'s Notion`}</div>
                        <div className="">Free Plan · 1 member</div>
                    </div>
                </div>
                <IconCheck className=""/>
            </div>
            <div className="w-full flex flex-col">
                <div className={classNameItem}>Create work account</div>
                <div className={classNameItem}>Add another account</div>
                <div onClick={handleLogout} className={classNameItem}>Log out</div>
            </div>
        </div>
    );
});

export default ModalUser;