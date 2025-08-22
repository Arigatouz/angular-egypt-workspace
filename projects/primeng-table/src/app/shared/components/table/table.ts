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
import { NgTemplateOutlet } from '@angular/common';
import { Table, TableFilterEvent, TableModule, TablePageEvent } from 'primeng/table';

import { TableColumn } from '../../interfaces/table';

@Component({
  selector: 'app-table',
  imports: [TableModule, ButtonModule, InputTextModule, IconFieldModule, InputIconModule, NgTemplateOutlet],
  templateUrl: './table.html',
  styleUrl: './table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent {
  rows = input.required<unknown[], unknown[]>({
    transform: (rows) => {
      if (!this.withIndex() || !rows) return rows || [];

      return rows?.map((row, index) => ({
        ...(row as object),
        index: this.pageNumber() === 1 ? index + 1 : (this.pageNumber() - 1) * this.pageSize() + (index + 1),
      }));
    },
  });

  columns = input.required<TableColumn[], TableColumn[]>({
    transform: (columns) => {
      if (columns.find((column) => (column.rowPropertyName as string) === 'id') || !this.withIndex()) return columns;

      return [
        {
          title: '#',
          rowPropertyName: 'index',
        },
        ...columns,
      ];
    },
  });

  readonly withPaginator = input(true);
  readonly rowsPerPageOptions = input<number[]>([10, 25, 50, 100]);
  readonly pageSize = model(10);
  readonly pageNumber = model(1);
  readonly totalCount = input(0);
  readonly currentPageReportTemplate = input<string>('Showing {first} to {last} of {totalRecords} results');

  readonly isLazy = input(true);
  readonly withIndex = input(false);
  readonly loading = input(false);
  readonly sortMode = input<'single' | 'multiple'>('single');

  readonly globalFilterFields = computed(() => this.columns().map((column) => column.rowPropertyName));

  readonly sortChange = output<SortMeta[] | SortMeta>();
  readonly filterChange = output<{ global: string } | null>();

  readonly tableActionRef = contentChild('pTableRowAction', { read: TemplateRef });

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
  getEachColumnData(row: unknown, rowPropertyName: TableColumn['rowPropertyName']) {
    if (!row || !rowPropertyName) return undefined;

    const keys = (rowPropertyName as string).split('.');
    let value: unknown = row;

    for (const key of keys) {
      if (value == null) return undefined;
      value = value[key as keyof typeof value];
    }

    return value;
  }
}
