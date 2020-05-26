import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Last30daysComponent } from './last30days.component';

describe('Last30daysComponent', () => {
  let component: Last30daysComponent;
  let fixture: ComponentFixture<Last30daysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Last30daysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Last30daysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
