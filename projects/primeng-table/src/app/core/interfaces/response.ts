export interface IPaginatedResponse<T> {
  products: T;
  skip: number;
  limit: number;
  total: number;
}
