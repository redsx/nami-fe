import React from 'react';
import {Provider} from 'react-redux';
import { 
  IntlProvider,
  addLocaleData,
  FormattedMessage,
} from 'react-intl';
import chooseLocale from './locales/index';
import store from './store/index.js';

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
        <FormattedMessage
          tagName="span"
          id="edit"
          values={{name: 'xxx'}}
          defaultMessage="{name} 是一个用于构建用户界面的 JAVASCRIPT 库。"
          description="{name} 是什么？"
        ></FormattedMessage>
      </IntlProvider>
    </Provider>
  ); 
}

export default App;