import React from "react";

import './heading.css';

const Heading = React.forwardRef((props, ref) => {

    const { textContent, idActive, id, handleKeyDown, handleContentChange, typeBlock } = props;

    const margin = {
        'heading1': 'mt-[2em] mb-[4px]',
        'heading2': 'mt-[1.4em]',
        'heading3': 'mt-[1em]',
    }[typeBlock];
    
    const fontSize = {
        'heading1': 'text-[1.875em]',
        'heading2': 'text-[1.5em]',
        'heading3': 'text-[1.25em]',
    }[typeBlock];
    
    const placeholder = {
        'heading1': 'Heading 1',
        'heading2': 'Heading 2',
        'heading3': 'Heading 3',
    }[typeBlock];

    return (
        <div className={`flex items-center w-full heading ${margin}`}>
            <h2
                id={id}
                ref={ref}
                type-block='heading'
                className={`w-full ${(textContent.length > 0 || idActive !== id) ? 'text-block-placeholder-hidden' : 'text-block-placeholder'} relative text-[rgb(55,53,47)] cursor-text h-full ${fontSize} font-semibold leading-[1.3] m-0`}
                placeholder={placeholder}
                contentEditable={true}
                style={{maxWwidth: '100%', width: '100%', whiteSpace: 'pre-wrap', wordBreak: 'break-word', caretColor: 'rgb(55, 53, 47)', padding: '3px 2px', outline: 'none'}}
                onKeyDown={(e) => handleKeyDown(e, typeBlock)}
                onInput={handleContentChange}
            >
            </h2>
        </div>
    );
});

export default Heading;