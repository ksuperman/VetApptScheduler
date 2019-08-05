import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './screens/home';
import Login from './screens/login';
import Register from './screens/register';

const Router = ({ requestURI }) => (
    <BrowserRouter basename={requestURI}>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
    </BrowserRouter>
);

export default Router;
