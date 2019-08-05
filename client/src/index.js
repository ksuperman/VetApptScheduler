/**
 * Method to Register the Service worker in the browser.
 */
const registerServiceWorker = async () => {
    const { navigator = {} } = window;

    if ('serviceWorker' in navigator) {
        try {
            const { scope } = await navigator.serviceWorker.register('/service-worker.js');
            console.debug('React-Onboarding', 'registerServiceWorker', 'ServiceWorker registration successful with scope', scope);
        } catch (err) {
            // registration failed :(
            console.error('React-Onboarding', 'registerServiceWorker', 'ServiceWorker registration failed: ', err);
        }
    }
};

/**
 * Method to Initialize the Application on the client side.
 */
const initApp = async () => {
    const { default: VetAppointmentApp } = await import(/* webpackChunkName: "VetAppointmentApp" */ './vetAppointmentAppManager');
    const vetAppointmentApp = new VetAppointmentApp();
    // Render the Application
    vetAppointmentApp.render();
    // Register the service workers.
    registerServiceWorker();
};

initApp();
