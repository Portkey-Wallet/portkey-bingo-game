import { message } from 'antd';

export const displayMessageOnce = (msg: string, type: 'success' | 'error' | 'warning' | 'info' = 'error') => {
  message.destroy(msg);
  message[type]({ content: msg, key: msg });
};
