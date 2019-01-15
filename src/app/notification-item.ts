import * as _ from 'lodash';

export enum NotificationItemEvent {
  birthday = 'birthday',
  project_commented = 'project_commented',
  project_due = 'project_due',
  task_status_changed = 'task_status_changed'
}

export class NotificationItem {
  event: NotificationItemEvent;
  items: any[];
}

export class NotificationItemDisplay {
  isSeen = false;
  users = [];
  title = '';
  time = '';
  comment = '';
  count = 0;

  constructor(notification: NotificationItem) {
    this.isSeen = _.every(notification.items, {seen: true});
    this.time = notification.items[0].updatedOn;
    this.count = notification.items.length;

    switch (notification.event) {
      case NotificationItemEvent.birthday:
        this.users = _.map(notification.items, 'userInNotification');
        this.title = this.users[0].firstName
          + (this.users.length > 1 ? ' and ' + (this.users.length - 1) + ' others' : '')
          + ' have <b>birthday</b>';
        break;

      case NotificationItemEvent.project_commented:
        this.users = _.map(notification.items, 'responsibleUser');
        this.title = this.users[0].firstName
          + (this.users.length > 1
              ? ' and ' + (this.users.length - 1) + ' others'
              : '')
          + ' <b>commented</b>'
          + (notification.items.length > 1
              ? ' to one of your <b>projects</b>'
              : ' to your <b>project</p>');
        this.comment = notification.items[0].comment.comment;
        break;

      case NotificationItemEvent.task_status_changed:
        this.users = _.map(notification.items, 'responsibleUser');
        this.title = this.users[0].firstName
          + (this.users.length > 1 ? ' and ' + (this.users.length - 1) + ' others' : '')
          + ' <b>updated the status</b>'
          + (notification.items.length > 1
            ? ' of one of your <b>tasks</b>'
            : ' of your <b>task</p>');
        this.comment = notification.items[0].taskStatus.name;
        break;

      case NotificationItemEvent.project_due:
        this.title = (notification.items.length > 1
            ? 'One of your <b>projects</b>'
            : 'Your <b>project</b>')
          + ' is due';
        break;

      default:
        break;
    }
  }
}
