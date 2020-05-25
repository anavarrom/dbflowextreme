import { Moment } from 'moment';

export class Appointment {
    constructor(
        public id?: number,
        public from?: string,
        public to?: string,
        public text?: string,
        public description?: string,
        public startDate?: Moment,
        public endDate?: Moment,
        public allDay?: boolean
      ) {}
}