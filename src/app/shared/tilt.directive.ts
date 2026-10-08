import { Directive, ElementRef, inject, input } from '@angular/core';

/**
 * Exposes pointer-driven `--rx` / `--ry` rotation vars on the host so CSS can
 * apply a 3D tilt to the host or its children. Mouse only.
 */
@Directive({
  selector: '[appTilt]',
  host: {
    '(pointermove)': 'onMove($event)',
    '(pointerleave)': 'onLeave()',
  },
})
export class TiltDirective {
  /** Maximum rotation in degrees. */
  readonly appTilt = input(8, { transform: (v: unknown) => Number(v) || 8 });

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  onMove(event: PointerEvent) {
    if (event.pointerType !== 'mouse') return;
    const rect = this.el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    const max = this.appTilt();
    this.el.style.setProperty('--ry', `${(px * max * 2).toFixed(2)}deg`);
    this.el.style.setProperty('--rx', `${(-py * max * 2).toFixed(2)}deg`);
    this.el.classList.add('tilting');
  }

  onLeave() {
    this.el.style.removeProperty('--rx');
    this.el.style.removeProperty('--ry');
    this.el.classList.remove('tilting');
  }
}
