export const selectPageReducer = (state) => {
    return state.pageReducer;
};

export const pagePackageSelector = (state) => {
    return selectPageReducer(state).page;
};