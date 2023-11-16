import { useSelector } from 'react-redux';
import { pagePackageSelector } from '../selectors';

export const usePagePackageHook = () => {
    return useSelector(pagePackageSelector);
};