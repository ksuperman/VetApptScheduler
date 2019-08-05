import React, { Component, Suspense } from 'react';
import Router from './router';
import Spinner from './components/Spinner';
import './normailize.css';

class App extends Component {
    render() {
        return (
            <Suspense fallback={<Spinner />}>
                <Router />
            </Suspense>
        );
    }
}

export default App;
