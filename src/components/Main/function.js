const api = process.env.REACT_APP_API_SERVER;

export const changePageTitle = async ( value ) => {
    let rs;
    await fetch(`${api}/page/title/update`, { 
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