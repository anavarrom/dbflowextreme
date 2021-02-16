import { SafeKeepingProject } from './../../models/safeKeepingProject';
import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ProjectsStore, ProjectsState } from './projects.store';
import { SafeKeepingPeriodsMap } from '../../models/safekeepingPeriod';

@Injectable({ providedIn: 'root' })
export class ProjectsQuery extends QueryEntity<ProjectsState> {

  allSelectedProjectPeriods$ = this.select(state => {
    const project: SafeKeepingProject  = this.getActive() as SafeKeepingProject;
    return project.periods;
  });

  constructor(protected store: ProjectsStore) {
    super(store);
  }

  get Partner() : string {
    return this.getValue().selectedProjectPartner;
   }

  get PeriodsByDate() : SafeKeepingPeriodsMap {
    const project: SafeKeepingProject  = this.getActive() as SafeKeepingProject;
    let datePeriods = new Map();
    project.periods.forEach(period => {
      datePeriods.set(period.startDate.toDate().toDateString(), period);
    });

    return datePeriods;
  }
}
