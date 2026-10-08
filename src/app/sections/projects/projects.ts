import { Component } from '@angular/core';
import { CASE_STUDIES } from '../../data/portfolio.data';
import { RevealDirective } from '../../shared/reveal.directive';
import { SpotlightDirective } from '../../shared/spotlight.directive';
import { TiltDirective } from '../../shared/tilt.directive';

@Component({
  selector: 'app-projects',
  imports: [RevealDirective, SpotlightDirective, TiltDirective],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  protected readonly studies = CASE_STUDIES;

  // Static mock data for the illustrative UI previews.
  protected readonly weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  protected readonly bars = [42, 64, 50, 78, 58, 92, 70];
  protected readonly transactions = [
    { name: 'Salary credit', amount: '+ $4,250.00', positive: true },
    { name: 'Utilities', amount: '− $182.40', positive: false },
    { name: 'Transfer to savings', amount: '− $600.00', positive: false },
  ];
}
