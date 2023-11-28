import axios from "axios";

const api = process.env.REACT_APP_API_SERVER;

export const getPage = async ( id ) => {
    let rs;
    await axios.get(`${api}/page/get/all/${id}`, {
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

export const getSinglePage = async ( id ) => {
    let rs;
    await axios.get(`${api}/page/get/single/${id}`, {
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

export const addPage = async ( data ) => {
    let rs;
    await axios.post(`${api}/page/add`, data, {
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

export const deletePage = async ( id ) => {
    let rs;
    await axios.post(`${api}/page/remove`, id, {
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

export const deletePagePernament = async ( id ) => {
    let rs;
    await axios.post(`${api}/page/remove/page`, id, {
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

export const recoverPageFromTrash = async ( id ) => {
    let rs;
    await axios.post(`${api}/page/recover`, id, {
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

export const handleFavoritePage = async ( data ) => {
    let rs;
    await axios.post(`${api}/page/favorite`, data, {
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

export const duplicatePage = async ( id ) => {
    let rs;
    await axios.post(`${api}/page/duplicate`, id, {
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