import axios from "axios";

const api = process.env.REACT_APP_API_SERVER;

export const changeAvatar = async ( value ) => {
    let rs;
    await axios.post(`${api}/user/avatar/upload`, value, {
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