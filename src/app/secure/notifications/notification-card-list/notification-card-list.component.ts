import { INotification } from './../../../data/interfaces/models';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-card-list',
  templateUrl: './notification-card-list.component.html',
  styleUrls: ['./notification-card-list.component.css']
})
export class NotificationCardListComponent implements OnInit {

  constructor() { }

  @Input() notification: INotification;

  ngOnInit(): void {
  }

}
