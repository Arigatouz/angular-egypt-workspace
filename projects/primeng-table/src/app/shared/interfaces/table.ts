// Utility type to build dot-notation nested keys, e.g. "category.name.first"
/**
 * Represents a utility type `DotNestedKeysOf` that computes a union of all possible
 * dot-separated keys from a nested object type `T`.
 *
 * This type recursively traverses the structure of the provided object type `T`,
 * generating keys in the format of `parent.child` for nested properties.
 *
 * For each property in `T`:
 * - If the property is a nested object, it concatenates the parent key with the computed
 *   dot-separated keys of the nested object.
 * - Otherwise, it includes the key as is.
 *
 * This type is generally used to infer and operate on dot-separated paths of deeply nested objects.
 *
 * @template T - The object type whose nested keys are to be computed.
 */
type DotNestedKeysOf<T> = T extends object
  ? {
    [P in keyof T & string]: T[P] extends object ? `${P}.${DotNestedKeysOf<T[P]>}` : `${P}`;
  }[keyof T & string]
  : never;

/**
 * Interface representing a table column configuration.
 *
 * This interface provides a flexible and type-safe way to define how data should be
 * displayed, sorted, and formatted within table columns. It leverages TypeScript's
 * type system to ensure compile-time validation of property paths and provide
 * IntelliSense support for nested property access.
 *
 * @template T - The type of the row data object. This ensures type safety when
 *               accessing nested properties and provides IntelliSense support.
 *
 * @example
 * Basic column configuration:
 * ```typescript
 * interface User {
 *   id: number;
 *   name: string;
 *   profile: { age: number; city: string; };
 * }
 *
 * const columns: ITableColumn<User>[] = [
 *   {
 *     title: 'Name',
 *     rowPropertyName: 'name',
 *     sortable: true
 *   },
 *   {
 *     title: 'Age',
 *     rowPropertyName: 'profile.age',
 *     sortable: true
 *   }
 * ];
 * ```
 *
 * @example
 * Advanced column with custom formatting:
 * ```typescript
 * {
 *   title: 'Price',
 *   rowPropertyName: 'price',
 *   sortable: true,
 *   customCellFormatter: (row) => `$${row.price.toFixed(2)}`,
 *   customCellClass: (row) => row.price > 100 ? 'text-red-500' : 'text-green-500'
 * }
 * ```
 *
 * @example
 * Special columns:
 * ```typescript
 * // Index column - shows row numbers
 * { title: '#', rowPropertyName: 'index' }
 *
 * // Action column - for buttons/links
 * { title: 'Actions', rowPropertyName: 'action' }
 * ```
 *
 * Properties:
 * - `title` - **Required.** The display name for the column header.
 * - `rowPropertyName` - **Required.** Specifies which property from the row data to display:
 *   - `DotNestedKeysOf<T>`: Type-safe dot notation paths to nested properties (e.g., 'user.profile.name')
 *   - `'index'`: Special value to display row index/number
 *   - `'action'`: Special value for action columns (buttons, links, etc.)
 * - `sortable?` - **Optional.** Enables sorting functionality for this column.
 * - `resizable?` - **Optional.** Allows users to resize the column width.
 * - `customCellClass?` - **Optional.** Function to dynamically apply CSS classes to individual cells based on row data.
 *   Receives the row data as parameter and should return a string of CSS class names.
 * - `customCellFormatter?` - **Optional.** Function to format the cell value for display. The original data remains
 *   unchanged; only the display value is modified. Receives the row data as parameter and should return a formatted string.
 */
export interface ITableColumn<T> {
  title: string;
  rowPropertyName: DotNestedKeysOf<T> | 'index' | 'action';
  sortable?: boolean;
  resizable?: boolean;
  customCellClass?(row: T): string;
  customCellFormatter?(row: T): string;
}
