import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmtpInfoComponent } from './smtp-info.component';

describe('SmtpInfoComponent', () => {
  let component: SmtpInfoComponent;
  let fixture: ComponentFixture<SmtpInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmtpInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmtpInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
