import React from "react";

const BlockPreview = (props) => {

    const { img, title, description } = props;

    return (
        <div className="w-full h-[55px] hover:bg-[rgb(239,239,239)] p-1 rounded-md flex items-center cursor-pointer">
            <img src={img} className="w-[46px] h-[46px] rounded border border-[rgb(217,217,217)] mr-2" />
            <div className="flex flex-col">
                <div className="text-sm font-medium">{title}</div>
                <div className="text-xs truncate">{description}</div>
            </div>
        </div>
    );
};

export default BlockPreview;