import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbFlowError } from 'src/app/core/models/error';
import { Session } from 'protractor';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { SessionStore } from 'src/app/core/states/session.state';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  @Select(SessionStore.lastError) public error$: Observable<DbFlowError>;

  constructor(private route: ActivatedRoute) { 

  }

  ngOnInit() {
    // const pp = this.route.snapshot.paramMap.get('id');
/*    this.sub = this.route.params.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
      this.error = params['detail']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
   });*/
  }
  ngOnDestroy() {
  }
}
