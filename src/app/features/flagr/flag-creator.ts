import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlagrConfig } from './flagr.module';
import { Extractor, FlagrEvaluationRequest, FlagToEvaluate } from './types';

export function createFlag<Response, ContextType>(
  request: FlagrEvaluationRequest<ContextType>,
  matcher: Extractor<Response>
): FlagToEvaluate<Response> {
  return {
    request,
    matcher,
  };
}

export const extractBoolean: Extractor<boolean> = (a) =>
  a.variantKey.toLowerCase() === 'true';
export const extractString: Extractor<string> = (a) => a.variantKey;
export const extractNumber: Extractor<number> = (a) => parseFloat(a.variantKey);

export function initializeFeatureFlags(
  client: HttpClient,
  config: FlagrConfig
): Observable<any> {
  const entities = config.flagsToEvaluate.map((flag) => flag.request);
  return client.post(config.serverUrl + '/api/v1/evaluation/batch', {
    entities,
  });
}
