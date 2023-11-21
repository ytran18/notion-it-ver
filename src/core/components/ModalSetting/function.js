const api = process.env.REACT_APP_API_SERVER;

export const changeAvatar = async ( value ) => {
    let rs;
    await fetch(`${api}/user/avatar/upload`, { 
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