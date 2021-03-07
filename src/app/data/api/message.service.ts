import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from '../../shared/input.constants';
import { createRequestOption } from '../../shared/request-util';
import { IChatMessage } from '../../data/interfaces/models';

import {environment} from '../../../environments/environment';
import { CHAT_ENDPOINT } from '../variables';
import { IMessageProvider } from '../interfaces/message.provider';

type MessageResponseType = HttpResponse<IChatMessage>;
type MessageArrayResponseType = HttpResponse<IChatMessage[]>;

@Injectable({ providedIn: 'root' })
export class MessageService implements IMessageProvider{
  public messageEndpoint              = CHAT_ENDPOINT + 'message';
  public findAllByChatEndpoint        = this.messageEndpoint + '/findByChat';

  constructor(protected http: HttpClient) {}

  newMessage(message: IChatMessage): Observable<IChatMessage> {
    const copy = this.convertDateFromClient(message);
    return this.http
      .post<IChatMessage>(this.messageEndpoint, copy, { observe: 'response' })
      .pipe(map((res: MessageResponseType) => this.convertDateFromServer2(res)));
  }

  findAllMessagesByChat(id: number, req?: any): Observable<IChatMessage[]> {
    const options = createRequestOption(req);
    return this.http
      .get<IChatMessage[]>(`${this.findAllByChatEndpoint}/${id}`, { params: options, observe: 'response' })
      .pipe(map((res: MessageArrayResponseType) => this.convertDateArrayFromServer2(res)));
  }

  create(message: IChatMessage): Observable<MessageResponseType> {
    const copy = this.convertDateFromClient(message);
    return this.http
      .post<IChatMessage>(this.messageEndpoint, copy, { observe: 'response' })
      .pipe(map((res: MessageResponseType) => this.convertDateFromServer(res)));
  }

  update(message: IChatMessage): Observable<MessageResponseType> {
    const copy = this.convertDateFromClient(message);
    return this.http
      .put<IChatMessage>(this.messageEndpoint, copy, { observe: 'response' })
      .pipe(map((res: MessageResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<MessageResponseType> {
    return this.http
      .get<IChatMessage>(`${this.messageEndpoint}/${id}`, { observe: 'response' })
      .pipe(map((res: MessageResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<MessageArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IChatMessage[]>(this.messageEndpoint, { params: options, observe: 'response' })
      .pipe(map((res: MessageArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.messageEndpoint}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(message: IChatMessage): IChatMessage {
    const copy: IChatMessage = Object.assign({}, message, {
      emittedDate: message.emittedDate != null && message.emittedDate.isValid() ? message.emittedDate.format(DATE_FORMAT) : null,
      receivedDate: message.receivedDate != null && message.receivedDate.isValid() ? message.receivedDate.format(DATE_FORMAT) : null,
      readDate: message.readDate != null && message.readDate.isValid() ? message.readDate.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: MessageResponseType): MessageResponseType {
    if (res.body) {
      res.body.emittedDate = res.body.emittedDate != null ? moment(res.body.emittedDate) : null;
      res.body.receivedDate = res.body.receivedDate != null ? moment(res.body.receivedDate) : null;
      res.body.readDate = res.body.readDate != null ? moment(res.body.readDate) : null;
    }
    return res;
  }

  protected convertDateFromServer2(res: MessageResponseType): IChatMessage {
    if (res.body) {
      res.body.emittedDate = res.body.emittedDate != null ? moment(res.body.emittedDate) : null;
      res.body.receivedDate = res.body.receivedDate != null ? moment(res.body.receivedDate) : null;
      res.body.readDate = res.body.readDate != null ? moment(res.body.readDate) : null;
    }
    return res.body;
  }

  protected convertDateArrayFromServer(res: MessageArrayResponseType): MessageArrayResponseType {
    if (res.body) {
      res.body.forEach((message: IChatMessage) => {
        message.emittedDate = message.emittedDate != null ? moment(message.emittedDate) : null;
        message.receivedDate = message.receivedDate != null ? moment(message.receivedDate) : null;
        message.readDate = message.readDate != null ? moment(message.readDate) : null;
      });
    }
    return res;
  }

  protected convertDateArrayFromServer2(res: MessageArrayResponseType): IChatMessage[] {
    if (res.body) {
      res.body.forEach((message: IChatMessage) => {
        message.emittedDate = message.emittedDate != null ? moment(message.emittedDate) : null;
        message.receivedDate = message.receivedDate != null ? moment(message.receivedDate) : null;
        message.readDate = message.readDate != null ? moment(message.readDate) : null;
      });
    }
    return res.body;
  }
}
