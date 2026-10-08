import { Component, inject } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { MARQUEE, PROFILE } from '../../data/portfolio.data';
import { ACCENTS, ThemeService } from '../../shared/theme.service';
import { RevealDirective } from '../../shared/reveal.directive';
import { SpotlightDirective } from '../../shared/spotlight.directive';
import { TiltDirective } from '../../shared/tilt.directive';
import { MagneticDirective } from '../../shared/magnetic.directive';

@Component({
  selector: 'app-hero',
  imports: [CdkDrag, RevealDirective, SpotlightDirective, TiltDirective, MagneticDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  protected readonly theme = inject(ThemeService);
  protected readonly profile = PROFILE;
  protected readonly accents = ACCENTS;
  protected readonly marquee = MARQUEE;

  protected readonly chips = [
    { cls: 'chip-1', icon: 'fa-brands fa-angular', label: 'Angular 20 · Signals' },
    { cls: 'chip-2', icon: 'fa-brands fa-figma', label: 'Figma → Code' },
    { cls: 'chip-3', icon: 'fa-solid fa-bolt', label: '~30% faster UI dev' },
  ];

  // Headline split into words so each can animate in on a stagger.
  protected readonly headline = [
    { text: 'I' },
    { text: 'design' },
    { text: '&' },
    { text: 'engineer' },
    { text: 'interfaces', accent: true },
    { text: 'people', accent: true },
    { text: 'love', accent: true },
    { text: 'to' },
    { text: 'use.' },
  ];

  scrollTo(event: Event, id: string) {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
