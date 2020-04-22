import { IChatMessage, ChatType, IChat } from '../../data/interfaces/models';
import { Moment } from 'moment';

export class Chat implements IChat {
    constructor(
      public id?: number,
      public owner?: string,
      public ownerId?: number,
      public to?: string,
      public toId?: number,
      public subject?: string,
      public createdDate?: Moment,
      public lastMessage?: Moment,
      public type?: ChatType,
      public messages?: IChatMessage[]
    ) {}
  }