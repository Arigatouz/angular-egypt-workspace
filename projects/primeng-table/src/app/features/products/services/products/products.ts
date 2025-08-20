import { inject, Injectable } from '@angular/core';
import { HttpResourceRequest } from '@angular/common/http';

import { Product } from '../../interfaces';

import { HttpService } from 'src/app/core';

type URLConfig = Pick<HttpResourceRequest, 'url'>;

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  readonly #httpService = inject(HttpService);

  readonly #config: URLConfig = {
    url: 'products',
  };

  getAll(HttpConfig: () => Omit<HttpResourceRequest, 'url'>) {
    return this.#httpService.get<Product[]>(() => ({
      ...HttpConfig(),
      url: this.#config.url,
    }));
  }

  search(HttpConfig: () => Omit<HttpResourceRequest, 'url'>) {
    return this.#httpService.get<Product[]>(() => ({
      ...HttpConfig(),
      url: `${this.#config.url}/search`,
    }));
  }
}
