import React, { useState, useEffect, useRef } from "react";

import { ReactComponent as IconCloseSmallSolid } from 'assets/icons/iconCloseSmallSolid.svg';

const Link = () => {

    const [state, setState] = useState({
        value: '',
        isVisibleCloseIcon: false,
    });

    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        };
    },[])

    const handleChange = (e) => {
        setState(prev => ({...prev, value: e?.target?.value}));
    };
    
    const handleRemoveInput = () => {
        setState(prev => ({...prev, value: ''}));
        inputRef.current.focus();
    };

    useEffect(() => {
        if (state.value !== '') {
            setState(prev => ({...prev, isVisibleCloseIcon: true}));
        } else {
            setState(prev => ({...prev, isVisibleCloseIcon: false}));
        }
    },[state.value]);

    return (
        <div className="w-full py-3 flex flex-col items-center">
            <div className="h-8 w-full relative mb-3">
                <input 
                    ref={inputRef}
                    type="text"
                    value={state.value}
                    onChange={handleChange}
                    className="w-full h-full text-sm px-3 font-normal border border-[rgb(223,223,222)] rounded-md"
                    placeholder="Pass an image link..."
                />
                {
                    state.isVisibleCloseIcon && (
                        <IconCloseSmallSolid 
                            className="absolute right-2 opacity-80 cursor-pointer hover:opacity-100 text-[rgb(179,179,176)] top-1/2 -translate-y-1/2" 
                            onClick={handleRemoveInput}
                        />
                    )
                }
            </div>
            <div className="w-1/2 h-8 bg-[rgb(36,121,226)] opacity-80 transition-all duration-150 hover:opacity-100 text-white font-semibold flex justify-center items-center text-sm cursor-pointer rounded-md">Submit</div>
        </div>
    );
};

export default Link;