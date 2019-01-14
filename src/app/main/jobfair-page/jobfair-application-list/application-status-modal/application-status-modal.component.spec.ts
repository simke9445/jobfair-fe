import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationStatusModalComponent } from './application-status-modal.component';

describe('ApplicationStatusModalComponent', () => {
  let component: ApplicationStatusModalComponent;
  let fixture: ComponentFixture<ApplicationStatusModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationStatusModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationStatusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
