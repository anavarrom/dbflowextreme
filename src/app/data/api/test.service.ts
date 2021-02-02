import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from '../../shared/input.constants';
import { createRequestOption } from '../../shared/request-util';
import { IAppointment } from '../../data/interfaces/models';

import {environment} from '../../../environments/environment';
import { SERVER_ENDPOINT } from '../variables';

type AppointmentResponseType = HttpResponse<IAppointment>;
type AppointmentArrayResponseType = HttpResponse<IAppointment[]>;

@Injectable()
export class RestTestService {

  public publicTestURL    : string = 'http://localhost:8080/management/gateway';
  public accountURL       : string = 'http://localhost:8080/api/account'; 

  public testSecuredServerURL = SERVER_ENDPOINT + 'testSecuredServer';
  public testServerURL = environment.gatewayServer + '/management/testServer';
  
  constructor(protected http: HttpClient) {}

 

  testGateway(): Observable<HttpResponse<any>> {
    return this.http
      .get<any>(`${this.publicTestURL}`, { observe: 'response' });
  }

  testAccount(): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.accountURL}`, { observe: 'response' });
  }

  testServer(): Observable<HttpResponse<any>> {
    return this.http
      .get<any>(`${this.testServerURL}`, { observe: 'response' });
  }

  testSecuredServer(): Observable<HttpResponse<any>> {
    return this.http.get<any>(`${this.testSecuredServerURL}`, { observe: 'response' });
  }
}
