import { NotificationManager } from 'react-notifications';

import { Notification } from '../models';

const timeout = 5000;

export default function (notification: Notification) {
  switch (notification.type) {
    case 'info':
      NotificationManager.info(
        notification.message,
        notification.title,
        timeout,
      );
      break;
    case 'success':
      NotificationManager.success(
        notification.message,
        notification.title,
        timeout,
      );
      break;
    case 'warning':
      NotificationManager.warning(
        notification.message,
        notification.title,
        timeout,
      );
      break;
    case 'error':
      NotificationManager.error(
        notification.message,
        notification.title,
        timeout,
      );
      break;
  }
}
