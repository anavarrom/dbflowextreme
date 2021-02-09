import { ProjectsService } from './../../../core/state/projects/projects.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ISafeKeepingPeriod, IAppointment, IDbAccountConfiguration } from 'src/app/data/interfaces/models';
import { ToastService } from 'src/app/shared/services/toast.service';
import { DxContextMenuComponent } from 'devextreme-angular';
import { SafeKeepingPeriod } from 'src/app/core/models/safekeepingPeriod';
import * as moment from 'moment';
import { takeUntil } from 'rxjs/operators';
import { ProjectsQuery } from 'src/app/core/state/projects/projects.query';
import { SessionQuery } from 'src/app/core/state/session/session.query';

@Component({
  selector: 'app-safe-keeping-detail',
  templateUrl: './safe-keeping-detail.component.html',
  styleUrls: ['./safe-keeping-detail.component.scss']
})
export class SafeKeepingDetailComponent implements OnInit {

  userConfig: IDbAccountConfiguration | null;
  me: string | null;
  partner: string | null;

  periods$: Observable<ISafeKeepingPeriod[]>;

  @ViewChild('contextMenu', { static: false }) contextMenu: DxContextMenuComponent;

  currentDate: Date = new Date();

  parents: any[] = [];
  contextMenuItems: any[] = [];
  disabled: boolean = true;
  target: any;
  onContextMenuItemClick: any;
  cellContextMenuItems: any[];

  // ngUnsubscribeOK = null;
  // ngUnsubscribeError = null;

  constructor( private sessionQuery: SessionQuery,
               private projectsService: ProjectsService,
               private projectsQuery: ProjectsQuery,
               private toastService: ToastService) {

  }

  ngOnInit() {
    this.userConfig = this.sessionQuery.UserConfig;
    this.me = this.sessionQuery.Me;
    this.partner = this.projectsQuery.Partner;
    this.periods$ = this.projectsQuery.allSelectedProjectPeriods$;

    // Construimos el menu contextual a traves del proyecto y la configuración
    this.parents = [
       { text: this.me, id: this.me, color: this.userConfig.myBackgroundColor },
       { text: this.partner, id: this.partner, color: this.userConfig.otherBackgoundColor }
    ];

    this.cellContextMenuItems = [
      { text: this.me, username: this.me, color: this.userConfig.myBackgroundColor, onItemClick: this.createSafeKeepingPeriod },
      { text: this.partner, username: this.partner, color: this.userConfig.otherBackgoundColor, onItemClick: this.createSafeKeepingPeriod },
      // { text: 'Repeat Weekly', beginGroup: true, onItemClick: this.repeatAppointmentWeekly },
      // { text: 'Set Room', beginGroup: true, disabled: true }
   ];

   /*this.ngUnsubscribeOK = new Subject();
    this.ngUnsubscribeError = new Subject();

    this.store.dispatch(new LoadSafeKeepingPeriods());

    const s = this.toastService;
    this.actions$.pipe(ofActionSuccessful(SafeKeepingPeriodActionOK),
      takeUntil(this.ngUnsubscribeOK)).subscribe(() => {
        this.toastService.info("Funciona la acción");
      });

    this.actions$.pipe(ofActionSuccessful(SafeKeepingPeriodActionError),
      takeUntil(this.ngUnsubscribeError)).subscribe((err) => {
        this.toastService.info('Error en el resultado de la acción');
      });*/

  }

  ngOnDestroy() {
    // this.ngUnsubscribeOK.next();
    // this.ngUnsubscribeOK.complete();

    // this.ngUnsubscribeError.next();
    // this.ngUnsubscribeError.complete();
  }

  createSafeKeepingPeriod(contextMenuEvent, e, parent){
     let period: SafeKeepingPeriod = new SafeKeepingPeriod();
     period.owner     = e.itemData.username;
     period.text      = e.itemData.username;
     period.startDate = moment(contextMenuEvent.cellData.startDate);
     period.endDate   = moment(contextMenuEvent.cellData.startDate);
     //period.endDate   = moment(contextMenuEvent.cellData.endDate);
     period.allDay    = true;

     parent.projectsService.addNewSafeKeepingPeriod(period);
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

  onAppointmentUpdating(e) {
    let period = e.newData;

    period.startDate = moment(e.newData.startDate);
    period.endDate   = moment(e.newData.endDate);

    this.projectsService.updateSafeKeepingPeriod(period);
  }


  onAppointmentUpdated(e) {
    this.toastService.info("Updated clicked");
  }

  onAppointmentDeleting(e) {
    this.toastService.info("Deleting clicked");

    this.projectsService.deleteSafeKeepingPeriod(e.appointmentData);
  }

  onAppointmentDeleted(e) {
    this.toastService.info("Deleted clicked");
  }
}
