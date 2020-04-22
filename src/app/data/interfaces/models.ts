export * from './problem';
import { Moment } from 'moment';

export const enum NotificationStatus {
    EMITTED = 'EMITTED',
    RECEIVED = 'RECEIVED',
    READ = 'READ'
}

export const enum ChatType {
    NOTIFICATION = 'NOTIFICATION'
}

export interface INotification {
    id?: number;
    subject?: string;
    body?: string;
    from?: string;
    to?: string;
    emittedDate?: Moment;
    readDate?: Moment;
    dueDate?: Moment;
    status?: NotificationStatus;
    fromId?: number;
    toId?: number;
    chatId?: number;
    appointmentId?: number;
}

export interface IChatMessage {
    id?: number;
    from?: string;
    to?: string;
    body?: string;
    order?: number;
    emittedDate?: Moment;
    receivedDate?: Moment;
    readDate?: Moment;
    latitude?: number;
    longitud?: number;
    chatId?: number;
  }
export interface IChat {
    id?: number;
    owner?: string;
    ownerId?: number;
    to?: string;
    toId?: number;
    subject?: string;
    createdDate?: Moment;
    lastMessage?: Moment;
    type?: ChatType;
    messages?: IChatMessage[];
  }
  