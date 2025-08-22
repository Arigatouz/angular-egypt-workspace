import { HttpResourceRequest } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';

import { Product } from '../../interfaces/product';

import { HttpService } from 'src/app/core/services/http/http';

type URLConfig = Pick<HttpResourceRequest, 'url'>;

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  readonly #httpService = inject(HttpService);

  readonly #config: URLConfig = {
    url: 'products',
  };

  getAll(params: Signal<HttpResourceRequest['params']>) {
    return this.#httpService.get<Product[]>({
      url: this.#config.url,
      params,
    });
  }

  search(params: Signal<HttpResourceRequest['params']>) {
    return this.#httpService.get<Product[]>({
      url: `${this.#config.url}/search`,
      params,
    });
  }
}
