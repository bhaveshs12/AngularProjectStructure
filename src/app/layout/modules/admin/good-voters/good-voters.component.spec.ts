import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodVotersComponent } from './good-voters.component';

describe('GoodVotersComponent', () => {
  let component: GoodVotersComponent;
  let fixture: ComponentFixture<GoodVotersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodVotersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodVotersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
