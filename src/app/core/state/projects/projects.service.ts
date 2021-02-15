import { ProjectsQuery } from './projects.query';
import { SafeKeepingPeriod } from 'src/app/core/models/safekeepingPeriod';
import { SafeKeepingProject } from './../../models/safeKeepingProject';
import { SafeKeepingPeriodService } from './../../../data/api/safekeepingperiod.service';
import { ISafeKeepingPeriod } from 'src/app/data/interfaces/models';
import { IDbFlowAccount, ISafeKeepingProject } from './../../../data/interfaces/models';
import { Injectable } from '@angular/core';
import { SafeKeepingProjectService } from 'src/app/data/api/safekeepingproject.service';
import { ProjectsStore, ProjectsState } from './projects.store';
import { HttpResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProjectsService {

  constructor( protected store: ProjectsStore, protected query: ProjectsQuery,
               protected projectService: SafeKeepingProjectService,
               protected periodsService: SafeKeepingPeriodService) {
  }

  initProjects(account:IDbFlowAccount) {
    this.projectService.findAllByUser().subscribe(
      (projects: HttpResponse<ISafeKeepingProject[]>) => {
        // Actualizamos el estado con pathState({nombre_propiedad: valor}).
        let newProjects:ISafeKeepingProject[] = projects.body.map( (project: ISafeKeepingProject) => {
            return Object.assign({periods:[]}, project);
        });
        const me = account.username;
        const selectedProject = projects.body[0];
        let partner: string = '';
        if (selectedProject) {
          partner = (selectedProject.parent1 === me) ? selectedProject.parent2 : selectedProject.parent1;
        }
        this.store.set(newProjects);
        this.store.setActive(selectedProject.id);

        this.store.update({selectedProjectPartner: partner });
        this.loadProject(selectedProject.id);
      }, err => {
        // Log errors if any
        console.log(err);
      });
  }

  loadProject(idProject: number, force: boolean = true)
  {
    const project: SafeKeepingProject   = this.store.getValue().entities[idProject];
    const periods: SafeKeepingPeriod[]  = project.periods ? project.periods : null;
    const currentYear: string           = this.store.getValue().currentYear;

    // TODO:Gestionar peticiones correctas y erores
    if (periods.length > 0) {
      return;
    }

    this.periodsService.findAllByProjectAndYear(project.id, currentYear).subscribe(
        // (notifs: INotification[]) => {
        (periods: HttpResponse<ISafeKeepingPeriod[]>) => {
          this.store.addSafeKeepingPeriods(project.id, periods.body);
        }, err => {
          // Log errors if any
          console.log(err);
        }
    );

  }

  addNewSafeKeepingPeriod(period: SafeKeepingPeriod) {
    const projectId = this.query.getActiveId() as number;
    period.year = this.store.getValue().currentYear;
    period.safeKeepingProjectId = projectId;

    this.periodsService.create(period).subscribe(
      (periodCreated: HttpResponse<SafeKeepingPeriod>) => {
        period.id = periodCreated.body.id;
        this.store.addSafeKeepingPeriods(projectId, [period]);
      });
  }

  updateSafeKeepingPeriod(period: SafeKeepingPeriod) {
    const projectId = this.query.getActiveId() as number;
    period.year = this.store.getValue().currentYear;
    period.safeKeepingProjectId = projectId;

    this.periodsService.update(period).subscribe(
      (periodCreated: HttpResponse<SafeKeepingPeriod>) => {
        this.store.updateSafeKeepingPeriods(projectId, period);
      });
  }

  deleteSafeKeepingPeriod(period: SafeKeepingPeriod) {
    const projectId = this.query.getActiveId() as number;
    // period.year = this.store.getValue().currentYear;
    // period.safeKeepingProjectId = projectId;

    this.periodsService.delete(period.id).subscribe(
      (periodCreated: HttpResponse<SafeKeepingPeriod>) => {
        this.store.deleteSafeKeepingPeriods(projectId, period);
      });
  }
}
