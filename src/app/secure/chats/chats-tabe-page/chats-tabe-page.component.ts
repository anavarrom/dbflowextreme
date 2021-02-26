import { NavigationActions } from './../../../core/effects/navigation.actions';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/data/api/chat.service';
import { Observable } from 'rxjs';
import { IChat, IDbFlowAccount } from 'src/app/data/interfaces/models';
import { DxTileViewModule, DxButtonModule, DxListModule } from 'devextreme-angular';
import { Chat } from 'src/app/core/models/chat';
import { ActivatedRoute } from '@angular/router';
import { ChatsQuery } from 'src/app/core/state/chats/chats.query';
import { SessionQuery } from 'src/app/core/state/session/session.query';
import { SessionStore } from 'src/app/core/state/session/session.store';
import { ToastService } from 'src/app/shared/services/toast.service';
import { Actions } from '@datorama/akita-ng-effects';


@Component({
  selector: 'app-chats-tabe-page',
  templateUrl: './chats-tabe-page.component.html',
  styleUrls: ['./chats-tabe-page.component.scss'],
})
export class ChatsTabePageComponent implements OnInit {

  //@Select(ChatStore.selected) public selectedChat$: Observable<IChat>;

  chats$: Observable<IChat[]>;
  protected me: string | null;

  @ViewChild('chatList') chatList;

  backButtonOptions: any;
  refreshButtonOptions: any;
  estado = false;
  private sub: any;

  constructor(private sessionQuery: SessionQuery,
              private chatsQuery: ChatsQuery,
              private chatsService: ChatService,
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
    //this.actions.dispatch(NavigationActions.chatClicked());

    this.me = this.sessionQuery.Me;
    this.chats$ = this.chatsQuery.selectAll();

    // this.store.dispatch(new LoadChats());

  }

  chatSelected(event) {
    /*const chatSelected: Chat  = event.addedItems[0];
    if (chatSelected !== null) {
      this.store.dispatch(new SelectChat(chatSelected.id));
    }*/
  }

  clickNeMwssage(event) {
  }
}
