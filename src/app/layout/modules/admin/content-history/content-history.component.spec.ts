import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentHistoryComponent } from './content-history.component';

describe('ContentHistoryComponent', () => {
  let component: ContentHistoryComponent;
  let fixture: ComponentFixture<ContentHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
