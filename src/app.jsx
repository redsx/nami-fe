import React from 'react';
import {Provider} from 'react-redux';
import { 
  IntlProvider,
  addLocaleData,
} from 'react-intl';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import chooseLocale from './locales/index';
import store from './store/index.js';
// pages
import Login from './pages/login/login';

function App(props) {
  const appLocale = chooseLocale(props.lang);
  addLocaleData(appLocale);

  return (
    <Provider store={store}>
      <IntlProvider
        locale={appLocale.locale}
        messages={appLocale.messages}
        formats={appLocale.formats}
      >
        <Router>
          <div>
            <Route path="/" />
            <Route path="/login"  component={Login} />
          </div>
        </Router>
      </IntlProvider>
    </Provider>
  ); 
}

export default App;