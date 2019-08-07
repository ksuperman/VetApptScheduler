import React from 'react';

export const APP_CONTEXT_PROP_NAME = 'appContext';

export const defaultAppContext = {
    user: {},
    dispatch: () => {},
};

const ApplicationContext = React.createContext(
// default values used by a Consumer when it does not have a
// matching Provider above it in the tree, useful for testing
    {
        [APP_CONTEXT_PROP_NAME]: {},
    },
);

export const AppContextProvider = ApplicationContext.Provider;

export const AppContextConsumer = ApplicationContext.Consumer;
