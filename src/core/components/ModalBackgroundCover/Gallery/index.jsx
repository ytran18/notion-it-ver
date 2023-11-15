import React from "react";

import ColorGradient from "assets/img/color-gradient";
import Telescope from "assets/img/james-webb-telescope";
import Nasa from "assets/img/nasa-archive";

const Gallery = () => {

    const BgGallery = [
        { label: 'Color & Gradient', img: ColorGradient },
        { label: 'James Webb Telescope', img: Telescope },
        { label: 'NASA Archive', img: Nasa },
    ];

    return (
        <div className="">
            {BgGallery.map((item, index) => {
                return (
                    <div className="text-xs flex flex-col font-medium" key={`modal-background-cover-${index}`}>
                        <div className="cursor-pointer w-fit hover:bg-[rgb(239,239,239)] py-1 px-2 rounded-md">{item.label}</div>
                        <div className="w-full flex flex-wrap">
                            {item.img?.map((img, idx) => {
                                return (
                                    <div 
                                        style={{
                                            backgroundImage: `url(${img})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                        }}
                                        className="w-[123px] h-[64px] m-1 rounded cursor-pointer hover:opacity-75 transition-all duration-200" key={`modal-background-cover-img-${idx}`}
                                    ></div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default Gallery;