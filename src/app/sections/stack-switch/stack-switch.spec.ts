import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackSwitch, highlight } from './stack-switch';

describe('StackSwitch', () => {
  let component: StackSwitch;
  let fixture: ComponentFixture<StackSwitch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StackSwitch],
    }).compileComponents();

    fixture = TestBed.createComponent(StackSwitch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('switches the code sample between Angular and React', async () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.code.on code')?.textContent).toContain('@Component');

    (el.querySelector('[data-fw="react"]') as HTMLButtonElement).click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(el.querySelector('.code.on code')?.textContent).toContain('useState');
    expect(el.querySelector('[data-fw="react"]')?.getAttribute('aria-selected')).toBe('true');
  });

  it('cycles the preview status and wraps around', () => {
    const api = component as any;
    expect(api.status()).toBe('applied');
    api.advance();
    api.advance();
    expect(api.celebrate()).toBe(true);
    api.advance();
    expect(api.status()).toBe('applied');
  });
});

describe('highlight', () => {
  it('escapes markup so snippets are rendered as text', () => {
    const html = highlight('<script>alert("x")</script>');
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script');
  });

  it('wraps keywords and strings in token spans', () => {
    const html = highlight("export const a = 'b';");
    expect(html).toContain('<span class="tk-k">export</span>');
    expect(html).toContain('<span class="tk-s">\'b\'</span>');
  });
});
