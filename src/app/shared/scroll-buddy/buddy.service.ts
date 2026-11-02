import { Injectable, signal } from '@angular/core';

const KEY = 'yb-buddy';

/** Whether the scroll companion is shown; remembered per browser. */
@Injectable({ providedIn: 'root' })
export class BuddyService {
  readonly visible = signal(this.read());

  setVisible(value: boolean) {
    this.visible.set(value);
    try {
      localStorage.setItem(KEY, value ? 'on' : 'off');
    } catch {
      // Storage unavailable — the choice still applies for this visit.
    }
  }

  private read() {
    try {
      return localStorage.getItem(KEY) !== 'off';
    } catch {
      return true;
    }
  }
}
