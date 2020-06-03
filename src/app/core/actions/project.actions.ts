import { SafeKeepingPeriod } from '../models/safekeepingPeriod';

export class LoadSafeKeepingPeriods {
    static readonly type = '[Project] LoadSafeKeepingPeriods';
    constructor() {}
}

export class NewSafeKeepingPeriod {
    static type = '[Project] New SafeKeepingPeriod';
    constructor(public period: SafeKeepingPeriod) {}
}

export class UpdateSafeKeepingPeriod {
    static type = '[Project] Update SafeKeepingPeriod';
    constructor(public period: SafeKeepingPeriod) {}
}