import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestRatesCurrencyWiseDetailsComponent } from './latest.rates.currency.wise.details.component';

describe('LatestRatesCurrencyWiseDetailsComponent', () => {
  let component: LatestRatesCurrencyWiseDetailsComponent;
  let fixture: ComponentFixture<LatestRatesCurrencyWiseDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatestRatesCurrencyWiseDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestRatesCurrencyWiseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
