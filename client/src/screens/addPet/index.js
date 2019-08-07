import { lazy } from 'react';

const addPetScreenLazy = lazy(() => import(/* webpackChunkName: "addPet" */ './addPet'));

export default addPetScreenLazy;
