import { ToastService } from './../../shared/services/toast.service';
import { Injectable } from '@angular/core';
// import { JhiEventManager } from 'ng-jhipster';
import { HttpInterceptor, HttpRequest, HttpErrorResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DbFlowError, ErrorSeverity } from '../models/error';
import { Router } from '@angular/router';
import { Actions } from '@datorama/akita-ng-effects';
import { SessionActions } from '../effects/session.actions';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(/*private store: Store*/ private router: Router, private actions: Actions, private toast:ToastService ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const store = this.store;
    return next.handle(request).pipe(
      tap(
        () => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            // Gestionar cuando se produce un error
            let dbFlowError: DbFlowError = null;
            if (err.error.code) {
              // Parece que es un error
              dbFlowError =  { code: err.error.status, title: err.error.title,detail:err.error.message,
                               path:err.error.path, severity: ErrorSeverity.CRITICAL };
            } else {
              dbFlowError =  { code: err.status, title: err.statusText,detail:err.message,
                path:err.url, severity: ErrorSeverity.CRITICAL };
            }
            if (dbFlowError) {
              // this.actions.dispatch(NavigationActions.calendarClicked());
              this.actions.dispatch(SessionActions.raiseError(dbFlowError));
              this.toast.error(dbFlowError.title + " - "+ dbFlowError.path);
              this.router.navigate(['/error']);
            }
          }
        }
      )
    );
  }
}
