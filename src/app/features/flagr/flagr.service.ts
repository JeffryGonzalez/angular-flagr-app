import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { FlagrConfig, FLAGR_CONFIGURATION } from "./flagr.module";


@Injectable()
export class FlagrService {

  constructor(
    private httpClient:HttpClient,
    @Inject(FLAGR_CONFIGURATION)  private flagrConfig:FlagrConfig) {
   // console.log(flagrConfig.serverUrl, 'SERVER URL');
  }

  fetchFlag(
    flagRequest: FlagrEvaluationRequest
  ) {
    return this.httpClient.post<FlagrEvaluationResponse>(`${this.flagrConfig.serverUrl}/api/v1/evaluation`,flagRequest )
  }
}


export interface FlagrEvaluationRequest {
  /** entityID is used to deterministically at random to evaluate the flag result. If it's empty, flagr will randomly generate one. */
  entityID?: string,
  entityType?: string,
  entityContext?: any,
  enableDebug?: boolean,
  /** >=1 Set either this or the flag key */
  flagID?: number,
  /** Set either this or the flagId */
  flagKey?: string,
  flagTags?: string[]
  flagTagsOperator?: 'ANY' | 'ALL'
  }

  export interface FlagrEvaluationResponse {
    flagID?: number,
    flagKey?: string,
    flagSnapshotID?: number,
    segmentID?: number,
    variantID?: number,
    variantKey?: string,
    variantAttachment?: any,
    evalContext?: {
      entityID?: string,
      entityType?: string,
      entityContext?: any,
      enableDebug?: boolean,
      flagID?: number,
      flagKey?: string,
      flagTags?: string[],
      flagTagsOperator?: string
    },
    timestamp?: string,
    evalDebugLog?: {
      segmentDebugLogs?:  {
        segmentID?: number,
        msg?: string
      }[],
      msg?: string
    }
  }
