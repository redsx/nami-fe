import React from 'react';

function SignOwl(props){
  return(
    <div className = 'login-owl-container'>
      <div className = {props.isFocus? 'login-owl password':'login-owl'}>
        <div className = 'login-hand login-hand-focus'></div>
        <div className = 'login-hand-r login-hand-r-focus'></div>
        <div className = 'login-arms'>
          <div className = 'login-arm login-arm-focus'></div>
          <div className = 'login-arm-r login-arm-r-focus'></div>
        </div>
      </div>
    </div>
  );
}

export default SignOwl;