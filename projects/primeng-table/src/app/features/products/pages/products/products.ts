import { SortMeta } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Component, computed, inject, Injector, linkedSignal, runInInjectionContext, signal } from '@angular/core';

import { Product } from '../../interfaces/product';
import { ProductsService } from '../../services/products/products';

import { TableColumn } from 'src/app/shared/interfaces/table';
import { APIResponse } from 'src/app/core/interfaces/response';
import { TableComponent } from 'src/app/shared/components/table/table';

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
  readonly pageNumber = signal(0);
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

  tableDataAsResource = this.#productsService.getAll(this.tableFilterPayload);
  productsData = linkedSignal<APIResponse<Product[]> | undefined, APIResponse<Product[]> | undefined>({
    source: () => this.tableDataAsResource.value() as APIResponse<Product[]>,
    computation: (newVal, oldVal) => {
      if (!oldVal) return;
      if (!newVal) return oldVal.value;

      return newVal;
    },
  });

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
      if (event) {
        this.tableDataAsResource.destroy();
        this.tableDataAsResource = this.#productsService.search(signal({ q: event.global }));
      } else {
        this.pageSize.set(10);
        this.pageNumber.set(0);
        this.tableDataAsResource.destroy();
        this.tableDataAsResource = this.#productsService.getAll(this.tableFilterPayload);
      }
    });
  }
}
