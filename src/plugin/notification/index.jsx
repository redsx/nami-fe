import React from 'react';
import Notification from './Notification';

const prefixCls = 'nami';
const notificationInstance = (new Notification({})).newInstance({className: prefixCls});

export default {
  open(args) {
    return notificationInstance.add({
      duration: args.duration || 3,
      content: <span className = {`${prefixCls}-notice`}>{args.message}</span>,
      className: `${prefixCls}-notice-container`,
    });
  },
  close(key) {
    notificationInstance.remove(key);
  }
};