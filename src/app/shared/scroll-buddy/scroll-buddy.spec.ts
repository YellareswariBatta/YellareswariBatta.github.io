import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollBuddy } from './scroll-buddy';

describe('ScrollBuddy', () => {
  let component: ScrollBuddy;
  let fixture: ComponentFixture<ScrollBuddy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScrollBuddy],
    }).compileComponents();

    fixture = TestBed.createComponent(ScrollBuddy);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
