import { SortMeta } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Component, computed, inject, Injector, linkedSignal, runInInjectionContext, signal, TemplateRef, viewChild } from '@angular/core';

import { IProduct } from '../../interfaces/product';
import { ProductsService } from '../../services/products/products';
import { ProductDescription } from '../../components/product-description/product-description';

import { ITableColumn } from 'src/app/shared/interfaces/table';
import { ISelectOption } from 'src/app/shared/interfaces/select-option';
import { TableComponent } from 'src/app/shared/components/table/table';
import { IPaginatedResponse } from 'src/app/core/interfaces/response';

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

  readonly titleCellRef = viewChild<TemplateRef<HTMLElement>>('titleCellRef');
  readonly filterOptionRef = viewChild<TemplateRef<HTMLElement>>('filterOptionRef');

  readonly selectedRows = signal<IProduct[]>([]);

  readonly #productCategories = this.#productsService.getAllProductCategories();

  readonly pageTableColumns = signal<ITableColumn<IProduct>[]>([
    {
      title: 'Title',
      rowPropertyName: 'title',
      sortable: true,
      customCellTemplate: this.titleCellRef,
      filterable: true,
      filterType: 'text',
    },
    {
      title: 'Description',
      rowPropertyName: 'description',
      resizable: true,
      customCellComponent: ProductDescription,
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
      filterable: true,
      filterType: 'select',
      filterOptionTemplate: this.filterOptionRef,
      filterOptions: linkedSignal({
        source: () => this.#productCategories.value(),
        computation: (categories) => {
          if (!categories || !categories.length) return [];

          return categories.map((category) => ({ id: category, label: category }));
        },
      }),
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
  productsData = linkedSignal<IPaginatedResponse<IProduct[]> | undefined, IPaginatedResponse<IProduct[]> | undefined>({
    source: () => this.tableDataAsResource.value() as IPaginatedResponse<IProduct[]>,
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

  filterChange(event: Record<string, unknown> | null) {
    console.log(event);

    runInInjectionContext(this.#injector, () => {
      if (event && event['global']) {
        this.tableDataAsResource.destroy();
        this.tableDataAsResource = this.#productsService.search(signal({ q: event['global'] as string }));
      } else if (event && event['category']) {
        this.tableDataAsResource.destroy();
        this.tableDataAsResource = this.#productsService.getProductsByCategory((event['category'] as ISelectOption)['id']);
      } else {
        this.pageSize.set(10);
        this.pageNumber.set(0);
        this.tableDataAsResource.destroy();
        this.tableDataAsResource = this.#productsService.getAll(this.tableFilterPayload);
      }
    });
  }

  removeAllSelectedRows() {
    this.selectedRows.set([]);
  }
}
