import { Component } from '@angular/core';
import { Navbar } from '../../sections/navbar/navbar';
import { Hero } from '../../sections/hero/hero';
import { About } from '../../sections/about/about';
import { Impact } from '../../sections/impact/impact';
import { Projects } from '../../sections/projects/projects';
import { Process } from '../../sections/process/process';
import { Experience } from '../../sections/experience/experience';
import { Skills } from '../../sections/skills/skills';
import { Contact } from '../../sections/contact/contact';
import { Footer } from '../../sections/footer/footer';
import { Sandbox } from '../../sections/sandbox/sandbox';
import { Cursor } from '../../shared/cursor';

@Component({
  selector: 'app-home',
  imports: [Cursor, Navbar, Hero, About, Impact, Projects, Process, Sandbox, Experience, Skills, Contact, Footer],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
