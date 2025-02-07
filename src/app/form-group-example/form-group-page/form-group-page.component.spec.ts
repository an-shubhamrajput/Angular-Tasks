import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGroupPageComponent } from './form-group-page.component';

describe('FormGroupPageComponent', () => {
  let component: FormGroupPageComponent;
  let fixture: ComponentFixture<FormGroupPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormGroupPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormGroupPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
