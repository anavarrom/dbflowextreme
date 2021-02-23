import { SessionQuery } from './../../core/state/session/session.query';
import { DbFlowError } from './../../core/models/error';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  error$: Observable<DbFlowError>;

  constructor(private sessionQuery: SessionQuery) { }

  ngOnInit(): void {
    this.error$ = this.sessionQuery.lastError$;
  }

}
