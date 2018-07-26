import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsCategoryComponent } from './tools-category.component';

describe('ToolsCategoryComponent', () => {
  let component: ToolsCategoryComponent;
  let fixture: ComponentFixture<ToolsCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
