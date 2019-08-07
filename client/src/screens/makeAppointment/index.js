import { lazy } from 'react';

const makeAppointmentScreenLazy = lazy(() => import(/* webpackChunkName: "makeAppointment" */ './makeAppointment'));

export default makeAppointmentScreenLazy;
