const api = process.env.REACT_APP_API_SERVER;

export const signupWithEmail = async( data ) => {
    const rs = fetch(`${api}/sign-up/mail/check?type=mail`, { 
        method: "POST", 
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => {
        return response;
    })
    return rs;
};