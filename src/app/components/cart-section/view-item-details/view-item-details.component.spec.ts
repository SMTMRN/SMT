import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewItemDetailsComponent } from './view-item-details.component';

describe('ViewItemDetailsComponent', () => {
  let component: ViewItemDetailsComponent;
  let fixture: ComponentFixture<ViewItemDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewItemDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
