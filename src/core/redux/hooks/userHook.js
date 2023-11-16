import { useSelector } from 'react-redux';
import { userPackageSelector } from '../selectors';

export const useUserPackageHook = () => {
    return useSelector(userPackageSelector);
};