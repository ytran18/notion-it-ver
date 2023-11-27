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

export const getSinglePage = async ( id ) => {
    let rs;
    await fetch(`${api}/page/get/single/${id}`, { 
        method: "GET", 
    }).then((response) => {
        return response.json();
    }).then(data => {
        rs = data;
    })
    return rs;
};

export const addPage = async ( data ) => {
    let rs;
    await fetch(`${api}/page/add`, { 
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

export const deletePage = async ( id ) => {
    let rs;
    await fetch(`${api}/page/remove`, { 
        method: "POST",
        body: JSON.stringify(id),
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

export const deletePagePernament = async ( id ) => {
    let rs;
    await fetch(`${api}/page/remove/page`, { 
        method: "DELETE",
        body: JSON.stringify(id),
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

export const recoverPageFromTrash = async ( id ) => {
    let rs;
    await fetch(`${api}/page/recover`, { 
        method: "POST",
        body: JSON.stringify(id),
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

export const handleFavoritePage = async ( data ) => {
    let rs;
    await fetch(`${api}/page/favorite`, { 
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

export const duplicatePage = async ( id ) => {
    let rs;
    await fetch(`${api}/page/duplicate`, { 
        method: "POST",
        body: JSON.stringify(id),
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