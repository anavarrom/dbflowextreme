import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { SessionQuery } from 'src/app/core/state/session/session.query';
import { SessionService } from 'src/app/core/state/session/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  profileSettings = [
    { value: 1, name: "Profile", icon: "user" },
    { value: 4, name: "Messages", icon: "email", badge: "5" },
    { value: 2, name: "Friends", icon: "group" },
    { value: 3, name: "Exit", icon: "runner" }];

  userItems = [{
    icon: 'fas fa-user',
    items: [
      { text: 'Your profile', disabled: true },
      { text: 'Your project', icon: 'fas fa-project-diagram',onClick: () => {
          this.router.navigate(['/safeKeeping']);
          }
      },
      {
        beginGroup: true, text: 'Sign out', icon: 'fas fa-sign-out-alt', onClick: () => {
          this.logout();
        }
      }
    ]
  }];

  loginButtonOptions: any;
  homeButtonOptions: any;
  drawerButtonOptions: any;

    navigation = [
      { id: 1, text: "Products", icon: "product" },
      { id: 2, text: "Sales", icon: "money" },
      { id: 3, text: "Customers", icon: "group" },
      { id: 4, text: "Employees", icon: "card" },
      { id: 5, text: "Reports", icon: "chart" }
  ];

    showSubmenuModes: string[] = ['slide', 'expand'];
    positionModes: string[] = ['left', 'right'];
    showModes: string[] = ['push', 'shrink', 'overlap'];
    text: string;
    selectedOpenMode: string = 'overlap';
    selectedPosition: string = 'left';
    selectedRevealMode: string = 'slide';
    isDrawerOpen: Boolean = false;
    elementAttr: any;


  constructor(private router: Router, public sessionQuery: SessionQuery, public sessionService: SessionService, public toast: ToastService) {


    this.drawerButtonOptions = {
      icon: 'fas fa-bars',
      onClick: () => {
        this.isDrawerOpen = !this.isDrawerOpen;      }
    };

    this.loginButtonOptions = {
      icon: 'fas fa-sign-in-alt',
      text: 'Sign in',
      onClick: () => {
          this.login();
      }
    };

    this.homeButtonOptions = {
      icon: 'fas fa-home',
      text: 'Home',
      onClick: () => {
        this.router.navigate(['/home'])
      }
    };
  }

  ngOnInit(): void {
  }

  /*onClickViewProject() {
    this.router.navigate(['/safeKeeping']);
  }*/

  logout() {
    this.sessionService.logout();
  }

  login() {
    this.sessionService.login();
  }

  onButtonClick(e) {
    this.toast.info("Go to " + e.component.option("text") + "'s profile");
  }

  onItemClick(e) {
    this.toast.info(e.itemData.name || e.itemData, 600);
  }
}
