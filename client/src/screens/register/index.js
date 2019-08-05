import { lazy } from 'react';

const registerScreenLazy = lazy(() => import(/* webpackChunkName: "register" */ './register'));

export default registerScreenLazy;
