import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';

import { environment } from '../environments/environment';
import { NotificationItem } from './notification-item';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<NotificationItem[]> {
    return this.http.get(`${environment.apiUrl}/CodeChallenge`)
      .pipe(map(this.groupNotifications));
  }

  private groupNotifications(notifications): NotificationItem[] {
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
