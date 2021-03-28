import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from '../../shared/input.constants';
import { createRequestOption } from '../../shared/request-util';
import { INotification } from '../../data/interfaces/models';

import {environment} from '../../../environments/environment';
import { SERVER_ENDPOINT } from '../variables';

type NotificationResponseType = HttpResponse<INotification>;
type NotificationArrayResponseType = HttpResponse<INotification[]>;

@Injectable()
export class RestNotificactionService {
  public notificationEndpoint   = SERVER_ENDPOINT + 'notification';
  public findByProjectEndpoint  = this.notificationEndpoint + '/findByProject';

  constructor(protected http: HttpClient) {}

  create(notification: INotification): Observable<NotificationResponseType> {
    const copy = this.convertDateFromClient(notification);
    return this.http
      .post<INotification>(this.notificationEndpoint, copy, { observe: 'response' })
      .pipe(map((res: NotificationResponseType) => this.convertDateFromServer(res)));
  }

  update(chat: INotification): Observable<NotificationResponseType> {
    const copy = this.convertDateFromClient(chat);
    return this.http
      .put<INotification>(this.notificationEndpoint, copy, { observe: 'response' })
      .pipe(map((res: NotificationResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<NotificationResponseType> {
    return this.http
      .get<INotification>(`${this.notificationEndpoint}/${id}`, { observe: 'response' })
      .pipe(map((res: NotificationResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<NotificationArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<INotification[]>(this.notificationEndpoint, { params: options, observe: 'response' })
      .pipe(map((res: NotificationArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

 findAllByProjectId(id: number, req?: any): Observable<NotificationArrayResponseType> {
    let options = createRequestOption(req);
    return this.http
      .get<INotification[]>(`${this.findByProjectEndpoint}/${id}`, { params: options, observe: 'response' })
      .pipe(map((res: NotificationArrayResponseType) => this.convertDateArrayFromServer(res)));
  }
  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.notificationEndpoint}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(notification: INotification): INotification {
    const copy: INotification = Object.assign({}, notification, {
      dueDate: notification.dueDate != null && notification.dueDate.isValid() ? notification.dueDate.format(DATE_FORMAT) : null,
      emittedDate: notification.emittedDate != null && notification.emittedDate.isValid() ?
                   notification.emittedDate.format(DATE_FORMAT) : null,
      readDate: notification.readDate != null && notification.readDate.isValid() ? notification.readDate.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: NotificationResponseType): NotificationResponseType {
    if (res.body) {
      res.body.dueDate      = res.body.dueDate != null ? moment(res.body.dueDate) : null;
      res.body.emittedDate  = res.body.emittedDate != null ? moment(res.body.emittedDate) : null;
      res.body.readDate     = res.body.readDate != null ? moment(res.body.readDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: NotificationArrayResponseType): NotificationArrayResponseType {
    if (res.body) {
      res.body.forEach((notification: INotification) => {
        notification.dueDate = notification.dueDate != null ? moment(notification.dueDate) : null;
        notification.emittedDate = notification.emittedDate != null ? moment(notification.emittedDate) : null;
        notification.readDate = notification.readDate != null ? moment(notification.readDate) : null;
      });
    }
    return res;
  }
}
