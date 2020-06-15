import { KeycloakProfile } from 'keycloak-js';

export class Login {
    static type = '[Session] Login';
    constructor(public loginData: KeycloakProfile) {}
}

export class Init {
    static type = '[Session] Init';
    constructor() {}
}

export class Logout {
    static type = '[Session] Logout';
    constructor() {}
}