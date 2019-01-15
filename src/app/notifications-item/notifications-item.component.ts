import { Component, OnInit, Input } from '@angular/core';

import { NotificationItemDisplay, NotificationItem } from '../notification-item';

@Component({
  selector: 'app-notifications-item',
  templateUrl: './notifications-item.component.html',
  styleUrls: ['./notifications-item.component.scss']
})
export class NotificationsItemComponent implements OnInit {
  @Input() notification: NotificationItem;

  notificationDisplay: NotificationItemDisplay;

  constructor() { }

  ngOnInit() {
    this.notificationDisplay = new NotificationItemDisplay(this.notification);
  }

}
