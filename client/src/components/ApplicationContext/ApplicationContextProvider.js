import React, { useReducer } from 'react';
import { AppContextProvider, defaultAppContext, APP_CONTEXT_PROP_NAME } from './ApplicationContext';

/**
 * Restore the
 */
const initialState = { ...defaultAppContext, user: window.__INITIAL_STATE__ };

function reducer(state, action) {
    console.log('reducer ==> action', action);

    switch (action.type) {
    case 'LOGIN_USER':
        return { ...state, user: action.user };
    case 'LOGOUT_USER':
        return { ...state, user: {} };
    default:
        return { ...state };
    }
}

const ApplicationContextProvider = ({ ...props }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <AppContextProvider
            value={{
                [APP_CONTEXT_PROP_NAME]: {
                    ...state,
                    dispatch,
                },
            }}
        >
            {props.children}
        </AppContextProvider>
    );
};

export default ApplicationContextProvider;
