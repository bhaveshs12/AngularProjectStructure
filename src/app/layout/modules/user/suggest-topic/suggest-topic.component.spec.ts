import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestTopicComponent } from './suggest-topic.component';

describe('SuggestTopicComponent', () => {
  let component: SuggestTopicComponent;
  let fixture: ComponentFixture<SuggestTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
