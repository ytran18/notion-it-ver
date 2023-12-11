import React, { useState, useRef, useEffect } from "react";

import { ReactComponent as IconPlus } from 'assets/icons/iconPlus.svg'
import { ReactComponent as IconDrag } from 'assets/icons/iconDrag.svg'

import './block.css';

const Block = (props) => {

    const { handleEnter, index, handleArrow, id, handleDelete, idActive, handleClickInBlock, handleModalListBlocks } = props;

    const [state, setState] = useState({
        textContent: '',
        isFirstTimeRender: true,
        isBlockActive: false,
        isDisplayOptionBtn: false,
    });

    const textBlockRef = useRef(null); // text block ref

    // focus this current div when render
    useEffect(() => {
        if (textBlockRef.current) {
            textBlockRef.current.focus();
        };
    },[]);

    // remove br tag when render
    if (textBlockRef.current) {
        const element = textBlockRef.current.children;

        Array.from(element).forEach(divElement => {
            if (divElement.tagName.toLowerCase() === 'div') {
                const brElements = divElement.querySelectorAll('br');
    
                brElements.forEach(brElement => {
                    brElement.parentNode.removeChild(brElement);
                });
            }
        });
    }

    useEffect(() => {
        const handleClickBlock = (e) => {
            if (textBlockRef.current && textBlockRef.current.contains(e.target)) {
                handleClickInBlock(id);
            };
        };

        document.addEventListener('mousedown', handleClickBlock);

        return () => {
            document.removeEventListener('mousedown', handleClickBlock);
        };
    },[]);

    // handle onChange content
    const handleContentChange = (e) => {
        setState(prev => ({...prev, textContent: e.target.textContent}));
    };

    // handle ctrl + A in this current div
    const handleKeyDown = (e) => {
        const blocks = document.querySelectorAll('[id^="block-id-"]');
        let prevEleIndex = null;
        let nextEleIndex = null;
        let currEleIndex = null;

        blocks.forEach((item,index) => {
            if (item.id === id) {
                prevEleIndex = index - 1;
                nextEleIndex = index + 1;
                currEleIndex = index
                return;
            }
        });

        if (e.key === 'Enter') {
            e.preventDefault();
            handleEnter(e, currEleIndex);
        };

        if (e.ctrlKey && e.key === 'a') {
            e.preventDefault();
            if (textBlockRef.current) {
                const range = document.createRange();
                range.selectNodeContents(textBlockRef.current);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            }
        };

        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
            handleArrow(index, e.key, e.key === 'ArrowUp' ? blocks[prevEleIndex]?.id : blocks[nextEleIndex]?.id);
        };

        if (e.keyCode === 8 || e.keyCode === 46) {
            if (state.textContent.length > 0) return;
            if (state.isFirstTimeRender) e?.preventDefault();
            setState(prev => ({...prev, isFirstTimeRender: false}));
            handleDelete(index, blocks[prevEleIndex]?.id);
        };
    };

    // handle display option btn 
    const handleMouseEnter = () => {
        setState(prev => ({...prev, isDisplayOptionBtn: true}));
    };
    
    const handleMouseLeave = () => {
        setState(prev => ({...prev, isDisplayOptionBtn: false}));
    };

    return (
        <>
            <div 
                className="w-full h-6 relative bg-white rounded-md" id="notion-it-block"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div
                    id={id}
                    ref={textBlockRef}
                    className={`w-full ${(state.textContent.length > 0 || idActive !== id) ? 'text-block-placeholder-hidden' : 'text-block-placeholder'} relative h-full min-h-[1rem] text-[rgb(55,53,47)] font-medium`} 
                    placeholder="Press 'space' for AI, '/' for commands…" 
                    contentEditable={true}
                    style={{maxWwidth: '100%', width: '100%', whiteSpace: 'pre-wrap', wordBreak: 'break-word', caretColor: 'rgb(55, 53, 47)', padding: '3px 2px', outline: 'none'}}
                    onKeyDown={handleKeyDown}
                    onInput={handleContentChange}
                >
                </div>
                {state.isDisplayOptionBtn && (
                    <div className="absolute transition-all duration-300 flex items-center right-full -top-[48%] translate-y-1/2">
                        <div
                            onClick={() => handleModalListBlocks(id)}
                            className="cursor-pointer p-[1px] hover:bg-[rgb(239,239,239)] rounded mx-1"
                        >
                            <IconPlus />
                        </div>
                        <div className="cursor-pointer p-[1px] hover:bg-[rgb(239,239,239)] rounded">
                            <IconDrag />
                        </div>
                    </div>
                )}
            </div>
        </>
    )
};

export default Block;