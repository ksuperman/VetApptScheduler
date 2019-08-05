import { lazy } from 'react';

const loginScreenLazy = lazy(() => import(/* webpackChunkName: "login" */ './login'));

export default loginScreenLazy;
