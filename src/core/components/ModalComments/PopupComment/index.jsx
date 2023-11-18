import React from "react";

const PopUpComment = () => {
    return (
        <div className="w-[182px] bg-white shadow-xl p-1 flex flex-col rounded-md">
            <div className="p-2 text-sm font-medium rounded hover:bg-[rgb(239,239,239)]">
                Open comments
            </div>
            <div className="p-2 text-sm font-medium rounded hover:bg-[rgb(239,239,239)]">
                Resolves comments
            </div>
        </div>
    );
};

export default PopUpComment;