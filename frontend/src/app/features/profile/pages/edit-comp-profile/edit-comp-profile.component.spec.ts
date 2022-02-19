import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompProfileComponent } from './edit-comp-profile.component';

describe('EditCompProfileComponent', () => {
  let component: EditCompProfileComponent;
  let fixture: ComponentFixture<EditCompProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCompProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCompProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
