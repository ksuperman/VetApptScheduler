import React from 'react';
import { AppContextConsumer, APP_CONTEXT_PROP_NAME } from './ApplicationContext';

/**
 * Decorator method to extract `theme` from context and inject that prop into `ChildComponent`.
 * @param ChildComponent [ReactElement] The Child Component that has the injected with the `theme` property.
 **/
const appContext = ChildComponent => (
    function ComponentWithAppContext(props) {
        return (
            <AppContextConsumer>
                {contexts => <ChildComponent {...props} {...contexts} />}
            </AppContextConsumer>
        );
    }
);

export { APP_CONTEXT_PROP_NAME };

export default appContext;
