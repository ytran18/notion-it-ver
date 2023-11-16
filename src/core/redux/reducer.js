import { PAGE_SELECT, CLEAR, USER_LOGIN } from "./constants";

const pageState = {
    page: '',
};

const userState = {
    user: {},
};

export const pageReducer = (state = pageState, action) =>
{
    switch (action.type)
    {
        case PAGE_SELECT:{
            return { ...state, page: action.payload }
        }
        case CLEAR:{
            return {
                page: {}
            }
        }
        default:
            return state
    }
};

export const userReducer = (state = userState, action) =>
{
    switch (action.type)
    {
        case USER_LOGIN:{
            return { ...state, user: action.payload }
        }
        case CLEAR:{
            return {
                user: {}
            }
        }
        default:
            return state
    }
};