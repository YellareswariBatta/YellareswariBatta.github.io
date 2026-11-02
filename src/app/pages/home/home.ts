import { Component, inject } from '@angular/core';
import { Navbar } from '../../sections/navbar/navbar';
import { Hero } from '../../sections/hero/hero';
import { About } from '../../sections/about/about';
import { StackSwitch } from '../../sections/stack-switch/stack-switch';
import { Impact } from '../../sections/impact/impact';
import { Featured } from '../../sections/featured/featured';
import { Projects } from '../../sections/projects/projects';
import { Process } from '../../sections/process/process';
import { Sandbox } from '../../sections/sandbox/sandbox';
import { Experience } from '../../sections/experience/experience';
import { Skills } from '../../sections/skills/skills';
import { Contact } from '../../sections/contact/contact';
import { Footer } from '../../sections/footer/footer';
import { Cursor } from '../../shared/cursor';
import { ScrollBuddy } from '../../shared/scroll-buddy/scroll-buddy';
import { BuddyService } from '../../shared/scroll-buddy/buddy.service';

@Component({
  selector: 'app-home',
  imports: [
    Cursor,
    Navbar,
    Hero,
    About,
    StackSwitch,
    Impact,
    Featured,
    Projects,
    Process,
    Sandbox,
    Experience,
    Skills,
    Contact,
    Footer,
    ScrollBuddy,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly buddy = inject(BuddyService);
}
