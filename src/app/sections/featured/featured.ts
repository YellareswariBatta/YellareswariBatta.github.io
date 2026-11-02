import { Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { FEATURED } from '../../data/portfolio.data';
import { RevealDirective } from '../../shared/reveal.directive';
import { SpotlightDirective } from '../../shared/spotlight.directive';
import { TiltDirective } from '../../shared/tilt.directive';
import { MagneticDirective } from '../../shared/magnetic.directive';

@Component({
  selector: 'app-featured',
  imports: [RevealDirective, SpotlightDirective, TiltDirective, MagneticDirective],
  templateUrl: './featured.html',
  styleUrl: './featured.scss',
})
export class Featured {
  protected readonly project = FEATURED;
  protected readonly active = signal(0);
  private paused = false;

  constructor() {
    const destroyRef = inject(DestroyRef);

    // Auto-advance the screenshots; pauses while the visitor hovers or focuses the frame.
    afterNextRender(() => {
      const reduceMotion =
        typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) return;
      const timer = setInterval(() => {
        if (!this.paused) this.active.update((i) => (i + 1) % this.project.shots.length);
      }, 4500);
      destroyRef.onDestroy(() => clearInterval(timer));
    });
  }

  protected select(index: number) {
    this.active.set(index);
  }

  protected pause(value: boolean) {
    this.paused = value;
  }

  /** Arrow-key navigation between tabs, per the WAI-ARIA tabs pattern. */
  protected onTabKey(event: KeyboardEvent) {
    const count = this.project.shots.length;
    const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (this.active() + delta + count) % count;
    this.active.set(next);
    (event.currentTarget as HTMLElement).parentElement
      ?.querySelectorAll<HTMLElement>('[role="tab"]')
      [next]?.focus();
  }
}
