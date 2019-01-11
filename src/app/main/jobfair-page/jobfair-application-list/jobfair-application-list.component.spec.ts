import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobfairApplicationListComponent } from './jobfair-application-list.component';

describe('JobfairApplicationListComponent', () => {
  let component: JobfairApplicationListComponent;
  let fixture: ComponentFixture<JobfairApplicationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobfairApplicationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobfairApplicationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
