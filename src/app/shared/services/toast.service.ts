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
  public success(text: string, displayTime: number = 600) {
    notify(text, 'success', displayTime);
  }

  public info(text: string, displayTime: number = 600) {
    notify(text, 'info', displayTime);
  }

  public warning(text: string, displayTime: number = 600) {
    notify(text, 'warning', displayTime);
  }

  public error(text: string, displayTime: number = 600) {
    notify(text, 'error', displayTime);
  }
}
