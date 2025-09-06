# PrimeNG Table Component

A reusable, strongly-typed data table built with Angular 20 and PrimeNG 20. Designed for clarity, flexibility, and server-side (lazy) data workflows, with built-in pagination, sorting, filtering, selection, global search, and customizable cells.

- Location: `projects/primeng-table/src/app/shared/components/table/`
- Component: `TableComponent<T>` (selector: `app-table`)
- Dependencies: Angular 20, PrimeNG 20, Tailwind-ready

---

## 1) Why This Component

- Presents complex datasets cleanly and responsively
- Minimizes boilerplate for sorting, filtering, and pagination
- Plays nicely with server-driven (lazy) data
- Supports nested property access safely (e.g., `user.profile.name`)
- Encourages consistent UX with action areas and global search

---

## 2) Key Features at a Glance

- Pagination with dynamic page size and index
- Single or multi-column sorting
- Column-level filtering (text, select, or fully custom)
- Global "contains" search across displayed fields
- Row selection (header + row checkboxes)
- Optional "Actions" column via content slots
- Optional `#` index column
- Type-safe nested property paths
- Lightweight styling, Tailwind-friendly

---

## 3) Mental Model

- You provide `rows` and `columns`
- The component renders header, filters, and body accordingly
- User interactions (page, sort, filter) emit events or update two-way models
- In "lazy" mode, you refetch data from the server using current state

---

## 4) Component API Summary

**Inputs**
- `rows` (required): array of items to display
- `columns` (required): column configuration list
- `withPaginator` (default: true): show/hide paginator
- `rowsPerPageOptions` (default: [10, 25, 50, 100]): page size options
- `totalCount` (default: 0): total number of records (for lazy)
- `currentPageReportTemplate` (default: "Showing {first} to {last} of {totalRecords} results")
- `withSelection` (default: true): enable row selection (requires unique `id` per row)
- `isLazy` (default: true): server-side workflow on by default
- `withIndex` (default: false): add `#` column unless an `id` column exists
- `loading` (default: false): loading overlay
- `sortMode` (default: 'single'): 'single' or 'multiple'

**Two-way Models**
- `pageSize` (default: 10): current page size
- `pageNumber` (default: 0): current page start index (PrimeNG "first")
- `selectedRows` (default: []): selected items

**Outputs**
- `sortChange`: single or multiple sort meta
- `filterChange`: compact filter payload or null

**Content Slots**
- `pTableRowAction`: per-row actions (rightmost column), context: `row`
- `pTableCaptionAction`: header extra controls (left of search)

---

## 5) Column Configuration (Conceptual)

Each column describes:
- `title`: header label
- `rowPropertyName`: dot-path into row data (e.g., `role.label`), or special:
  - `'index'` (row number)
- `sortable`: enable sort
- `resizable`: enable user resizing
- `customCellClass(row)`: dynamic CSS classes
- `customCellFormatter(row)`: display value formatter
- `customCellTemplate`: full control via a template
- `customCellComponent`: render a component inside the cell

**Filtering options:**
- `filterable: true/false`
- Text filter: `filterType: 'text'` (contains)
- Select filter: `filterType: 'select'` + `filterOptions` list (`{ id, label }`) and optional custom option template
- Fully custom filter: provide `filterCellTemplate`

**Render priority per cell:**
1) `customCellTemplate`
2) `customCellComponent`
3) `customCellFormatter`
4) Default value via dot-path lookup

---

## 6) Behavior Details

**Pagination**
- Visible when `withPaginator` is `true` and there are rows
- Updates `pageNumber` and `pageSize` models on user change

**Sorting**
- Emits sort state; integrate with server queries in lazy mode

**Filtering**
- Global search applies to all `rowPropertyName`s
- Column filters emit a compact, meaningful payload
- "Clear" resets filters; in lazy mode it emits `null`

**Selection**
- Requires unique `id` for each row (`dataKey="id"` internally)
- Supports header and per-row checkboxes

**Index column**
- Enable via `withIndex`
- Respects pagination for accurate row numbering

---

## 7) Server-Side (Lazy) Workflow

- Maintain state: `pageSize`, `pageNumber`, `sort`, `filters`
- On any change:
  - Update state from two-way models or output events
  - Fetch data from the server using the current state
- Provide responses:
  - `rows` for the page
  - `totalCount` for paginator
  - Toggle `loading` around requests

**Recommended GET-only pattern**
- Use a minimal HTTP wrapper that returns resource-like signals for GETs
- Keep mutations (POST/PUT/PATCH/DELETE) with the standard HTTP client
- Benefits: clean, reactive data flows in templates, consistent state handling

---

## 8) UX & Accessibility

- PrimeNG offers strong accessibility baselines
- Provide clear labels for actions and ensure focus indicators
- Keep header text concise and descriptive
- Limit column count to the most valuable information

---

## 9) Styling & Theming

- Tailwind utility classes for spacing and layout
- Gridlines, resizable columns, and row hover enabled by default
- Customize paginator padding and select heights in the component stylesheet
- Align with your PrimeNG theme for consistent look and feel

---

## 10) Best Practices

- Always include a unique `id` on rows for selection
- In lazy mode:
  - Bind `pageSize`, `pageNumber`, `totalCount`, `loading`
  - React to `sortChange` and `filterChange` to refetch data
- Use dot-paths for nested values, e.g., `user.profile.name`
- Provide custom templates only where necessary; keep default renderers for performance

---

## 11) Troubleshooting

- **Selection not visible?**
  - Ensure `withSelection` is true and rows have a unique `id`
- **Filters not showing?**
  - Set `filterable: true` and define a filter type or a custom filter template
- **Index column not shown?**
  - Set `withIndex` to true (note: it won't add if you already show an `id` column)
- **Global search does nothing?**
  - Confirm your `columns` define meaningful `rowPropertyName`s

---

## 12) Demo Flow (For Presentations)

- Introduce the component (purpose, dependencies, where it lives)
- Show a dataset with paging and sorting
- Toggle filters (text and select) and global search
- Demonstrate selection and an action (e.g., bulk delete)
- Enable `withIndex` and explain index behavior with paging
- Explain lazy workflow and how state drives server requests
- Close with best practices and Q&A

---

## 13) Version & Compatibility

- Angular: 20.x
- PrimeNG: 20.x
- Prime Icons, themes, and Tailwind integration supported

---

## 14) FAQ

- **Can it render complex custom cells?**
  - Yes, via `customCellTemplate` or `customCellComponent`
- **How do I handle nested data?**
  - Use dot-paths in `rowPropertyName` (e.g., `role.label`)
- **Does it support multi-sort?**
  - Yes. Set `sortMode` to `'multiple'` and handle the emitted sort meta

---

This document is crafted as a presentation outline: use it to guide live demos, onboarding, or handoffs.