import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideContestsComponent } from './side-contests.component';

describe('SideContestsComponent', () => {
  let component: SideContestsComponent;
  let fixture: ComponentFixture<SideContestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideContestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideContestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
