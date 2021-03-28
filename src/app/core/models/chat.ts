import { IChatMessage, ChatType, IChat } from '../../data/interfaces/models';
import { Moment } from 'moment';

export class Chat implements IChat {
    constructor(
      public id?: number,
      public owner?: string,
      public to?: string,
      public withContact?: string,
      public subject?: string,
      public createdDate?: Moment,
      public lastMessageDate?: Moment,
      public type?: ChatType,
      public appointmentId?: number,
      public notificationId?: number,
      public messages?: IChatMessage[]
    ) {}
  }
