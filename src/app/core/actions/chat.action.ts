import { ChatMessage } from '../models/message';

export class LoadChats {
    static readonly type = '[Chat] Load';
    constructor() {}
}

export class SelectChat {
    static readonly type = '[Chat] Select';
    constructor(public id: number) {}
}

export class NewMessage {
    static type = '[Chat] New message';
    constructor(public message: ChatMessage) {}
  }