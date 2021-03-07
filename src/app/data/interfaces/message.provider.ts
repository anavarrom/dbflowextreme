import { Observable } from "rxjs";
import { IChatMessage } from "./models";

export interface IMessageProvider {

  newMessage(message: IChatMessage): Observable<IChatMessage>;
  findAllMessagesByChat(chatId:number) : Observable<IChatMessage[]>;
}

