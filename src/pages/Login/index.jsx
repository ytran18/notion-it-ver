import React, { useState, useRef, useEffect } from "react";

import { ReactComponent as IconNotion } from 'assets/icons/iconNotion.svg';
import { ReactComponent as IconGoogle } from 'assets/icons/iconGoogle.svg';
import { ReactComponent as IconApple } from 'assets/icons/iconApple.svg';
import { ReactComponent as IconClose } from 'assets/icons/iconCloseSmallSolid.svg';

import { signupWithEmail } from './function';

const Login = () => {

    const [state, setState] = useState({
        email: '',
        timesRender: 0,
        isSentEmailSuccess: 0,
        loginCode: '',
        btnContent: 'Continue with email'
    });

    const emailRef = useRef(null);
    const loginCodeRef = useRef(null);

    useEffect(() => {
        if (emailRef.current) {
            emailRef.current.focus();
        };
    },[]);

    const handleEmail = async () => {
        const { email } = state;
        
        if (!email) {
            console.log("email invalid !");
        };
        setState(prev => ({...prev, isSentEmailSuccess: 1}));

        const data = {
            email: email,
        }
        const res = await signupWithEmail(data);
        if (res.ok) {
            setState(prev => ({...prev, isSentEmailSuccess: 2, btnContent: 'Continue with login code'}));
        };
    };
    
    useEffect(() => {
        if (state.isSentEmailSuccess === 2) {
            if (loginCodeRef.current) {
                loginCodeRef.current.focus();
            };
        };
    },[state.isSentEmailSuccess]);

    const handleRemoveEmail = () => {
        setState(prev => ({...prev, email: ''}));
    };

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <div className="flex items-center">
                <IconNotion className="mr-4"/>
                <div className="select-none">
                    <div className="text-2xl font-semibold">Welcome to Notion for IT</div>
                    <div className="text-md font-medium">Log in to see your content</div>
                </div>
            </div>
            <div className="py-14 flex flex-col border-b-[2px] border-[rgb(239,239,239)]">
                <div className="w-80 h-9 border my-2 flex items-center justify-center border-[rgb(219,219,219)] rounded cursor-pointer">
                    <IconGoogle className="mr-2"/>
                    <div className="font-semibold text-[13px]">Continue with Google</div>
                </div>
                <div className="w-80 h-9 border my-2 flex items-center justify-center border-[rgb(219,219,219)] rounded cursor-pointer">
                    <IconApple className="mr-2"/>
                    <div className="font-semibold text-[13px]">Continue with Apple</div>
                </div>
            </div>
            <div className="flex flex-col py-4">
                <div className="my-1 w-80 text-[13px]">Email</div>
                <div className="mb-2 w-80 relative h-9 border border-[rgb(224,224,222)] rounded">
                    <input
                        ref={emailRef}
                        value={state.email}
                        onChange={(e) => setState(prev => ({...prev, email: e.target.value}))}
                        className="w-full h-full text-[13px] p-2 pr-6"
                        placeholder="Enter your email address..."
                    />
                    {state.email !== '' && (
                        <IconClose 
                            onClick={handleRemoveEmail}
                            className="absolute cursor-pointer text-[rgb(180,179,176)] right-1 top-1/2 -translate-y-1/2"
                        />
                    )}
                </div>
                {state.isSentEmailSuccess === 2 && (
                    <>
                        <div className="text-sm select-none text-center my-3">
                        We just sent you a temporary login code. <br />Please check your inbox
                        </div>

                        <div className="my-1 w-80 text-[13px]">Login code</div>
                        <div className="mb-2 w-80 relative h-9 border border-[rgb(224,224,222)] rounded">
                            <input
                                ref={loginCodeRef}
                                value={state.loginCode}
                                onChange={(e) => setState(prev => ({...prev, loginCode: e.target.value}))}
                                className="w-full h-full text-[13px] p-2 pr-6"
                                placeholder="Enter login code"
                                />
                        </div>
                    </>
                )}

                <div 
                    onClick={handleEmail}
                    className="w-80 h-9 border my-2 bg-[rgb(254,245,242)] flex items-center justify-center border-[rgb(250,198,196)] rounded cursor-pointer"
                >
                    {state.isSentEmailSuccess === 1 && (
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
                    )}
                    <div className="font-semibold text-[13px] text-[rgb(236,90,91)] select-none">{state.btnContent}</div>
                </div>
                {state.isSentEmailSuccess === 0 && (
                    <div className="my-4 text-[13px] underline text-center cursor-pointer select-none">Forgot password?</div>
                )}
            </div>
        </div>
    );
};

export default Login;