import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actions } from '@datorama/akita-ng-effects';
import { NavigationActions } from '../../../core/effects/navigation.actions';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.css']
})
export class DrawerComponent implements OnInit {

  drawerItems = [
    {
      text: 'Calendar', icon: 'far fa-calendar-alt', onClick: () => {
        this.actions.dispatch(NavigationActions.calendarsClicked());
        this.router.navigate(['/calendar']);
      }
    },
    {
      disabled: true, text: 'Notifications', icon: 'fas fa-exclamation', onClick: () => {
        // this.router.navigate(['/safeKeeping']);
      }
    },
    {
      text: 'Chats', icon: 'far fa-comments', onClick: () => {
        this.actions.dispatch(NavigationActions.chatsClicked());
        this.router.navigate(['/chats']);
      }
    },
    {
      disabled: true, text: 'Audit', icon: 'far fa-eye', onClick: () => {
        // this.router.navigate(['/safeKeeping']);
      }
    },
  ];

  constructor(private router: Router, private actions: Actions) { }

  ngOnInit(): void {
  }

  doneClick() {
    this.actions.dispatch(NavigationActions.chatsClicked());
    this.router.navigate(['/chats']);
  }
}
