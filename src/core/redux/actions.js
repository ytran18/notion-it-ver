import { PAGE_SELECT, USER_LOGIN, CLEAR } from './constants';

export const pagePackage = (page) => ({
    type: PAGE_SELECT,
    payload: page,
});

export const userPackage = (user) => ({
    type: USER_LOGIN,
    payload: user,
});

// remove all state of a reducer
export const clear = () => ({
    type: CLEAR,
})