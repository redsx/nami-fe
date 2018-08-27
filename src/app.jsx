import React from 'react';
import { 
  IntlProvider,
  addLocaleData,
  FormattedMessage,
} from 'react-intl';
import chooseLocale from './locales/index';

function App(props) {
  const appLocale = chooseLocale(props.lang);
  addLocaleData(appLocale);

  return (
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
  ); 
}

export default App;