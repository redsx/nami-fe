import React, { Component } from 'react';
import immutable from 'immutable';
import autobind from 'autobind-decorator';
import {intlShape, injectIntl, defineMessages, FormattedMessage} from 'react-intl';
import InputContainer from './InputContainer.jsx';
import SignOwl from '../../components/SignOwl.jsx';
import { checkUser, login, signUp } from '../../actions/socket/user';
import socket from '../../config/socket';

const message = defineMessages({
  login: {
    id: 'login.login',
    defaultMessage: 'login',
  },
  signUp: {
    id: 'login.signUp',
    defaultMessage: 'signUp',
  },
  password: {
    id: 'login.password',
    defaultMessage: 'password',
  },
  nickname: {
    id: 'login.nickname',
    defaultMessage: 'nickname',
  },
  nickname: {
    id: 'login.nickname',
    defaultMessage: 'nickname',
  },
});

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      errorInput: immutable.fromJS({}),
      loginDisabled: true,
      isFocus: false,
    };
  }
  @autobind
  handleChekUser(nickname, forceImplement = false) {
    if(this.isCalled && !forceImplement) return;
    checkUser({ nickname }).then((res) => {
      this.isCalled = false;
      if(res.status === 1002) {
        this.setState(() => ({loginDisabled: true}));
      } else if (res.status === 1001) {
        this.setState(() => ({loginDisabled: false}));
      }
      console.log('chekuser cb: ', res);
    });
  }
  @autobind
  handleBlur(e){
    const target = e.target || {};
    const nickname = target.value;
    this.handleChekUser(nickname);
  }
  @autobind
  handleChange(e){
    const target = e.target || {};
    const nickname = target.value;
    this.handleChekUser(nickname);
  }
  @autobind
  handleCheckParam({nickname = '', password = ''}) {
    if(!nickname) {
      // 提示错误
      return false;
    }
    if(!password) {
      // 提示错误
      return false;
    }
    return true;
  }
  @autobind
  handleSign(info){
    if(!this.isSingning) {
      this.isSingning = true;
      (() => this.state.loginDisabled ? signUp(info) : login(info))()
        .then((res)=>{
          this.isSingning = false;
          console.log(res);
          if(res.status === 0) {
            localStorage.setItem('token', resault.token);
            // mergeUserInfo({token: resault.token});
            // browserHistory.push('/');
          } else {
            // 提示错误
          }
        })
        .catch((err)=>{
          this.isSingning = false;
          // 提示错误
        });
    } else {
      // 提示正在登录
    }
  }
  @autobind
  handleClick(isLogin){
    return () => {
      // this.state.loginDisabled
      if(isLogin && this.state.loginDisabled) {
        // 提示该账号不存在，点击注册可注册该账号
        console.log('提示该账号不存在，点击注册可注册该账号');
      }
      if(!isLogin && !this.state.loginDisabled) {
        // 提示该账号已存在，点击登录可登录该账号
        console.log('提示该账号已存在，点击登录可登录该账号');
      }
      const nickname = this.nickname.value? this.nickname.value.trim() : '';
      const password = this.password.value? this.password.value.trim() : '';
      if(this.handleCheckParam({nickname, password})) {
        this.handleSign({nickname, password});
      }
    };
  }
  render(){
    const { errorInput, loginDisabled } = this.state;
    const { handleBlur, handleChange } = this;
    const {formatMessage} = this.props.intl;
    return (
      <div className = 'sign-container'>
        <div className = 'sign'>
          <div className = 'login-SignOwl'>
            <SignOwl isFocus = {this.state.isFocus}/>
          </div>
          <div className = 'sign-pad'>
            <InputContainer>
              <label className = 'sign-control-label'><i className = 'icon sign-icon'>&#xe92e;</i></label>
              <input
                autoComplete='off'
                name = 'nickname'
                placeholder = {formatMessage(message.nickname)}
                ref = {ref => this.nickname = ref}
                onBlur = {(e)=>handleBlur(e)}
                onChange = {(e)=>handleChange(e)}
                className = {errorInput.get('nickname') ? 'login-error-input' : ''}
              />
            </InputContainer>
            <InputContainer>
              <label className = 'sign-control-label'><i className = 'icon sign-icon'>&#xe90c;</i></label>
              <input
                autoComplete='off'
                name = 'password'
                type = 'password' 
                placeholder = {formatMessage(message.password)}
                ref = {ref => this.password = ref}
                onFocus = {()=>this.setState({isFocus:true})}
                onChange = {(e)=>handleChange(e)}
                onBlur = {(e)=>{
                  handleBlur(e);
                  this.setState({isFocus:false});
                }}
                className = {errorInput.get('password') ? 'login-error-input' : ''}
              />
            </InputContainer>
          </div>
          <div className = 'sign-actions'>
            <button 
              className = {loginDisabled ? 'sign-in-disabled' : 'sign-in-btn'}
              onClick = {this.handleClick(true)}
            > 
              <span>{formatMessage(message.login)}</span>
            </button>
            <button 
              className = {!loginDisabled ? 'sign-up-disabled' : 'sign-up-btn'}
              onClick = {this.handleClick(false)}
            > 
              <span>{formatMessage(message.signUp)}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default injectIntl(Login);