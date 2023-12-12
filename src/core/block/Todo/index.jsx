import React, { useState } from "react";

import './todo.css';

const Todo = React.forwardRef((props, ref) => {

    const [state, setState] = useState({
        isChecked: false,
    });

    const { textContent, idActive, id, handleKeyDown, handleContentChange } = props;

    return (
        <div className="flex items-center w-full h-full">
            <input
                type="checkbox"
                value={state.isChecked}
                onChange={() => setState(prev => ({...prev, isChecked: !prev.isChecked}))}
                className="cursor-pointer w-[16px] h-[16px] mr-1 mt-1"
            />
            <div
                id={id}
                ref={ref}
                className={`w-full ${(textContent.length > 0 || idActive !== id) ? 'text-block-placeholder-hidden' : 'text-block-placeholder'} relative h-full text-[rgb(55,53,47)] todo cursor-text font-medium ${state.isChecked ? 'decoration' : ''}`}
                placeholder="Press 'space' for AI, '/' for commands…" 
                contentEditable={true}
                style={{maxWwidth: '100%', width: '100%', whiteSpace: 'pre-wrap', wordBreak: 'break-word', caretColor: 'rgb(55, 53, 47)', padding: '3px 2px', outline: 'none'}}
                onKeyDown={handleKeyDown}
                onInput={handleContentChange}
            >
            </div>
        </div>
    );
});

export default Todo;