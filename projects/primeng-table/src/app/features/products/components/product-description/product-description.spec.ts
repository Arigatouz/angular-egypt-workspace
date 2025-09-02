import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDescription } from './product-description';

describe('ProductDescription', () => {
  let component: ProductDescription;
  let fixture: ComponentFixture<ProductDescription>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDescription]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDescription);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
