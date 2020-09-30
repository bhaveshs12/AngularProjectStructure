import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicsPoolComponent } from './topics-pool.component';

describe('TopicsPoolComponent', () => {
  let component: TopicsPoolComponent;
  let fixture: ComponentFixture<TopicsPoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopicsPoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicsPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
