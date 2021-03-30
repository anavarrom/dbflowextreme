import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification-detail',
  templateUrl: './notification-detail.component.html',
  styleUrls: ['./notification-detail.component.scss'],
})
export class NotificationDetailComponent implements OnInit {

//   @Select(NotificationStore.selected) public selected$: Observable<Notification>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {}

}
