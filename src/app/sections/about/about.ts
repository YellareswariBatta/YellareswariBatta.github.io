import { Component } from '@angular/core';
import { CAPABILITIES, EDUCATION } from '../../data/portfolio.data';
import { RevealDirective } from '../../shared/reveal.directive';
import { SpotlightDirective } from '../../shared/spotlight.directive';

@Component({
  selector: 'app-about',
  imports: [RevealDirective, SpotlightDirective],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  protected readonly capabilities = CAPABILITIES;
  protected readonly education = EDUCATION;
}
