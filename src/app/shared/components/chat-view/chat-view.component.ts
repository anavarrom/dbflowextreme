import { Component, OnInit } from '@angular/core';
import { Select, Store, Actions } from '@ngxs/store';
import { ChatStore } from 'src/app/core/states/chat.state';
import { Observable } from 'rxjs';
import { IChat } from 'src/app/data/interfaces/models';
import { ToastService } from '../../services/toast.service';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss']
})
export class ChatViewComponent implements OnInit {

  @Select(ChatStore.selected) public selectedChat$: Observable<IChat>;
  textButton: any;
  passwordMode: string;

  constructor( private store: Store,
               private actions$: Actions,
               public toastService: ToastService) {
      this.textButton = {
        type: "default",
        onClick: () => {
          //this.toastService.info('Selected ');
          this.store.dispatch(new Navigate(['/chats']));
//          this.passwordMode = "Prueba";
        }
    };
  }
  ngOnInit() {
  }

  onSendMessageClick(e) {
    this.toastService.info('Selected ');
  }

}
