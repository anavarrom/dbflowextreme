import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast.service';

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
    { value: 3, name: "Exit", icon: "runner" } ];

    addButtonOptions: any;
    calendar: any;

    constructor(public toast: ToastService) {

      this.addButtonOptions = {
        icon: 'plus',
        text:'patata',
        onClick: () => {
            this.toast.info('Add button has been clicked!');
        }
     };

     this.calendar = {
      icon: 'plus',
      text:'calendar',
      onClick: () => {
          this.toast.info('Add button has been clicked!');
      }
   };
    }

  ngOnInit(): void {
  }

  onButtonClick(e) {
		this.toast.info("Go to " + e.component.option("text") + "'s profile");
	}

	onItemClick(e) {
		this.toast.info(e.itemData.name || e.itemData, 600);
	}
}
