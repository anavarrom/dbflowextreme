import { IChatMessage } from './../../../data/interfaces/models';
import { NavigationActions } from './../../../core/effects/navigation.actions';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { IChat, IDbFlowAccount } from 'src/app/data/interfaces/models';
import { Chat } from 'src/app/core/models/chat';
import { ChatsQuery } from 'src/app/core/state/chats/chats.query';
import { SessionQuery } from 'src/app/core/state/session/session.query';
import { ChatsService } from 'src/app/core/state/chats/chats.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Actions } from '@datorama/akita-ng-effects';


@Component({
  selector: 'app-chats-tabe-page',
  templateUrl: './chats-tabe-page.component.html',
  styleUrls: ['./chats-tabe-page.component.scss'],
})
export class ChatsTabePageComponent implements OnInit {

  chats$: Observable<IChat[]>;
  // selectedChat$: Observable<Chat>;
  protected me: string | null;

  @ViewChild('chatList') chatList;

  backButtonOptions: any;
  refreshButtonOptions: any;
  estado = false;
  private sub: any;
  public topicSubscription: Subscription;

  constructor(private sessionQuery: SessionQuery,
              private chatsQuery: ChatsQuery,
              private chatsService: ChatsService,
              private toastService: ToastService,
              private actions: Actions) {


    this.backButtonOptions = {
      icon: 'plus',
      onClick: () => {
         // notify('Add button has been clicked!');
      }
    };
    this.refreshButtonOptions = {
      icon: 'plus',
      onClick: () => {
        //  notify('Refresh has been clicked!');
      }
    };
   }

  ngOnInit() {

    this.me             = this.sessionQuery.Me;
    this.chats$         = this.chatsQuery.selectAll();
    // this.selectedChat$  = this.chatsQuery.selectActive() as Observable<Chat>;

    const topic = '/chat'; //' + this.sessionQuery.Me; this.topicSubscription =
    /*this.topicSubscription = this._stompService.watch(topic).pipe(map(function (message) {
      //  this.topicSubscription = this._stompService.watch('/user/queue/specific-user').pipe(map(function (message) {
      return JSON.parse(message.body);
    })).subscribe(function (payload) {
      this.toastService.info("Yujuuuuu");
    });*/

    /*this.topicSubscription = this._stompService.subscribe(topic).subscribe((message) => {
      this.toastService.info("Yujuuuuu");
    });*/
  }

  chatSelected(event) {
    if (event.addedItems.length > 0 ) {
      const chatSelected: Chat  = event.addedItems[0];
      if (chatSelected !== null) {
        let chat: Chat = new Chat();
        chat.id = chatSelected.id;
        this.actions.dispatch(NavigationActions.chatClicked(chat));
      }
    }
  }

  clickNeMwssage(event) {
    this.chatsService.newMessage("Test message");
  }

  ngOnDestroy() {
    // this.topicSubscription.unsubscribe();
}
}
