import React, { Component, Suspense } from 'react';
import ApplicationContextProvider from './components/ApplicationContext/ApplicationContextProvider';
import Router from './routers';
import Loading from './components/Loading';
import './normailize.css';

class App extends Component {
    render() {
        return (
            <Suspense fallback={<Loading />}>
                <ApplicationContextProvider>
                    <Router />
                </ApplicationContextProvider>
            </Suspense>
        );
    }
}

export default App;
