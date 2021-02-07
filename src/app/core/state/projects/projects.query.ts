import { SafeKeepingProject } from './../../models/safeKeepingProject';
import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ProjectsStore, ProjectsState } from './projects.store';

@Injectable({ providedIn: 'root' })
export class ProjectsQuery extends QueryEntity<ProjectsState> {

  allSelectedProjectPeriods$ = this.select(state => {
    let project: SafeKeepingProject  = this.getActive() as SafeKeepingProject;
    return project.periods;
  });


  constructor(protected store: ProjectsStore) {
    super(store);
  }

  get Partner() : string {
    return this.getValue().selectedProjectPartner;
   }
}
