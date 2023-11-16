export const selectUserReducer = (state) => {
    return state.userReducer;
};

export const userPackageSelector = (state) => {
    return selectUserReducer(state).user;
};