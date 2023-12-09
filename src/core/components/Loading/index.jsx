import React from "react";

const Loading = () => {
    return (
        <div className="w-full h-full flex items-center justify-center">
            <div
                className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-[rgb(58,113,202)] border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite] mr-1"
                role="status"
            >
                <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >
                    Loading...
                </span>
            </div>
        </div>
    )
};

export default Loading;