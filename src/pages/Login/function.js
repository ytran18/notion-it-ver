const api = process.env.REACT_APP_API_SERVER;

export const signupWithEmail = async ( value ) => {
    let rs;
    await fetch(`${api}/sign-up/mail/check?type=mail`, { 
        method: "POST", 
        body: JSON.stringify(value),
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

export const verifyLoginCode = async ( data ) => {
    let rs;
    await fetch(`${api}/sign-up/mail/verify`, { 
        method: "POST", 
        body: JSON.stringify(data),
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