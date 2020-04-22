import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from '../../shared/input.constants';
import { createRequestOption } from '../../shared/request-util';
import { IChat, IChatMessage } from '../../data/interfaces/models';

import {environment} from '../../../environments/environment';

type EntityResponseType = HttpResponse<IChat>;
type EntityArrayResponseType = HttpResponse<IChat[]>;

@Injectable()
export class ChatService {
  public resourceUrl = environment.basePath + '/dbflowchat/api/chats';

  constructor(protected http: HttpClient) {}

  create(chat: IChat): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(chat);
    return this.http
      .post<IChat>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(chat: IChat): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(chat);
    return this.http
      .put<IChat>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IChat>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IChat[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(chat: IChat): IChat {
    const copy: IChat = Object.assign({}, chat, {
      createdDate: chat.createdDate != null && chat.createdDate.isValid() ? chat.createdDate.format(DATE_FORMAT) : null,
      lastMessage: chat.lastMessage != null && chat.lastMessage.isValid() ? chat.lastMessage.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
      res.body.lastMessage = res.body.lastMessage != null ? moment(res.body.lastMessage) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((chat: IChat) => {
        chat.createdDate = chat.createdDate != null ? moment(chat.createdDate) : null;
        chat.lastMessage = chat.lastMessage != null ? moment(chat.lastMessage) : null;
      });
    }
    return res;
  }
}
