import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicPoolsComponent } from './topic-pools.component';

describe('TopicPoolsComponent', () => {
  let component: TopicPoolsComponent;
  let fixture: ComponentFixture<TopicPoolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicPoolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicPoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
