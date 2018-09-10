import appLocaleData from 'react-intl/locale-data/zh';

export default {
  locale: 'zh-CN',
  data: appLocaleData,
  formats: {},
  pluralRuleFunction: function() {},
  messages: {
    'error': '系统打瞌睡了~',
    'loading': '加载中，请不要重复点击~',

    'login.login': '登录',
    'login.signUp': '注册',
    'login.email': '邮件',
    'login.nickname': '昵称',
    'login.password': '密码',
    'login.nickname.error': '昵称错误',
    'login.account.existed': '提示该账号已存在，点击登录可登录该账号',
    'login.account.not.existed': '提示该账号不存在，点击注册可注册该账号',
    'login.password.error': '密码错误',
    'login.error': '登录失败',

  },
};