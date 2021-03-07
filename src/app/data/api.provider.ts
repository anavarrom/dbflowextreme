import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core'
import { MessageService } from './api/message.service';
import { MessageWebSocketService } from './websocket/message.websocket';
import { IMessageProvider } from './interfaces/message.provider';

@Injectable({ providedIn: 'root' })
export class APIProvider {

  private _messageProvider : IMessageProvider = null;

  constructor(private messageService: MessageService, private messageWebSocketService: MessageWebSocketService) {
    this._messageProvider = (environment.INTRANET) ? messageService : messageWebSocketService;

  }

  get messageProvider(): IMessageProvider {
    return this._messageProvider;
  }

}
