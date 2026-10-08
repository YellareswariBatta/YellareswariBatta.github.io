import { Directive, ElementRef, inject } from '@angular/core';

/** Tracks the pointer so `.spotlight::after` can paint a soft glow under the cursor. */
@Directive({
  selector: '[appSpotlight]',
  host: {
    class: 'spotlight',
    '(pointermove)': 'onMove($event)',
  },
})
export class SpotlightDirective {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  onMove(event: PointerEvent) {
    const rect = this.el.getBoundingClientRect();
    this.el.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    this.el.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }
}
