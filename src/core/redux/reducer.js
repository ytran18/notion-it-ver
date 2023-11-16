import { PAGE_SELECT } from "./constants";

const pageState = {
    page: '',
};

export const pageReducer = (state = pageState, action) =>
{
    switch (action.type)
    {
        case PAGE_SELECT:{
            return {...state, page: action.payload}
        }
        // case CLEAR:{
        //     return {
        //         user: {}
        //     }
        // }
        default:
            return state
    }
}