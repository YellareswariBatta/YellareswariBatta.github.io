import { DOCUMENT, Injectable, effect, inject, signal } from '@angular/core';

export type Theme = 'light' | 'dark';
export type Accent = 'coral' | 'violet' | 'ocean' | 'emerald';

export const ACCENTS: { id: Accent; label: string; swatch: string }[] = [
  { id: 'coral', label: 'Coral', swatch: 'linear-gradient(135deg, #ea580c, #e11d48)' },
  { id: 'violet', label: 'Violet', swatch: 'linear-gradient(135deg, #7c3aed, #db2777)' },
  { id: 'ocean', label: 'Ocean', swatch: 'linear-gradient(135deg, #0284c7, #4f46e5)' },
  { id: 'emerald', label: 'Emerald', swatch: 'linear-gradient(135deg, #059669, #0891b2)' },
];

/** Theme + accent are design tokens applied as data attributes on <html>. */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly root = inject(DOCUMENT).documentElement;

  readonly theme = signal<Theme>(this.root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
  readonly accent = signal<Accent>((this.root.getAttribute('data-accent') as Accent) || 'coral');

  constructor() {
    effect(() => this.apply('theme', this.theme()));
    effect(() => this.apply('accent', this.accent()));
  }

  toggleTheme() {
    this.theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  private apply(key: 'theme' | 'accent', value: string) {
    this.root.setAttribute(`data-${key}`, value);
    try {
      localStorage.setItem(`yb-${key}`, value);
    } catch {
      // Storage unavailable (private mode) — the attribute still applies for this visit.
    }
  }
}
