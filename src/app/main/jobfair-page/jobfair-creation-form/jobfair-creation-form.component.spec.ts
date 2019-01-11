import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobfairCreationFormComponent } from './jobfair-creation-form.component';

describe('JobfairCreationFormComponent', () => {
  let component: JobfairCreationFormComponent;
  let fixture: ComponentFixture<JobfairCreationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobfairCreationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobfairCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
