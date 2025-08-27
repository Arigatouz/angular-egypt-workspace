import { Injectable, Signal } from '@angular/core';
import { httpResource, HttpResourceRequest } from '@angular/common/http';

import { environment } from 'src/environments/environment';

interface IRequest {
  url: HttpResourceRequest['url'];
  params: Signal<HttpResourceRequest['params']>;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  readonly #baseUrl = environment.baseUrl;

  get<T>(request: IRequest) {
    return httpResource<T>(() => ({
      url: `${this.#baseUrl}${request.url}`,
      params: request.params(),
    }));
  }
}
