import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT, DATE_TIME_FORMAT } from '../../shared/input.constants';
import { createRequestOption } from '../../shared/request-util';
import { IChat, IChatMessage } from '../../data/interfaces/models';

import {environment} from '../../../environments/environment';
import { CHAT_ENDPOINT } from '../variables';

type ChatResponseType = HttpResponse<IChat>;
type ChatArrayResponseType = HttpResponse<IChat[]>;

@Injectable({ providedIn: 'root' })
export class ChatService {

  public chatEndpoint              = CHAT_ENDPOINT + 'chat';
  public findAllByUserChatEndpoint  = this.chatEndpoint + '/findByUser';

  constructor(protected http: HttpClient) {}

  // TODO: Gestionar ataques CSRF. Para hacer que funcione el crear he
  // tenido que desaactivar el CSRF en el SecuirtyConfig del Gateway
  create(chat: IChat): Observable<ChatResponseType> {
    const copy = this.convertDateFromClient(chat);
    return this.http
      .post<IChat>(this.chatEndpoint, copy, { observe: 'response' })
      .pipe(map((res: ChatResponseType) => this.convertDateFromServer(res)));
  }

  update(chat: IChat): Observable<ChatResponseType> {
    const copy = this.convertDateFromClient(chat);
    return this.http
      .put<IChat>(this.chatEndpoint, copy, { observe: 'response' })
      .pipe(map((res: ChatResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<ChatResponseType> {
    return this.http
      .get<IChat>(`${this.chatEndpoint}/${id}`, { observe: 'response' })
      .pipe(map((res: ChatResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<ChatArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IChat[]>(this.chatEndpoint, { params: options, observe: 'response' })
      .pipe(map((res: ChatArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  findAllByUser(req?: any): Observable<ChatArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IChatMessage[]>(this.findAllByUserChatEndpoint, { params: options, observe: 'response' })
      .pipe(map((res: ChatArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.chatEndpoint}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(chat: IChat): IChat {
    const copy: IChat = Object.assign({}, chat, {
      createdDate: chat.createdDate != null && chat.createdDate.isValid() ? chat.createdDate.format(DATE_TIME_FORMAT) : null,
      lastMessage: chat.lastMessageDate != null && chat.lastMessageDate.isValid() ? chat.lastMessageDate.format(DATE_TIME_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: ChatResponseType): ChatResponseType {
    if (res.body) {
      res.body.createdDate = res.body.createdDate != null ? moment(res.body.createdDate) : null;
      res.body.lastMessageDate = res.body.lastMessageDate != null ? moment(res.body.lastMessageDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: ChatArrayResponseType): ChatArrayResponseType {
    if (res.body) {
      res.body.forEach((chat: IChat) => {
        chat.createdDate = chat.createdDate != null ? moment(chat.createdDate) : null;
        chat.lastMessageDate = chat.lastMessageDate != null ? moment(chat.lastMessageDate) : null;
      });
    }
    return res;
  }
}
