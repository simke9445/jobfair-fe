import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobfairPageComponent } from './jobfair-page.component';

describe('JobfairPageComponent', () => {
  let component: JobfairPageComponent;
  let fixture: ComponentFixture<JobfairPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobfairPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobfairPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
