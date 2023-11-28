import axios from "axios";

const api = process.env.REACT_APP_API_SERVER;

export const changePageTitle = async ( value ) => {
    let rs;
    await axios.post(`${api}/page/title/update`, value, {
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

export const updatePageCover = async ( value ) => {
    let rs;
    await axios.post(`${api}/page/bg-cover/upload`, value, {
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

export const updateIcon = async ( value ) => {
    let rs;
    await axios.post(`${api}/page/icon/upload`, value, {
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