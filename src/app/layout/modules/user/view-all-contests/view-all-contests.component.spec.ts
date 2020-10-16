import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllContestsComponent } from './view-all-contests.component';

describe('ViewAllContestsComponent', () => {
  let component: ViewAllContestsComponent;
  let fixture: ComponentFixture<ViewAllContestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllContestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllContestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
