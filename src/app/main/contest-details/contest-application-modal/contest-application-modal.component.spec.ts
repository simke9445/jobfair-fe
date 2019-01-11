import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestApplicationModalComponent } from './contest-application-modal.component';

describe('ContestApplicationModalComponent', () => {
  let component: ContestApplicationModalComponent;
  let fixture: ComponentFixture<ContestApplicationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestApplicationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestApplicationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
