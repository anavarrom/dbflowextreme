import { Injectable } from '@angular/core';
// import { JhiEventManager } from 'ng-jhipster';
import { HttpInterceptor, HttpRequest, HttpErrorResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { DbFlowError, ErrorSeverity } from '../models/error';
import { Params } from '@angular/router';
import { NotifyError } from '../actions/session.actions';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const store = this.store;
    return next.handle(request).pipe(
      tap(
        () => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            // TODO: Gestionar cuando se produce un error
            if (err.status === 404) {
              const dbFlowError: DbFlowError = {
                code: err.status,
                message: err.message,
                url: err.url,
                severity: ErrorSeverity.CRITICAL
              };
              // store.dispatch(new Navigate(['/error'], { detail: 'patta' }));
              store.dispatch(new NotifyError(dbFlowError));
            }
            //if (!(err.status === 404 && (err.message === '' || (err.url && err.url.includes('api/account'))))) {
              // this.eventManager.broadcast({ name: 'dbFlow10GatewayApp.httpError', content: err });
              
            //}
          }
        }
      )
    );
  }
}
