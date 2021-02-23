import { ProjectsQuery } from './../projects/projects.query';
import { IAppointment } from './../../../data/interfaces/models';
import { AppointmentsQuery } from './appointments.query';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { RestAppointmentService } from 'src/app/data/api/appointment.service';
import { AppointmentsStore } from './appointments.store';

@Injectable({ providedIn: 'root' })
export class AppointmentsService {

  constructor(private appointmentsStore: AppointmentsStore,
              protected appointmentService: RestAppointmentService,
              protected projectsQuery: ProjectsQuery,) {
  }

  // loadAppointments(idProject: number, force: boolean = true)
  loadAppointments()
  {
    const projectId = this.projectsQuery.getActiveId() as number;

    this.appointmentService.findAllByProjectAndUser(projectId).subscribe(
        // (notifs: INotification[]) => {
        (appointments: HttpResponse<IAppointment[]>) => {
          this.appointmentsStore.set(appointments.body);
        }, err => {
          // Log errors if any
          console.log(err);
        }
    );
  }
}
