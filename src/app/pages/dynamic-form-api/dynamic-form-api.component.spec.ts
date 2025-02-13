import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormAPIComponent } from './dynamic-form-api.component';

describe('DynamicFormAPIComponent', () => {
  let component: DynamicFormAPIComponent;
  let fixture: ComponentFixture<DynamicFormAPIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicFormAPIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicFormAPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
