import { Component, OnInit, ViewChild } from '@angular/core';
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
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-chats-tabe-page',
  templateUrl: './chats-tabe-page.component.html',
  styleUrls: ['./chats-tabe-page.component.scss'],
})
export class ChatsTabePageComponent implements OnInit {

  @Select(ChatStore.all) public chats$: Observable<IChat[]>;
  @Select(ChatStore.selected) public selectedChat$: Observable<IChat>;
  @Select(SessionStore.currentUser) public selectedUser$: Observable<IDbFlowAccount>;

  @ViewChild('chatList') chatList;

  backButtonOptions: any;
  refreshButtonOptions: any;
  estado = false;
  private sub: any;

  constructor(private store: Store, private actions$: Actions, private route: ActivatedRoute) {


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

    this.sub = this.route.params.subscribe(params => {
      let selectedItems = this.chatList.instance.option('selectedItems');
       // this.id = +params['id']; 

    });
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
