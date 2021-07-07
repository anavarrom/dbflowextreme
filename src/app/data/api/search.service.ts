import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

import { SERVER_ENDPOINT } from '../variables';

@Injectable({ providedIn: 'root' })
export class GenericSearchService {

  public genericSearchEndpoint              = SERVER_ENDPOINT + 'search';
  public testEndpoint  = this.genericSearchEndpoint + '/test';

  constructor(protected http: HttpClient) {}


  test(): Observable<any> {
    return this.http
      .get<any>(`${this.testEndpoint}`, { observe: 'response' });
  }

/*  query(req?: any): Observable<AppointmentArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAppointment[]>(this.appointmentEndpoint, { params: options, observe: 'response' })
      .pipe(map((res: AppointmentArrayResponseType) => this.convertDateArrayFromServer(res)));
  }*/

}
