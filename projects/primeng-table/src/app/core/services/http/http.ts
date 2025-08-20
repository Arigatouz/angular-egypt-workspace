import { Injectable } from '@angular/core';
import { httpResource, HttpResourceRequest } from '@angular/common/http';

import { APIResponse } from '../../interfaces';

import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  readonly #baseUrl = environment.baseUrl;

  get = <T>(request: () => HttpResourceRequest) =>
    httpResource<APIResponse<T>>(() => ({
      ...request(),
      url: `${this.#baseUrl}${request().url}`,
    }));
}
