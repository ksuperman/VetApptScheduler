import { lazy } from 'react';

const homeScreenLazy = lazy(() => import(/* webpackChunkName: "home" */ './home'));

export default homeScreenLazy;
