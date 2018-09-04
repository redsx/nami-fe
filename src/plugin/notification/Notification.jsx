import React, { Component } from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import TransitionGroup  from 'react-transition-group/TransitionGroup';
import CSSTransition from 'react-transition-group/CSSTransition';
import Notice from './Notice';

function getUuid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notices: [],
    };
  }
  render() {
    const { className } = this.props;
    return (
      <TransitionGroup className={className}>
        {
          this.state.notices.map((notice, index) => {
            return (
              <CSSTransition
                timeout = {500}
                classNames= {className}
                key = {notice.key}
              >
                <Notice
                  className = {notice.className}
                  duration = {notice.duration}
                  onClose = {notice.onClose}
                  onEnd = {() => this.remove(notice.key)}
                  style = {notice.style}
                >
                  {notice.content}
                </Notice>
              </CSSTransition>
            );
          })
        }
      </TransitionGroup>
    );
  }
  newInstance(props = {}) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const notification = render(<Notification {...props}/>, div);
    return  {
      component: notification,
      add: notification.add.bind(notification),
      remove: notification.remove.bind(notification),
      destroy() {
        unmountComponentAtNode(div);
        document.body.removeChild(div);
      },
    };
  }
  add(notice) {
    const key = notice.key = notice.key || getUuid();
    const notices = this.state.notices;
    if (!(notices.filter(item => item.key === key)).length) {
      this.setState({
        notices: notices.concat(notice),
      });
    }
    return key;
  }
  remove(key) {
    const notices = this.state.notices.filter(notice => notice.key !== key);
    this.setState({ notices });
  }
}