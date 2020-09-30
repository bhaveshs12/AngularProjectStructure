import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteVideoComponent } from './vote-video.component';

describe('VoteVideoComponent', () => {
  let component: VoteVideoComponent;
  let fixture: ComponentFixture<VoteVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
