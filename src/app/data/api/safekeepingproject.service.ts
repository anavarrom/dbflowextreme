import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT, DATE_TIME_FORMAT } from '../../shared/input.constants';
import { createRequestOption } from '../../shared/request-util';
import { ISafeKeepingProject } from '../interfaces/models';

import {environment} from '../../../environments/environment';
import { SERVER_ENDPOINT } from '../variables';

type SafeKeepingProjectType         = HttpResponse<ISafeKeepingProject>;
type SafeKeepingProjectResponseType = HttpResponse<ISafeKeepingProject[]>;

@Injectable()
export class SafeKeepingProjectService {
  public projectEndpoint = SERVER_ENDPOINT + 'project';
  public findAllByUserEndpoint = this.projectEndpoint + '/findByUser';

  constructor(protected http: HttpClient) {}

  create(notification: ISafeKeepingProject): Observable<SafeKeepingProjectType> {
    const copy = this.convertDateFromClient(notification);
    return this.http
      .post<ISafeKeepingProject>(this.projectEndpoint, copy, { observe: 'response' })
      .pipe(map((res: SafeKeepingProjectType) => this.convertDateFromServer(res)));
  }

  update(chat: ISafeKeepingProject): Observable<SafeKeepingProjectType> {
    const copy = this.convertDateFromClient(chat);
    return this.http
      .put<ISafeKeepingProject>(this.projectEndpoint, copy, { observe: 'response' })
      .pipe(map((res: SafeKeepingProjectType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<SafeKeepingProjectType> {
    return this.http
      .get<ISafeKeepingProject>(`${this.projectEndpoint}/${id}`, { observe: 'response' })
      .pipe(map((res: SafeKeepingProjectType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<SafeKeepingProjectResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISafeKeepingProject[]>(this.projectEndpoint, { params: options, observe: 'response' })
      .pipe(map((res: SafeKeepingProjectResponseType) => this.convertDateArrayFromServer(res)));
  }

  findAllByUser(req?: any): Observable<SafeKeepingProjectResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISafeKeepingProject[]>(this.findAllByUserEndpoint, { params: options, observe: 'response' })
      .pipe(map((res: SafeKeepingProjectResponseType) => this.convertDateArrayFromServer(res)))
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.projectEndpoint}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(appointment: ISafeKeepingProject): ISafeKeepingProject {
    const copy: ISafeKeepingProject = Object.assign({}, appointment, {
      start: appointment.start != null && appointment.start.isValid() ? appointment.start.format(DATE_FORMAT) : null
    });
    return copy;
  }

  protected convertDateFromServer(res: SafeKeepingProjectType): SafeKeepingProjectType {
    if (res.body) {
      res.body.start     = res.body.start != null ? moment(res.body.start) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: SafeKeepingProjectResponseType): SafeKeepingProjectResponseType {
    if (res.body) {
      res.body.forEach((appointment: ISafeKeepingProject) => {
        appointment.start = appointment.start != null ? moment(appointment.start) : null;
      });
    }
    return res;
  }
}
