import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiographyModalComponent } from './biography-modal.component';

describe('BiographyModalComponent', () => {
  let component: BiographyModalComponent;
  let fixture: ComponentFixture<BiographyModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiographyModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiographyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
