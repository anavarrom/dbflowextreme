import { Component, OnInit, ViewChild } from '@angular/core';
import { Select, Store, Actions } from '@ngxs/store';
import { SafekeepingStore } from 'src/app/core/states/safekeeping.state';
import { Observable } from 'rxjs';
import { ISafeKeepingPeriod, IAppointment } from 'src/app/data/interfaces/models';
import { ToastService } from 'src/app/shared/services/toast.service';
import { LoadSafeKeepingPeriods, NewSafeKeepingPeriod } from 'src/app/core/actions/project.actions';
import { DxContextMenuComponent } from 'devextreme-angular';
import { AppointmentStore } from 'src/app/core/states/appointment.state';
import { SafeKeepingPeriod } from 'src/app/core/models/safekeepingPeriod';
import * as moment from 'moment';

@Component({
  selector: 'app-safe-keeping-detail',
  templateUrl: './safe-keeping-detail.component.html',
  styleUrls: ['./safe-keeping-detail.component.scss']
})
export class SafeKeepingDetailComponent implements OnInit {

  // @Select(AppointmentStore.all)       public periods$: Observable<IAppointment[]>;

  @Select(SafekeepingStore.all)       public periods$: Observable<ISafeKeepingPeriod[]>;

  @ViewChild('contextMenu', { static: false }) contextMenu: DxContextMenuComponent;

  currentDate: Date = new Date();

   contextMenuItems: any[] = [];
  disabled: boolean = true;
  target: any;
  onContextMenuItemClick: any;
  cellContextMenuItems: any[];

  constructor( private store: Store,
               private actions$: Actions,
               private toastService: ToastService) {
  
    this.cellContextMenuItems = [
      { text: 'user 1', username: 'user 1', color: 'lightblue', onItemClick: this.createSafeKeepingPeriod },
      { text: 'user 2', username: 'user 2', color: 'lightcoral', onItemClick: this.createSafeKeepingPeriod },
      // { text: 'Repeat Weekly', beginGroup: true, onItemClick: this.repeatAppointmentWeekly },
      // { text: 'Set Room', beginGroup: true, disabled: true }
   ];
  }
  
  ngOnInit() {
    this.store.dispatch(new LoadSafeKeepingPeriods());
  }

  createSafeKeepingPeriod(contextMenuEvent, e, parent){
    let period: SafeKeepingPeriod = new SafeKeepingPeriod();
    period.owner     = e.itemData.username;
    period.text      = e.itemData.username;
    period.startDate = moment(contextMenuEvent.cellData.startDate);
    period.endDate   = moment(contextMenuEvent.cellData.endDate);
    period.allDay    = true;
  // e.itemData.username     
  // contextMenuEvent.startDate
   // parent.toastService.info("test clicked");
    parent.store.dispatch(new NewSafeKeepingPeriod(period));
  }


  onItemClick(contextMenuEvent) {
    return function (e) {
        e.itemData.onItemClick(contextMenuEvent, e, this);
    }
  }

  onAppointmentContextMenu(e) {
      this.target = ".dx-scheduler-appointment";
      this.disabled = false;
      // this.dataSource = this.appointmentContextMenuItems;
      this.onContextMenuItemClick = this.onItemClick(e);

      // this.toastService.info("onAppointmentContextMenu clicked");
  }

  onCellContextMenu(e) {
      this.target = ".dx-scheduler-date-table-cell";
      this.disabled = false;
      // this.dataSource = this.cellContextMenuItems;
      this.onContextMenuItemClick = this.onItemClick(e);
      
      // this.toastService.info("onCellContextMenu clicked");
  }

  onContextMenuHiding(e) {
      this.disabled = true;
      //this.dataSource = [];
  }
}
