export interface APIResponse<T> {
  products: T;
  skip: number;
  limit: number;
  total: number;
}
