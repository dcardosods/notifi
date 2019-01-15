import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import * as _ from 'lodash';

import { NotificationsService } from '../notifications.service';

@Component({
  selector: 'app-notifications-container',
  templateUrl: './notifications-container.component.html',
  styleUrls: ['./notifications-container.component.scss']
})
export class NotificationsContainerComponent implements OnInit {
  notifications: any[] = [];

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit() {
  }

  toggleNotifications() {
    this.notificationsService.getAll()
      .subscribe(notifications => {
        this.notifications = this.groupNotifications(notifications);
        console.log(this.notifications);
      });
  }

  private groupNotifications(notifications) {
    const orderedByDay = _.orderBy(notifications, ['updatedOn'], ['desc']);
    const groupedByDay = _.groupBy(orderedByDay, item => item.updatedOn.replace(/^(\d{4}-\d{2}-\d{2})(.+)$/, '$1'));
    const groupedByEvent = _.map(groupedByDay, group => _.groupBy(group, 'event'));
    const normalized = _.map(groupedByEvent, group => {
      const event = Object.keys(group)[0];
      return {
        event,
        items: group[event]
      };
    });
    return normalized;
  }
}
