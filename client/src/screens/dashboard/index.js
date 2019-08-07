import { lazy } from 'react';

const dashboardScreenLazy = lazy(() => import(/* webpackChunkName: "dashboard" */ './dashboard'));

export default dashboardScreenLazy;
