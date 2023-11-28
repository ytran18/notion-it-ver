import axios from "axios";

const api = process.env.REACT_APP_API_SERVER;

export const signupWithEmail = async ( value ) => {
    let rs;
    await axios.post(`${api}/sign-up/mail/check?type=mail`, value, {
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json;charset=UTF-8",
        },
    })
    .then(({data}) => {
        rs = data;
    })
    return rs;
};

export const verifyLoginCode = async ( data ) => {
    let rs;
    await axios.post(`${api}/sign-up/mail/verify`, data, {
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json;charset=UTF-8",
        },
    })
    .then(({data}) => {
        rs = data;
    })
    return rs;
};

export const loginWithGoogle = async () => {
    let rs;
    await fetch(`${api}/log-in/auth/google`, { 
        method: "GET", 
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => {
        return response.json();
    }).then(data => {
        rs = data;
    })
    return rs;
};