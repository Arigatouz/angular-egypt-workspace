import { SortMeta } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Component, computed, effect, inject, Injector, runInInjectionContext, signal } from '@angular/core';

import { Product } from '../../interfaces';
import { ProductsService } from '../../services';

import { TableComponent, TableColumn } from 'src/app/shared';

const sortConfig = {
  '1': 'asc',
  '-1': 'desc',
};

@Component({
  selector: 'app-products',
  imports: [TableComponent, ButtonModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
  providers: [ProductsService],
})
export class Products {
  readonly #injector = inject(Injector);
  readonly #productsService = inject(ProductsService);

  readonly pageSize = signal(10);
  readonly pageNumber = signal(1);
  readonly totalCount = signal(0);

  readonly sort = signal('');
  readonly order = signal('');

  pageTableColumns = signal<TableColumn<Product>[]>([
    {
      title: 'Title',
      rowPropertyName: 'title',
      sortable: true,
    },
    {
      title: 'Description',
      rowPropertyName: 'description',
      resizable: true,
    },
    {
      title: 'Price',
      rowPropertyName: 'price',
      sortable: true,
      customCellFormatter: (row) => `$${row.price}`,
      customCellClass: (row) =>
        row.price > 50 && row.price < 100 ? 'text-orange-500' : row.price > 100 ? 'text-red-500' : 'text-green-500',
    },
    {
      title: 'Category',
      rowPropertyName: 'category',
    },
  ]);

  readonly tableFilterPayload = computed(() => ({
    // skip: Math.floor(this.pageNumber() / this.pageSize()) + 1, // page number -> 1, 2, 3
    skip: this.pageNumber(),
    limit: this.pageSize(),
    sortBy: this.sort(),
    order: this.order(),
  }));

  tableRows = this.#productsService.getAll(() => ({ params: this.tableFilterPayload() }));
  _rows!: Product[];

  constructor() {
    effect(() => {
      if (this.tableRows.hasValue()) {
        this.totalCount.set(this.tableRows.value().total);
        this._rows = this.tableRows.value().products;
      }
    });
  }

  sortChange(event: SortMeta[] | SortMeta) {
    if (Array.isArray(event)) {
      const sort = event[0];
      this.sort.set(sort.field);
      this.order.set(sortConfig[sort.order.toString() as keyof typeof sortConfig]);
    } else {
      this.sort.set(event.field);
      this.order.set(sortConfig[event.order.toString() as keyof typeof sortConfig]);
    }
  }

  filterChange(event: { global: string } | null) {
    runInInjectionContext(this.#injector, () => {
      if (!event) this.tableRows = this.#productsService.getAll(() => ({ params: this.tableFilterPayload() }));
      else this.tableRows = this.#productsService.search(() => ({ params: { q: event.global } }));
    });
  }
}
