import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryDetailDialogComponent } from './product-category-detail-dialog.component';

describe('ProductCategoryDetailDialogComponent', () => {
  let component: ProductCategoryDetailDialogComponent;
  let fixture: ComponentFixture<ProductCategoryDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCategoryDetailDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategoryDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
