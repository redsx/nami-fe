import React, { Component } from 'react';
import { Link } from 'react-router';
import autobind from 'autobind-decorator';
import InputContainer from './InputContainer.jsx';
import SignOwl from '../../components/SignOwl.jsx';
import '../../less/sign.less';

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {isFocus: false};
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
        pushSnackbar(language[err]);
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
    let { handleBlur, handleChange, errorInput, btnDisabled } = this.props;
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
                name = 'email' 
                type = 'email' 
                placeholder = {language.email} 
                ref = {ref => this.email = ref}
                onBlur = {(e)=>handleBlur(e)}
                onChange = {(e)=>handleChange(e)}
                className = {errorInput.get('email') ? 'login-error-input' : ''}
              />
            </InputContainer>
            <InputContainer>
              <label className = 'sign-control-label'><i className = 'icon sign-icon'>&#xe90c;</i></label>
              <input 
                name = 'password'
                type = 'password' 
                placeholder = {language.password}
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
            <span className = 'sign-link-btn'><Link to = '/signup'>{language.SignUp}</Link></span>
            <button className = {btnDisabled?'sign-btn-disabled':'sign-btn'} onClick = {this.handleClick} disabled = {btnDisabled}> {language.Login} </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;