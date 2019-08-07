import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from '../screens/home';
import Login from '../screens/login';
import Register from '../screens/register';
import Dashboard from '../screens/dashboard';
import MakeAppointment from '../screens/makeAppointment';
import AddPet from '../screens/addPet';

const Router = ({ requestURI }) => (
    <BrowserRouter basename={requestURI}>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/makeAppointment" component={MakeAppointment} />
        <Route path="/addpet" component={AddPet} />
    </BrowserRouter>
);

export default Router;
