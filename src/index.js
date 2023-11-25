import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import './App.css';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from '~/components/GlobalStyles/GlobalStyles';
import ErrorBoundary from './ErrorBoundary.jsx';

import { Provider } from 'react-redux';
import store from '~/redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ErrorBoundary fallback="Error  ^_^....">
            <GlobalStyles>
                <Provider store={store}>
                    <App />
                </Provider>
            </GlobalStyles>
        </ErrorBoundary>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
