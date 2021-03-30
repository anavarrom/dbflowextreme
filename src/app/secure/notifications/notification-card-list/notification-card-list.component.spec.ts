import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationCardListComponent } from './notification-card-list.component';

describe('NotificationCardListComponent', () => {
  let component: NotificationCardListComponent;
  let fixture: ComponentFixture<NotificationCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
