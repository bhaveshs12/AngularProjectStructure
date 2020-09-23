import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditContestComponent } from './add-edit-contest.component';

describe('AddEditContestComponent', () => {
  let component: AddEditContestComponent;
  let fixture: ComponentFixture<AddEditContestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditContestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditContestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
