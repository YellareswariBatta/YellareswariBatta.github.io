import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { App } from './app';
import { routes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the hero headline on the home route', async () => {
    const harness = await RouterTestingHarness.create('/');
    const compiled = harness.routeNativeElement as HTMLElement;
    const headline = compiled.querySelector('h1')?.textContent?.replace(/\s+/g, ' ');
    expect(headline).toContain('interfaces people love');
  });
});
