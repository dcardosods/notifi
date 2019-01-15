import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-notifications-item',
  templateUrl: './notifications-item.component.html',
  styleUrls: ['./notifications-item.component.scss']
})
export class NotificationsItemComponent implements OnInit {
  @Input() notification;

  isSeen;
  users;
  title: string;
  time: string;
  comment: string;
  count: number;

  constructor() { }

  ngOnInit() {
    if (this.notification.birthday) {
      this.isSeen = _.every(this.notification.birthday, {seen: true});
      this.users = _.map(this.notification.birthday, 'userInNotification');
      this.title = this.users[0].firstName
        + (this.users.length > 1 ? ' and ' + (this.users.length - 1) + ' others' : '')
        + ' have <b>birthday</b>';
      this.time = this.notification.birthday[0].updatedOn;
      this.count = this.notification.birthday.length;
    } else if (this.notification.project_commented) {
      this.isSeen = _.every(this.notification.project_commented, {seen: true});
      this.users = _.map(this.notification.project_commented, 'responsibleUser');
      this.title = this.users[0].firstName
        + (this.users.length > 1
            ? ' and ' + (this.users.length - 1) + ' others'
            : '')
        + ' <b>commented</b>'
        + (this.notification.project_commented.length > 1
            ? ' to one of your <b>projects</b>'
            : ' to your <b>project</p>');
      this.time = this.notification.project_commented[0].updatedOn;
      this.comment = this.notification.project_commented[0].comment.comment;
      this.count = this.notification.project_commented.length;
    } else if (this.notification.task_status_changed) {
      this.isSeen = _.every(this.notification.task_status_changed, {seen: true});
      this.users = _.map(this.notification.task_status_changed, 'responsibleUser');
      this.title = this.users[0].firstName
        + (this.users.length > 1 ? ' and ' + (this.users.length - 1) + ' others' : '')
        + ' <b>updated the status</b>'
        + (this.notification.task_status_changed.length > 1
          ? ' of one of your <b>tasks</b>'
          : ' of your <b>task</p>');
      this.time = this.notification.task_status_changed[0].updatedOn;
      this.comment = this.notification.task_status_changed[0].taskStatus.name;
      this.count = this.notification.task_status_changed.length;
    } else if (this.notification.project_due) {
      this.isSeen = _.every(this.notification.project_due, {seen: true});
      this.users = [];
      this.title = (this.notification.project_due.length > 1
          ? 'One of your <b>projects</b>'
          : 'Your <b>project</b>')
        + ' is due';
      this.time = this.notification.project_due[0].updatedOn;
      this.comment = '';
      this.count = this.notification.project_due.length;
    }
  }

}
