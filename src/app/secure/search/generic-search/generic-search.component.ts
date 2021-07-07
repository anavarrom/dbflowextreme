import { SessionQuery } from './../../../core/state/session/session.query';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-generic-search',
  templateUrl: './generic-search.component.html',
  styleUrls: ['./generic-search.component.css']
})
export class GenericSearchComponent implements OnInit {

  //@Input() data: any;
  data: any;
  lastSearch$: Observable<String>;

  constructor(private route: ActivatedRoute, private sessionQuery: SessionQuery) { }

  ngOnInit(): void {
    this.lastSearch$  = this.sessionQuery.lastSearchResult$;

    /*this.route.queryParams.subscribe(params => {
      this.data = params['data'];
    });
  }*/
  }
}
