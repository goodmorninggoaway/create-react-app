import React, { Component } from 'react';
import autobind from 'react-autobind';
import { Provider } from 'react-redux';
import { removeRouter, addRouter } from '@infosight/shell-api/lib/Router';
import { ThemeProvider } from 'elmer/dist/components/ThemeProvider';
import { buildUrl } from 'elmer/dist/utils/url';
import Router from './Router';
import getStore from '../utils/getStore';

/**
 * HOC (Higher-Order Component) that adds any needed contexts.
 * `Provider` adds the redux store to contexts so you can use the `connect` component.
 * `ThemeProvider` applies the correct styling
 * @param WrappedComponent
 * @return {function(*): *}
 */
function addContexts(WrappedComponent) {
    return props => (
        <Provider store={getStore()}>
            <ThemeProvider>
                <WrappedComponent {...props} />
            </ThemeProvider>
        </Provider>
    );
}

class RouterExtension extends Component {
    constructor(props) {
        super(props);
        autobind(this);
    }

    componentDidMount() {
        this.handleUpdate();
    }

    handleUpdate() {
        [
            {
                url: '/dashboards/hello-world',
                router: addContexts(Router),
                exact: false,
                appId: process.env.REACT_APP_MICROAPP_ID,
            },
        ].forEach(extension => {
            if (extension.router) {
                addRouter(extension);
            } else {
                removeRouter(extension);
            }
        });
    }

    // Always return null
    render() {
        return null;
    }
}

export default RouterExtension;
