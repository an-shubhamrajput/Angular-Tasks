import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyApiDataDisplayComponent } from './company-api-data-display.component';

describe('CompanyApiDataDisplayComponent', () => {
  let component: CompanyApiDataDisplayComponent;
  let fixture: ComponentFixture<CompanyApiDataDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyApiDataDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyApiDataDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
