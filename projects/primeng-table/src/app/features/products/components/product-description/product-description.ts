import { Component, input } from '@angular/core';
import { IProduct } from '../../interfaces/product';

@Component({
  selector: 'app-product-description',
  imports: [],
  templateUrl: './product-description.html',
  styleUrl: './product-description.scss',
})
export class ProductDescription {
  rowData = input.required<IProduct>();
}
