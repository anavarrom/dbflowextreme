import { Component, Input, OnInit } from '@angular/core';
import { ChatsQuery } from '../../../core/state/chats/chats.query';
import { ChatsService } from '../../../core/state/chats/chats.service';
import { SessionQuery } from '../../../core/state/session/session.query';
import { ToastService } from '../../../shared/services/toast.service';
import { Actions } from '@datorama/akita-ng-effects';
import { Observable } from 'rxjs';
import { Chat } from 'src/app/core/models/chat';
import { ChatMessage } from 'src/app/core/models/message';

@Component({
  selector: 'app-chat-detail',
  templateUrl: './chat-detail.component.html',
  styleUrls: ['./chat-detail.component.scss'],
})
export class ChatDetailComponent implements OnInit {
  selectedChat$: Observable<Chat>;
  protected me: string | null;

  // @Select(ChatStore.selected) public selected$: Observable<Chat>;

  @Input() newMessageText = '';
  sendButtonOptions:any;

  constructor(private sessionQuery: SessionQuery,
              private chatsQuery: ChatsQuery,
              private chatsService: ChatsService,
              private toastService: ToastService,
              private actions: Actions) { }

  ngOnInit() {

    this.selectedChat$  = this.chatsQuery.selectActive() as Observable<Chat>;
    this.me             = this.sessionQuery.Me;

    this.sendButtonOptions = {
      icon: 'fas fa-paper-plane',
      onClick: () => {
        // this.router.navigate(['/home'])
        this.chatsService.newMessage(this.newMessageText);
        // this.toastService.info(this.newMessageText);
      }
    };
  }

  sendMessage() {
    this.chatsService.newMessage(this.newMessageText);

    /*
    let msg: ChatMessage = new ChatMessage();
    msg.body = this.newMessageText;
    // msg.chatId = this.selected$.

    this.store.dispatch(new NewMessage(msg));
*/
  }
}
