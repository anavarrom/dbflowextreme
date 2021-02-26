import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';

export const SERVER_ENDPOINT = environment.gatewayServer + environment.serverAPI;
export const CHAT_ENDPOINT = environment.gatewayServer + environment.chatAPI;
export const BASE_PATH = new InjectionToken<string>('basePath');
export const COLLECTION_FORMATS = {
    csv: ',',
    tsv: '   ',
    ssv: ' ',
    pipes: '|'
};
