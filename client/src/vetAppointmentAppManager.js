import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


class VetAppointmentAppManager {
    constructor(appRootElementSelector = 'app-root') {
        this.appRootElement = document.getElementById(appRootElementSelector);
        this.overrideContainerStyles();
    }

    overrideContainerStyles = () => {
        this.appRootElement.style.width = '100%';
        this.appRootElement.style.height = '100%';
    };

    render = () => {
        const {
            appRootElement,
        } = this;
        ReactDOM.render(<App />, appRootElement);
    };

    unmount = () => {
        const {
            appRootElement,
        } = this;
        ReactDOM.unmountComponentAtNode(appRootElement);
    };
}

export default VetAppointmentAppManager;
