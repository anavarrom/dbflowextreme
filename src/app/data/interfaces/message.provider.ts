import { Observable } from "rxjs";
import { IChatMessage } from "./models";

export interface IMessageProvider {

  init(owner: string): boolean;
  newNotification(): Observable<IChatMessage>;
  newMessage(message: IChatMessage): Observable<IChatMessage>;
  findAllMessagesByChat(chatId:number) : Observable<IChatMessage[]>;
}

