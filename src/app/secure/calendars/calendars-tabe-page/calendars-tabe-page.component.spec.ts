import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarsTabePageComponent } from './calendars-tabe-page.component';

describe('CalendarsTabePageComponent', () => {
  let component: CalendarsTabePageComponent;
  let fixture: ComponentFixture<CalendarsTabePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarsTabePageComponent ],
      imports: []
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarsTabePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
