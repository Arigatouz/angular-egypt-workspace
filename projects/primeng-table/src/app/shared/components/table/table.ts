import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  input,
  model,
  output,
  TemplateRef,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { SortMeta } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { Table, TableFilterEvent, TableModule, TablePageEvent } from 'primeng/table';

import { ITableColumn } from '../../interfaces/table';

@Component({
  selector: 'app-table',
  imports: [TableModule, ButtonModule, InputTextModule, IconFieldModule, InputIconModule, NgTemplateOutlet, NgComponentOutlet],
  templateUrl: './table.html',
  styleUrl: './table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent<T> {
  readonly rows = input.required<T[]>();

  readonly computedRows = computed(() => {
    if (!this.withIndex() || !this.rows()) return this.rows();

    const pageNumber = this.pageNumber() / this.pageSize() + 1;

    return this.rows()?.map((row, index) => ({
      ...row,
      index: pageNumber === 1 ? index + 1 : (pageNumber - 1) * this.pageSize() + (index + 1),
    }));
  });

  readonly columns = input.required<ITableColumn<T>[], ITableColumn<T>[]>({
    transform: (columns) => {
      if (columns.find((column) => column.rowPropertyName === 'id') || !this.withIndex()) return columns;

      return [
        {
          title: '#',
          rowPropertyName: 'index',
        },
        ...columns,
      ];
    },
  });

  readonly computedColumns = computed(() => {
    if (this.columns().find((column) => column.rowPropertyName === 'id') || !this.withIndex()) return this.columns();

    return [
      {
        title: '#',
        rowPropertyName: 'index',
      },
      ...this.columns(),
    ];
  });

  readonly withPaginator = input(true);
  readonly rowsPerPageOptions = input<number[]>([10, 25, 50, 100]);
  readonly pageSize = model(10);
  readonly pageNumber = model(1);
  readonly totalCount = input(0);
  readonly currentPageReportTemplate = input<string>('Showing {first} to {last} of {totalRecords} results');

  readonly withSelection = input(true);
  readonly selectedRows = model<T[]>([]);
  readonly isLazy = input(true);
  readonly withIndex = input(false);
  readonly loading = input(false);
  readonly sortMode = input<'single' | 'multiple'>('single');

  readonly globalFilterFields = computed(() => this.columns().map((column) => column.rowPropertyName));

  readonly sortChange = output<SortMeta[] | SortMeta>();
  readonly filterChange = output<{ global: string } | null>();

  readonly tableActionRef = contentChild('pTableRowAction', { read: TemplateRef });
  readonly tableCaptionActionRef = contentChild('pTableCaptionAction', { read: TemplateRef });

  readonly dt = viewChild(Table);

  /**
   * Handles the `onPage` event.
   *
   * @param event - The page event containing first (starting index) and rows (page size).
   */
  pageChange(event: TablePageEvent) {
    this.pageNumber.set(event.first);
    this.pageSize.set(event.rows);
  }

  /**
   * Handles the `onSort` event.
   *
   * @param event - The sort event.
   * @returns void
   */
  onSort(event: { multisortmeta: SortMeta[] } | SortMeta) {
    if ('multisortmeta' in event) this.sortChange.emit(event.multisortmeta);
    else this.sortChange.emit(event);
  }

  /**
   * Handles the `onFilter` event.
   *
   * @param event - The filter event.
   */
  onFilter(event: TableFilterEvent) {
    const filterValue = event.filters;
    if (!filterValue) return;

    if (!Object.keys(filterValue).length) {
      this.filterChange.emit(null);
      return;
    }

    if ('global' in filterValue) {
      const globalFilterValue = filterValue?.['global']?.value;
      this.filterChange.emit({ global: globalFilterValue });
    }
  }

  /**
   * Clears the filter.
   *
   * If the table is lazy, emits `null` to the `filterChange` output.
   * Otherwise, clears the filter of the `dt` table component.
   */
  clearFilter() {
    if (this.isLazy()) this.filterChange.emit(null);
    else this.dt()?.clear();
  }

  /**
   * Retrieves the value from a nested object property using dot notation.
   *
   * @param row - The data object to extract the value from
   * @param rowPropertyName - The property path in dot notation (e.g., 'user.profile.name')
   * @returns The value at the specified path, or undefined if the path doesn't exist
   *
   * @example
   * ```typescript
   * const data = { user: { profile: { name: 'John' } } };
   * getEachColumnData(data, 'user.profile.name'); // Returns 'John'
   * getEachColumnData(data, 'user.invalid.path'); // Returns undefined
   * ```
   */
  getEachColumnData(row: T, rowPropertyName: ITableColumn<T>['rowPropertyName']) {
    if (!row || !rowPropertyName) return undefined;

    const keys = rowPropertyName.split('.');
    let value: unknown = row;

    for (const key of keys) {
      if (!value) return undefined;
      value = value[key as keyof typeof value];
    }

    return value;
  }
}
