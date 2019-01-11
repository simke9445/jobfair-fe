import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContestModalComponent } from './create-contest-modal.component';

describe('CreateContestModalComponent', () => {
  let component: CreateContestModalComponent;
  let fixture: ComponentFixture<CreateContestModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateContestModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
