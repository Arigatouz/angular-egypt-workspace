// Utility type to build dot-notation nested keys, e.g. "category.name.first"
type DotNestedKeysOf<T> = T extends object
  ? {
      [P in keyof T & string]: T[P] extends object ? `${P}.${DotNestedKeysOf<T[P]>}` : `${P}`;
    }[keyof T & string]
  : never;

export interface ITableColumn<T> {
  title: string;
  // Accept:
  // - top-level keys of T (e.g. "price")
  // - dot-notation paths for nested object properties (e.g. "category.name")
  // - special columns: "index" and "action"
  rowPropertyName: DotNestedKeysOf<T> | 'index' | 'action';

  // Whether the column is sortable
  sortable?: boolean;

  // Whether the column is resizable
  resizable?: boolean;

  // Adding custom class to the cell
  customCellClass?(row: T): string;

  // Custom cell formatter to re-format the cell value
  customCellFormatter?(row: T): string;
}
