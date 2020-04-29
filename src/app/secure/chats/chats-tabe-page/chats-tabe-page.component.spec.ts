import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatsTabePageComponent } from './chats-tabe-page.component';

describe('ChatsTabePageComponent', () => {
  let component: ChatsTabePageComponent;
  let fixture: ComponentFixture<ChatsTabePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatsTabePageComponent ],
      imports: []
    }).compileComponents();

    fixture = TestBed.createComponent(ChatsTabePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
