import { Injectable, Signal } from '@angular/core';
import { httpResource, HttpResourceRequest } from '@angular/common/http';

import { APIResponse } from '../../interfaces/response';

import { environment } from 'src/environments/environment.development';

interface Request {
  url: HttpResourceRequest['url'];
  params: Signal<HttpResourceRequest['params']>;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  readonly #baseUrl = environment.baseUrl;

  get<T>(request: Request) {
    return httpResource<APIResponse<T>>(() => ({
      url: `${this.#baseUrl}${request.url}`,
      params: request.params(),
    }));
  }
}
