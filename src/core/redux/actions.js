import { PAGE_SELECT } from './constants';

export const pagePackage = (page) => ({
    type: PAGE_SELECT,
    payload: page,
});