import React, { Component } from 'react';
import immutable from 'immutable';
import autobind from 'autobind-decorator';
import {intlShape, injectIntl, defineMessages, FormattedMessage} from 'react-intl';
import InputContainer from './InputContainer.jsx';
import SignOwl from '../../components/SignOwl.jsx';

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
  email: {
    id: 'login.email',
    defaultMessage: 'email',
  },
});

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      errorInput: immutable.fromJS({}),
      btnDisabled: false,
      isFocus: false,
    };
  }
  @autobind
  handleBlur(e, name){
    let target = e.target || {};
    name = name || target.name;
    if(target.value === null || target.value === ''){
      this.setState({
        errorInput: this.state.errorInput.set(name, true)
      });
    }
  }
  @autobind
  handleChange(e, name){
    let target = e.target || {};
    name = name || target.name;
    if(target.value !== '' && this.state.errorInput.get(name)){
      this.setState({
        errorInput: this.state.errorInput.set(name, false)
      });
    }
  }
  @autobind
  handleSign(info, isLogin){
    this.setState({btnDisabled: true});
    (() => isLogin? login(info) : signUp(info))()
      .then((resault)=>{
        localStorage.setItem('token', resault.token);
        mergeUserInfo({token: resault.token});
        browserHistory.push('/');
      })
      .catch((err)=>{
        this.setState({btnDisabled: false});
        // pushSnackbar(language[err]);
      });
  }
  @autobind
  handleClick(){
    let email = this.email.value? this.email.value.trim() : '',
      password = this.password.value? this.password.value.trim() : '';
    if(email && password){
      this.props.handleSign({email, password}, true);
    }
  }
  render(){
    let { errorInput, btnDisabled } = this.state;
    let { handleBlur, handleChange } = this;
    let {formatMessage} = this.props.intl;
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
                name = 'email' 
                type = 'email' 
                placeholder = {formatMessage(message.email)}
                ref = {ref => this.email = ref}
                onBlur = {(e)=>handleBlur(e)}
                onChange = {(e)=>handleChange(e)}
                className = {errorInput.get('email') ? 'login-error-input' : ''}
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
            {/* <span className = 'sign-link-btn'><Link to = '/signup'>{formatMessage(message.signUp)}</Link></span> */}
            <button className = {btnDisabled?'sign-btn-disabled':'sign-btn'} onClick = {this.handleClick} disabled = {btnDisabled}> {formatMessage(message.login)} </button>
          </div>
        </div>
      </div>
    );
  }
}
export default injectIntl(Login);