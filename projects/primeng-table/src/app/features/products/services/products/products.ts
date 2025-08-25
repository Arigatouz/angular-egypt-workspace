import { HttpResourceRequest } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';

import { IProduct } from '../../interfaces/product';

import { HttpService } from 'src/app/core/services/http/http';
import { IPaginatedResponse } from 'src/app/core/interfaces/response';

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
    return this.#httpService.get<IPaginatedResponse<IProduct[]>>({
      url: this.#config.url,
      params,
    });
  }

  search(params: Signal<HttpResourceRequest['params']>) {
    return this.#httpService.get<IPaginatedResponse<IProduct[]>>({
      url: `${this.#config.url}/search`,
      params,
    });
  }
}
