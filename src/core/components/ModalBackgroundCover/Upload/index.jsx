import React from "react";

const Upload = () => {

    const handleUploadFile = () => {

    };

    return (
        <div className="w-full py-3">
            <div 
                onClick={() => handleUploadFile}
                className="flex items-center justify-center h-9 border border-[rgb(223,223,222)] cursor-pointer hover:bg-[rgb(225,225,225)] transition-all duration-200"
            >
                Upload file
            </div>
        </div>
    );
};

export default Upload;