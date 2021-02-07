import { Injectable } from '@angular/core';

import notify from 'devextreme/ui/notify';

@Injectable()
export class ToastService {
  constructor() {}

  /**
   * Show a toast with information 
   * @remarks
   *
   * @param text - text to show
   */
  public info(text: string, displayTime: number = 600) {
    notify(text, 'info', displayTime);
  }
}
