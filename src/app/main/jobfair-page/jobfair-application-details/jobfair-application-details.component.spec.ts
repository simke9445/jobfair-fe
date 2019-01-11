import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobfairApplicationDetailsComponent } from './jobfair-application-details.component';

describe('JobfairApplicationDetailsComponent', () => {
  let component: JobfairApplicationDetailsComponent;
  let fixture: ComponentFixture<JobfairApplicationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobfairApplicationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobfairApplicationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
