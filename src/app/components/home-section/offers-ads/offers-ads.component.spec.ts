import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersAdsComponent } from './offers-ads.component';

describe('OffersAdsComponent', () => {
  let component: OffersAdsComponent;
  let fixture: ComponentFixture<OffersAdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersAdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersAdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
