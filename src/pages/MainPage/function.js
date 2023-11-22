const api = process.env.REACT_APP_API_SERVER;

export const getPage = async ( id ) => {
    let rs;
    await fetch(`${api}/page/get/all/${id}`, { 
        method: "GET", 
    }).then((response) => {
        return response.json();
    }).then(data => {
        rs = data;
    })
    return rs;
};