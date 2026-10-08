import { Component } from '@angular/core';
import { SKILLS } from '../../data/portfolio.data';
import { RevealDirective } from '../../shared/reveal.directive';
import { SpotlightDirective } from '../../shared/spotlight.directive';

@Component({
  selector: 'app-skills',
  imports: [RevealDirective, SpotlightDirective],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  protected readonly groups = SKILLS;
}
