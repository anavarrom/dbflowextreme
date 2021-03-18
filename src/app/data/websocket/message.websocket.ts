import { map, takeUntil } from 'rxjs/operators';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { IMessageProvider } from '../interfaces/message.provider';
import { IChatMessage } from '../interfaces/models';
import { RxStompService, StompService } from '@stomp/ng2-stompjs';

@Injectable({ providedIn: 'root' })
export class MessageWebSocketService implements IMessageProvider, OnDestroy {

  private topicSubscription: Subscription;
  // private messageObs: Observable<IChatMessage[]> = null;
  //private messageObs$ = new Subject<IChatMessage[]>();
  private messageObs$ : Subject<IChatMessage[]>;

  private FINDALL_MESSAGES: string = '/messages/findAllByChat';
  private FINDALL_MESSAGES_ACK: string = '/messages/findAllByChatAck';
  ngDestroy$ = new Subject();

  // constructor(private _stompService: StompService) {
  constructor(private rxStompService: RxStompService) {

    this.topicSubscription = this.rxStompService.watch(this.FINDALL_MESSAGES_ACK).subscribe((message) => {
      const xx = JSON.parse(message.body);
      this.messageObs$.next(xx.content);
      this.messageObs$.complete();
      }, (error) => {
        //observer.error(error);
      });
  }

    findAllMessagesByChat(chatId: number): Observable<IChatMessage[]> {

      // this._stompService.publish(this.FINDALL_MESSAGES, chatId.toString());
      this.rxStompService.publish({destination: this.FINDALL_MESSAGES, body: chatId.toString()});
      this.messageObs$ = new Subject<IChatMessage[]>();
      return this.messageObs$.asObservable();
      // tslint:disable-next-line: deprecation
      /*return  this.rxStompService.watch(this.FINDALL_MESSAGES_ACK).pipe(map((message) => {
        return JSON.parse(message.body);
      }));*/
    }

  newMessage(message: IChatMessage): Observable<IChatMessage> {
    throw new Error("Method not implemented.");
  }
  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
    this.ngDestroy$.next(true);
    this.ngDestroy$.complete();
  }
}
