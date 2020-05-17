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

export interface IDbFlowAccount {
    username: string;
    firstName: string;
    lastName: string;
    enabled: boolean;
    email: string;
    authorities: string[];
    imageUrl: string;
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
    withContact?: string;
    subject?: string;
    createdDate?: Moment;
    lastMessage?: Moment;
    type?: ChatType;
    messages?: IChatMessage[];
  }
  
export interface IAppointment {
    id?: number;
    text?: string;
    description?: string;
    startDate?: Moment;
    endDate?: Moment;
    allDay?: boolean;
}