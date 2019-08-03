const NotificationType = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
};

const NotificationTitle = {
  saveSucceeded: '保存完了',
  copySucceeded: 'コピー完了',
};

export default class Notification {
  constructor(
    public type: string,
    public title: string,
    public message: string,
  ) { }

  static createOnSaveSucceeded(message: string) {
    return new Notification(
      NotificationType.success,
      NotificationTitle.saveSucceeded,
      message,
    );
  }

  static createOnCopySucceeded(message: string) {
    return new Notification(
      NotificationType.success,
      NotificationTitle.copySucceeded,
      message,
    );
  }
}
