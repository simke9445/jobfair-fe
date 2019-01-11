import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobfairApplicationFormComponent } from './jobfair-application-form.component';

describe('JobfairApplicationFormComponent', () => {
  let component: JobfairApplicationFormComponent;
  let fixture: ComponentFixture<JobfairApplicationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobfairApplicationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobfairApplicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
