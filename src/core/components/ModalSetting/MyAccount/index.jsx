import React, { useState } from "react";

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from "core/firebase/firebase";

import { ReactComponent as IconClose } from 'assets/icons/iconCloseCircle.svg';
import { ReactComponent as IconRight } from 'assets/icons/iconRight.svg';

const MyAccount = (props) => {

    const { avatar_src, currUser } = props;

    const [state, setState] = useState({
        name: currUser?.display_name || ``,
        isHideCloseIcon: false,
    });

    const handleMouseEnter = () => {
        setState(prev => ({...prev, isHideCloseIcon: true}));
    };
    
    const handleMouseLeave = () => {
        setState(prev => ({...prev, isHideCloseIcon: false}));
    };

    const handleRemoveAvatar = () => {
        console.log("run");
    };

    const handleChangeAvartar = (e) => {
        const file = e.target.files[0]
        const imageRef = ref(storage, `images/${file.name}`)
        console.log(imageRef);
        uploadBytes(imageRef, file)
            .then( (snapshot) => {
                getDownloadURL(imageRef)
                    .then((url) => {
                        console.log(url);
                    })
                    .catch( (error) => {
                        console.log("err: ",error.message)
                    })
                console.log('Uploaded a blob or file!');
            })
            .catch( (error) => {
                console.log(error.message)
            })
    }

    return (
        <div className="w-full flex flex-col">
            <div className="text-sm font-medium w-full p-3 border-b border-[rgb(237,237,236)]">My profile</div>
            <div className="flex items-center p-3 mb-7">
                <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="relative">
                    <label htmlFor="uploadAvatar" className="cursor-pointer">
                        <img src={avatar_src} className="w-[60px] rounded-full mr-4"/>
                        {currUser?.avatar_url?.length > 0 && (
                            <div
                                onClick={handleRemoveAvatar}
                                className={`p-[1px] border absolute transition-opacity duration-[270ms] top-0 right-4 bg-white shadow-md cursor-pointer border-[rgb(219,219,219)] rounded-full ${state.isHideCloseIcon ? 'opacity-100 cursor-pointer' : 'opacity-0 cursor-default'}`}
                            >
                                <IconClose className=""/>
                            </div>
                        )}
                    </label>
                    <input type="file" className="hidden" id="uploadAvatar" onChange={handleChangeAvartar}/>
                </div>
                <div className="flex flex-col">
                    <div className="text-sm font-medium opacity-70">Preferred name</div>
                    <div className="w-[250px] h-8 border border-[rgb(224,224,222)] rounded cursor-pointer">
                        <input
                            value={state.name}
                            onChange={(e) => setState(prev => ({...prev, name: e.target.value}))}
                            className="w-full h-full bg-[rgb(247,247,245)] rounded p-2 text-xs"
                        />
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col mb-7">
                <div className="text-sm font-medium p-3 border-b border-[rgb(237,237,236)] mb-2">Account security</div>
                <div className="p-3 flex items-center justify-between ">
                    <div className="flex flex-col">
                        <div className="text-xs font-medium">Email</div>
                        <div className="text-xs opacity-70">{currUser?.email}</div>
                    </div>
                    <div className="py-2 px-6 text-xs border cursor-pointer hover:bg-[rgb(225,225,225)] border-[rgb(240,240,239)] rounded">Change email</div>
                </div>
                <div className="p-3 flex items-center justify-between ">
                    <div className="flex flex-col">
                        <div className="text-xs font-medium">Password</div>
                        <div className="text-xs opacity-70">Set a permanent password to login to your account.</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
                <div className="p-3 flex items-center justify-between ">
                    <div className="flex flex-col">
                        <div className="text-xs font-medium">2-step verification</div>
                        <div className="text-xs opacity-70">Add an additional layer of security to your account during login.</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value={false} disabled className="sr-only peer" />
                        <div className="w-11 h-6 opacity-50 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
            </div>
            <div className="w-full flex flex-col">
                <div className="text-sm font-medium p-3 border-b border-[rgb(237,237,236)] mb-2">Support</div>
                <div className="p-3 flex items-center justify-between ">
                    <div className="flex flex-col w-[70%]">
                        <div className="text-xs font-medium">Support access</div>
                        <div className="text-xs opacity-70">Grant Notion support temporary access to your account so we can troubleshoot problems or recover content on your behalf. You can revoke access at any time.</div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                </div>
                <div className="p-3 flex items-center justify-between ">
                    <div className="flex flex-col">
                        <div className="text-xs font-medium">Log out of all devices</div>
                        <div className="text-xs opacity-70">Log out of all other active sessions on other devices besides this one.</div>
                    </div>
                    <div className="p-1 hover:bg-[rgb(239,239,239)] rounded">
                        <IconRight className="cursor-pointer"/>
                    </div>
                </div>
                <div className="p-3 flex items-center justify-between ">
                    <div className="flex flex-col">
                        <div className="text-xs font-medium text-red-500">Delete my account</div>
                        <div className="text-xs opacity-70">Permanently delete the account and remove access from all workspaces.</div>
                    </div>
                    <div className="p-1 hover:bg-[rgb(239,239,239)] rounded">
                        <IconRight className="cursor-pointer"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;