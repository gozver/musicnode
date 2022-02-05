import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBandProfileComponent } from './edit-band-profile.component';

describe('EditBandProfileComponent', () => {
  let component: EditBandProfileComponent;
  let fixture: ComponentFixture<EditBandProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBandProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBandProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
