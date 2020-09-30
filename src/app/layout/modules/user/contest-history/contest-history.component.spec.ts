import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestHistoryComponent } from './contest-history.component';

describe('ContestHistoryComponent', () => {
  let component: ContestHistoryComponent;
  let fixture: ComponentFixture<ContestHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
