import React, { useState, useRef, useEffect, useMemo } from "react";

import Todo from "core/block/Todo";
import Heading from "core/block/Heading";

import { ReactComponent as IconPlus } from 'assets/icons/iconPlus.svg'
import { ReactComponent as IconDrag } from 'assets/icons/iconDrag.svg'

import './block.css';

const Block = (props) => {

    const { handleEnter, index, handleArrow, id, handleDelete, idActive, handleClickInBlock, 
            handleModalListBlocks, typeBlock } = props;

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
    const handleKeyDown = (e, type) => {
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
            handleEnter(e, currEleIndex, false, typeBlock, state.textContent.length === 0, index, blocks[prevEleIndex]?.id);
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
            handleDelete(index, blocks[prevEleIndex]?.id, type);
        };
    };

    // handle display option btn 
    const handleMouseEnter = () => {
        setState(prev => ({...prev, isDisplayOptionBtn: true}));
    };
    
    const handleMouseLeave = () => {
        setState(prev => ({...prev, isDisplayOptionBtn: false}));
    };

    const renderTextBlock = useMemo(() => {
        return (
            <div
                id={id}
                ref={textBlockRef}
                type-block='text'
                className={`w-full ${(state.textContent.length > 0 || idActive !== id) ? 'text-block-placeholder-hidden' : 'text-block-placeholder'} relative h-6 min-h-[1rem] text-[rgb(55,53,47)] font-medium`} 
                placeholder="Press 'space' for AI, '/' for commands…" 
                contentEditable={true}
                style={{maxWwidth: '100%', width: '100%', whiteSpace: 'pre-wrap', wordBreak: 'break-word', caretColor: 'rgb(55, 53, 47)', padding: '3px 2px', outline: 'none'}}
                onKeyDown={(e) => handleKeyDown(e, 'text')}
                onInput={handleContentChange}
            >
            </div>
        )
    },[state.textContent, idActive, typeBlock]);

    const renderTodoBlock = useMemo(() => {
        return (
            <Todo
                id={id}
                ref={textBlockRef}
                textContent={state.textContent}
                idActive={idActive}
                handleKeyDown={handleKeyDown}
                handleContentChange={handleContentChange}
            />
        )
    },[state.textContent, idActive, typeBlock]);

    const renderHeadingBlock = useMemo(() => {
        return (
            <Heading
                id={id}
                ref={textBlockRef}
                textContent={state.textContent}
                idActive={idActive}
                handleKeyDown={handleKeyDown}
                handleContentChange={handleContentChange}
                typeBlock={typeBlock}
            />
        )
    },[state.textContent, idActive, typeBlock]);

    const marginHeading = {
        'heading1': 'mt-[1.1em]',
        'heading2': 'mt-[0.6em]',
        'heading3': 'mt-[0.3em]',
    }[typeBlock];

    return (
        <>
            <div 
                className="w-full relative bg-white rounded-md" id="notion-it-block"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {typeBlock === 'text' ? renderTextBlock : null}

                {typeBlock === 'todo' ? renderTodoBlock : null}

                {typeBlock === 'heading1' || typeBlock === 'heading2' || typeBlock === 'heading3' ? renderHeadingBlock : null}

                {state.isDisplayOptionBtn && (
                    <div className={`absolute transition-all duration-300 flex items-center right-full -top-[48%] translate-y-1/2 ${marginHeading}`}>
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