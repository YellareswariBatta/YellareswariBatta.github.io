import { Component } from '@angular/core';
import { EXPERIENCE } from '../../data/portfolio.data';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-experience',
  imports: [RevealDirective],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {
  protected readonly roles = EXPERIENCE;
}
