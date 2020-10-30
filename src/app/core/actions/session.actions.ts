import { IDbFlowAccount } from 'src/app/data/interfaces/models';
import { DbFlowError } from '../models/error';

export class Login {
    static type = '[Session] Login';
    constructor(public account: IDbFlowAccount) {}
}

export class Init {
    static type = '[Session] Init';
    constructor() {}
}

export class Logout {
    static type = '[Session] Logout';
    constructor() {}
}

export class NotifyError {
    static type = '[Session] NotifyError';
    constructor(public error: DbFlowError) {}
}
