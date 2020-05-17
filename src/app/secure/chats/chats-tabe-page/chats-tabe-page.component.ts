import { Component, OnInit } from '@angular/core';
import { Store, Select, ofActionSuccessful, Actions } from '@ngxs/store';
import { LoadChats, SelectChat } from 'src/app/core/actions/chat.action';
import { ChatService } from 'src/app/data/api/chat.service';
import { Observable } from 'rxjs';
import { ChatStore } from 'src/app/core/states/chat.state';
import { IChat, IDbFlowAccount } from 'src/app/data/interfaces/models';
import { Navigate } from '@ngxs/router-plugin';
import { DxTileViewModule, DxButtonModule, DxListModule } from 'devextreme-angular';
import { Chat } from 'src/app/core/models/chat';
import { SessionStore } from 'src/app/core/states/session.state';


@Component({
  selector: 'app-chats-tabe-page',
  templateUrl: './chats-tabe-page.component.html',
  styleUrls: ['./chats-tabe-page.component.scss'],
})
export class ChatsTabePageComponent implements OnInit {

  @Select(ChatStore.all) public chats$: Observable<IChat[]>;
  @Select(ChatStore.selected) public selectedChat$: Observable<IChat>;
  @Select(SessionStore.currentUser) public selectedUser$: Observable<IDbFlowAccount>;

  backButtonOptions: any;
  refreshButtonOptions: any;
  estado = false;
  
  constructor(private store: Store, private actions$: Actions) {
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
    this.store.dispatch(new LoadChats());

    // this.actions$.pipe(ofActionSuccessful(SelectChat)).subscribe(() => this.store.dispatch(new Navigate(['/ChatDetail'])));
  }

  chatSelected(event) {
    const chatSelected: Chat  = event.addedItems[0];
    if (chatSelected !== null) {
      this.store.dispatch(new SelectChat(chatSelected.id));
    }
  }

  clickNeMwssage(event) {
  }
}
