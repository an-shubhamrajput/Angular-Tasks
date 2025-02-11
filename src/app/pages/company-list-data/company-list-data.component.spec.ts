import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyListDataComponent } from './company-list-data.component';

describe('CompanyListDataComponent', () => {
  let component: CompanyListDataComponent;
  let fixture: ComponentFixture<CompanyListDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyListDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyListDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
