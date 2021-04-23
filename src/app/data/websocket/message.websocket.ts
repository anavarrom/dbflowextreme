import { map, takeUntil } from 'rxjs/operators';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { IMessageProvider } from '../interfaces/message.provider';
import { IChatMessage } from '../interfaces/models';
import { RxStompService, StompService } from '@stomp/ng2-stompjs';

@Injectable({ providedIn: 'root' })
export class MessageWebSocketService implements IMessageProvider, OnDestroy {

  private topicSubscription: Subscription;
  private messageSentSubscription: Subscription;
  private messageNotifSubscription: Subscription;
  // private messageObs: Observable<IChatMessage[]> = null;
  // private messageObs$ = new Subject<IChatMessage[]>();
  private messageObs$ : Subject<IChatMessage[]>;
  private messageSentObs$ : Subject<IChatMessage>;
  private notificationObs$ : Subject<IChatMessage>;


  private FINDALL_MESSAGES: string = '/messages/findAllByChat';
  private FINDALL_MESSAGES_ACK: string = '/messages/findAllByChatAck';

  private NEW_MESSAGE: string = '/messages/new';
  private NEW_MESSAGE_ACK: string = '/messages/newAck';

  private MESSAGE_NOTIFICATION: string = '/messages/notification';

  ngDestroy$ = new Subject();

  // constructor(private _stompService: StompService) {
  constructor(private rxStompService: RxStompService) {
    }

  init(owner: string): boolean {
    this.NEW_MESSAGE_ACK += '/' + owner;
    this.MESSAGE_NOTIFICATION += '/' + owner;

    this.topicSubscription = this.rxStompService.watch(this.FINDALL_MESSAGES_ACK).subscribe((message) => {
      const xx = JSON.parse(message.body);
      this.messageObs$.next(xx.content);
      this.messageObs$.complete();
      }, (error) => {
        // observer.error(error);
      });

    this.messageSentSubscription = this.rxStompService.watch(this.NEW_MESSAGE_ACK).subscribe((message) => {
        const realMessage = JSON.parse(message.body);
        this.messageSentObs$.next(realMessage);
        this.messageSentObs$.complete();
        }, (error) => {
          // observer.error(error);
        });

    this.messageNotifSubscription = this.rxStompService.watch(this.MESSAGE_NOTIFICATION).subscribe((message) => {
      const realMessage = JSON.parse(message.body);
      this.notificationObs$.next(realMessage);
      // this.notificationObs$.complete();
      }, (error) => {
        // observer.error(error);
      });
    return true;
    }

newNotification(): Observable<IChatMessage> {
      this.notificationObs$ = new Subject<IChatMessage>();
      return this.notificationObs$.asObservable();
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
    this.rxStompService.publish({destination: this.NEW_MESSAGE, body: JSON.stringify(message)});
    this.messageSentObs$ = new Subject<IChatMessage>();
    return this.messageSentObs$.asObservable();
}

ngOnDestroy() {
    this.topicSubscription.unsubscribe();
    this.messageSentSubscription.unsubscribe();
    this.messageNotifSubscription.unsubscribe();
    this.ngDestroy$.next(true);
    this.ngDestroy$.complete();
  }
}
