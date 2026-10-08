import { Directive, ElementRef, inject } from '@angular/core';

/** Pulls the host gently toward the cursor while hovered. Mouse only. */
@Directive({
  selector: '[appMagnetic]',
  host: {
    '(pointermove)': 'onMove($event)',
    '(pointerleave)': 'onLeave()',
  },
})
export class MagneticDirective {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  onMove(event: PointerEvent) {
    if (event.pointerType !== 'mouse') return;
    const rect = this.el.getBoundingClientRect();
    const x = (event.clientX - (rect.left + rect.width / 2)) * 0.25;
    const y = (event.clientY - (rect.top + rect.height / 2)) * 0.35;
    this.el.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
  }

  onLeave() {
    this.el.style.translate = '';
  }
}
