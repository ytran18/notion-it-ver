import React, { useRef, useEffect } from "react";

import BlockPreview from "./BlockPreview";

// img
import TextImage from 'assets/img/blocks/en-US.png';
import PageImage from 'assets/img/blocks/page.83b0bf31.png';
import TodoImage from 'assets/img/blocks/to-do.f8d20542.png';
import Heading1Image from 'assets/img/blocks/header.57a7576a.png';
import Heading2Image from 'assets/img/blocks/subheader.9aab4769.png';
import Heading3Image from 'assets/img/blocks/subsubheader.d0ed0bb3.png';
import TableImage from 'assets/img/blocks/simple-table.e31a23bb.png';
import BulletedImage from 'assets/img/blocks/bulleted-list.0e87e917.png';
import NumberedImage from 'assets/img/blocks/numbered-list.0406affe.png';
import ToggleImage from 'assets/img/blocks/toggle.5e462b2a.png';
import QuoteImage from 'assets/img/blocks/quote.png';
import DividerImage from 'assets/img/blocks/divider.210d0faf.png';
import LinkToPageImage from 'assets/img/blocks/link.dd415f7c.png';
import CalloutImage from 'assets/img/blocks/callout.7b4c39c4.png';
import ImageImage from 'assets/img/blocks/image.33d80a98.png';
import WebBookmarkImage from 'assets/img/blocks/web-bookmark.82a15180.png';
import VideoImage from 'assets/img/blocks/video.ceeec2c7.png';
import AudioImage from 'assets/img/blocks/audio.946c8e51.png';
import CodeImage from 'assets/img/blocks/code.a8b201f4.png';
import FileImage from 'assets/img/blocks/file.4fade042.png';
import InLineEmojiImage from 'assets/img/blocks/inline-emoji.4fda0007.png';
import GithubImage from 'assets/img/blocks/github-icon.png';
import MapsImage from 'assets/img/blocks/maps.b1caf3fd.png';
import FigmaImage from 'assets/img/blocks/figma-icon.png';
import MermaidImage from 'assets/img/blocks/mermaid.png';
import ReactFlowImage from 'assets/img/blocks/react-flow-2.png';
import VSCodeImage from 'assets/img/blocks/vscode.png';

const basicBlocks = [
    { img: TextImage, title: 'Text', description: 'Just start writting with plain text.', type: 'text' },
    { img: PageImage, title: 'Page', description: 'Embed a sub-page inside this page.', type: 'page' },
    { img: TodoImage, title: 'To-do list', description: 'Track tasks with a to-do list.', type: 'todo' },
    { img: Heading1Image, title: 'Heading 1', description: 'Big section heading.', type: 'heading1' },
    { img: Heading2Image, title: 'Heading 2', description: 'Medium section heading.', type: 'heading2' },
    { img: Heading3Image, title: 'Heading 3', description: 'Small section heading.', type: 'heading3' },
    { img: TableImage, title: 'Table', description: 'Add simple tabular content to your page.', type: 'table' },
    { img: BulletedImage, title: 'Bulleted list', description: 'Create a simple bulleted list.', type: 'bulleted' },
    { img: NumberedImage, title: 'Numbered list', description: 'Create a list with numbering.', type: 'numbered' },
    { img: ToggleImage, title: 'Toggle list', description: 'Toggles can hide and show content inside.', type: 'toggle' },
    { img: QuoteImage, title: 'Quote', description: 'Capture a quote.', type: 'quote' },
    { img: DividerImage, title: 'Divider', description: 'Visually devide blocks.', type: 'divider' },
    { img: LinkToPageImage, title: 'Link to page', description: 'Link to an existing page.', type: 'linktopage' },
    { img: CalloutImage, title: 'Callout', description: 'Make writing stand out.', type: 'callout' },
];

const mediaBlocks = [
    { img: ImageImage, title: 'Image', description: 'Upload or embed with a link.', type: 'image' },
    { img: WebBookmarkImage, title: 'Web Bookmark', description: 'Save a link as a visual bookmark.', type: 'bookmark' },
    { img: VideoImage, title: 'Video', description: 'Embed from Youtube, Vimeo...', type: 'video' },
    { img: AudioImage, title: 'Audio', description: 'Embed from Soundcloud, Spotify...', type: 'audio' },
    { img: CodeImage, title: 'Code', description: 'Capture a code snippet.', type: 'code' },
    { img: FileImage, title: 'File', description: 'Upload or embed with a link.', type: 'file' },
];

const inlineBlocks = [
    { img: InLineEmojiImage, title: 'Emoji', description: 'Search for an emoji to place in text.', type: 'inlineEmoji' },
];

const toolsBlocks = [
    { img: GithubImage, title: 'Github', description: 'Github actions.', type: 'github' },
    { img: MapsImage, title: 'Google Maps', description: 'Embed a Google Map.', type: 'maps' },
    { img: FigmaImage, title: 'Figma', description: 'View figma design directly in Notion for IT.', type: 'figma' },
    { img: MermaidImage, title: 'Mermaid', description: 'Create a diagram by writing code.', type: 'mermaid' },
    { img: ReactFlowImage, title: 'React Flow', description: 'Wire your ideas with React Flow.', type: 'reactflow' },
    { img: VSCodeImage, title: 'Visual Studio Code', description: 'Open your project in Visual Studio Code.', type: 'vscode' },
];

const ModalListBlocks = (props) => {

    const { handleModalListBlocks, idActive, isShowSidebar, handleSelectBlock, idSelect } = props;

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
        <div 
            className="fixed h-screen cursor-default right-0 bg-[rgb(120,120,120)] bg-opacity-90 flex justify-center items-center drop-shadow-2xl shadow-2xl z-[120]"
            style={{width: isShowSidebar ? 'calc(100vw - 220px)' : '100vw'}}
        >
            <div ref={modalRef} className="w-[370px] py-2 flex flex-col h-[400px] bg-white rounded-lg shadow-md overflow-y-auto">
                <div className="text-sm font-medium mb-1 px-2 text-[rgb(128,127,123)]">Basic blocks</div>
                <div className="mb-3">
                    {basicBlocks.map((item, index) => {
                        return (
                            <div className="px-1" key={`block-preview-item-${index}`}>
                                <BlockPreview 
                                    img={item.img} 
                                    title={item.title} 
                                    description={item.description} 
                                    type={item.type}
                                    handleSelectBlock={handleSelectBlock}
                                    idSelect={idSelect}
                                />
                            </div>
                        )
                    })}
                </div>
                <div className="text-sm font-medium mb-1 px-2 text-[rgb(128,127,123)]">Media</div>
                <div className="mb-3">
                    {mediaBlocks.map((item, index) => {
                        return (
                            <div className="px-1" key={`block-preview-item-${index}`}>
                                <BlockPreview 
                                    img={item.img} 
                                    title={item.title} 
                                    description={item.description} 
                                    type={item.type}
                                    handleSelectBlock={handleSelectBlock}
                                    idSelect={idSelect}
                                />
                            </div>
                        )
                    })}
                </div>
                <div className="text-sm font-medium mb-1 px-2 text-[rgb(128,127,123)]">Inline</div>
                <div className="mb-3">
                    {inlineBlocks.map((item, index) => {
                        return (
                            <div className="px-1" key={`block-preview-item-${index}`}>
                                <BlockPreview 
                                    img={item.img} 
                                    title={item.title} 
                                    description={item.description} 
                                    type={item.type}
                                    handleSelectBlock={handleSelectBlock}
                                    idSelect={idSelect}
                                />
                            </div>
                        )
                    })}
                </div>
                <div className="text-sm font-medium mb-1 px-2 text-[rgb(128,127,123)]">Tools</div>
                <div className="mb-3">
                    {toolsBlocks.map((item, index) => {
                        return (
                            <div className="px-1" key={`block-preview-item-${index}`}>
                                <BlockPreview 
                                    img={item.img} 
                                    title={item.title} 
                                    description={item.description} 
                                    type={item.type}
                                    handleSelectBlock={handleSelectBlock}
                                    idSelect={idSelect}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default ModalListBlocks;