import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { FlagrConfig, FLAGR_CONFIGURATION } from './flagr.module';
import { FlagrEvaluationRequest, FlagrEvaluationResponse } from './types';

@Injectable()
export class FlagrService {
  private url: string;
  constructor(
    private httpClient: HttpClient,
    @Inject(FLAGR_CONFIGURATION) private flagrConfig: FlagrConfig
  ) {
    this.url = flagrConfig.serverUrl;
  }

  // doFlagLookup<ContextType>(
  //   flagRequest: FlagrEvaluationRequest<ContextType>,
  //   predicate: (p: FlagrEvaluationResponse) => boolean
  // ): Observable<boolean> {
  //   return this.httpClient
  //     .post<FlagrEvaluationResponse>(
  //       `${this.url}/api/v1/evaluation`,
  //       flagRequest
  //     )
  //     .pipe(map((r) => predicate(r)));
  // }
}
