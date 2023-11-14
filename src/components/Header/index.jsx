import React from "react";

import { ReactComponent as IconLeft } from 'assets/icons/iconLeft.svg';
import { ReactComponent as IconRightBig } from 'assets/icons/iconRightBig.svg';
import { ReactComponent as IconPlus } from 'assets/icons/iconPlus.svg';
import { ReactComponent as IconClock } from 'assets/icons/iconClock.svg';
import { ReactComponent as IconStar } from 'assets/icons/iconStar.svg';
import { ReactComponent as IconComment } from 'assets/icons/iconComment.svg';
import { ReactComponent as IconMore } from 'assets/icons/iconMore.svg';

const Header = () => {
    return (
        <div className="w-full h-full flex justify-between py-2">
            <div className="flex items-center">
                <div className="mx-4 hover:bg-[rgb(239,239,239)]">
                    <IconLeft className="cursor-pointer "/>
                </div>
                <div className="mr-4 hover:bg-[rgb(239,239,239)]">
                    <IconRightBig className="cursor-pointer"/>
                </div>
                <div className="mr-4 hover:bg-[rgb(239,239,239)]">
                    <IconPlus className="cursor-pointer"/>
                </div>
                <div className="px-2 hover:bg-[rgb(239,239,239)] cursor-pointer select-none">Quy do</div>
            </div>
            <div className="flex items-center">
                <div className=""></div>
                <div className=""></div>
                <div className="ml-3 p-[3px] hover:bg-[rgb(239,239,239)] cursor-pointer text-sm">Share</div>
                <div className="ml-3 p-[3px] hover:bg-[rgb(239,239,239)]"> <IconComment className="cursor-pointer"/> </div>
                <div className="ml-3 p-[3px] hover:bg-[rgb(239,239,239)]"> <IconClock className="cursor-pointer"/> </div>
                <div className="ml-3 p-[3px] hover:bg-[rgb(239,239,239)]"> <IconStar className="cursor-pointer"/> </div>
                <div className="mx-3 p-[3px] hover:bg-[rgb(239,239,239)]"> <IconMore className="cursor-pointer "/> </div>
            </div>
        </div>
    );
};

export default Header;