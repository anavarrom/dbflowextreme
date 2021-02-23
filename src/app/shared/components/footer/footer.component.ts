import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actions } from '@datorama/akita-ng-effects';
import { NavigationActions } from 'src/app/core/effects/navigation.actions';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  footerItems = [
    {
      text: 'Calendar', icon: 'far fa-calendar-alt', onClick: () => {
        this.actions.dispatch(NavigationActions.calendarClicked());
        this.router.navigate(['/calendar']);
      }
    },
    {
      disabled: true, text: 'Notifications', icon: 'fas fa-exclamation', onClick: () => {
        // this.router.navigate(['/safeKeeping']);
      }
    },
    {
      disabled: true, text: 'Chats', icon: 'far fa-comments', onClick: () => {
        // this.router.navigate(['/safeKeeping']);
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

}
