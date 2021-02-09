import { SafeKeepingPeriod } from 'src/app/core/models/safekeepingPeriod';
import { Injectable } from '@angular/core';
import { ActiveState, arrayAdd, arrayRemove, arrayUpdate, EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { SafeKeepingProject } from '../../models/safeKeepingProject';

export interface ProjectsState extends EntityState<SafeKeepingProject> , ActiveState {
  selectedProjectPartner: string,
  currentYear:string
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'projects' })
export class ProjectsStore extends EntityStore<ProjectsState> {

  selectSnapshot(me: any) {
    throw new Error('Method not implemented.');
  }

  addSafeKeepingPeriods(projectId: number, newPeriods: SafeKeepingPeriod[] ) {
    this.update(projectId, ({ periods }) => ({
      periods: arrayAdd(periods, newPeriods)
    }));
  }

  updateSafeKeepingPeriods(projectId: number, period: SafeKeepingPeriod ) {
    this.update(projectId, ({ periods }) => ({
      periods: arrayUpdate(periods, period.id, period)
    }));
  }

  deleteSafeKeepingPeriods(projectId: number, period: SafeKeepingPeriod ) {
    this.update(projectId, ({ periods }) => ({
      periods: arrayRemove(periods, period.id)
    }));
  }

  constructor() {
    super({
      selectedProjectPartner: '',
      currentYear: '2021'  });
  }
}
