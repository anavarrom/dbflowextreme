import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IMessageProvider } from "../interfaces/message.provider";
import { IChatMessage } from "../interfaces/models";

@Injectable({ providedIn: 'root' })
export class MessageWebSocketService implements IMessageProvider{
  findAllMessagesByChat(chatId: number): Observable<IChatMessage[]> {
    throw new Error("Method not implemented.");
  }

  newMessage(message: IChatMessage): Observable<IChatMessage> {
    throw new Error("Method not implemented.");
  }
}
