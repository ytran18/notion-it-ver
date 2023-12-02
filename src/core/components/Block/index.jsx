import React, { useState, useRef, useEffect } from "react";

import './block.css';

const Block = React.forwardRef((props, ref) => {

    const { handleEnter } = props;

    const [state, setState] = useState({
        textContent: '',
    });

    const textBlockRef = useRef(null); // text block ref

    // focus this current div when render
    useEffect(() => {
        if (textBlockRef.current) {
            textBlockRef.current.focus();
        };
    },[]);

    // handle onChange content
    const handleContentChange = (e) => {
        setState(prev => ({...prev, textContent: e.target.textContent}));
    };

    // handle ctrl + A in this current div
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleEnter(e);
        }
        if (e.ctrlKey && e.key === 'a') {
            e.preventDefault();
            if (textBlockRef.current) {
                const range = document.createRange();
                range.selectNodeContents(textBlockRef.current);
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    };

    return (
        <div className="w-full h-6 bg-white rounded-md">
            <div
                ref={textBlockRef}
                className={`w-full ${state.textContent.length > 0 ? 'text-block-placeholder-hidden' : 'text-block-placeholder'} relative h-full min-h-[1rem] text-[rgb(55,53,47)] font-medium`} 
                placeholder="Press 'space' for AI, '/' for commands…" 
                contentEditable={true}
                style={{maxWwidth: '100%', width: '100%', whiteSpace: 'pre-wrap', wordBreak: 'break-word', caretColor: 'rgb(55, 53, 47)', padding: '3px 2px', outline: 'none'}}
                onKeyDown={handleKeyDown}
                onInput={handleContentChange}
            >
            </div>
        </div>
    )
});

export default Block;