import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';

import { NotificationsService } from '../notifications.service';
import { NotificationItem } from '../notification-item';

@Component({
  selector: 'app-notifications-container',
  templateUrl: './notifications-container.component.html',
  styleUrls: ['./notifications-container.component.scss']
})
export class NotificationsContainerComponent implements OnInit {
  notifications: NotificationItem[] = [];

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit() {
  }

  toggleNotifications() {
    this.notificationsService.getAll()
      .subscribe(notifications => {
        this.notifications = notifications;
      });
  }
}
