import * as Page from './pages';

const AppRoutes = [
    {
        path: '/',
        Component: Page?.LoginPage,
        header: true,
    },
    {
        path: '/login',
        Component: Page?.LoginPage,
        header: true,
    }
];

export default AppRoutes;