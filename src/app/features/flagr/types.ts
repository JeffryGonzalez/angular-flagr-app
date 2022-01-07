export interface FlagrEvaluationRequest<ContextType> {
  /** entityID is used to deterministically at random to evaluate the flag result. If it's empty, flagr will randomly generate one. */
  entityID?: string;
  entityType?: string;
  entityContext?: ContextType;
  enableDebug?: boolean;
  /** >=1 Set either this or the flag key */
  flagID?: number;
  /** Set either this or the flagId */
  flagKey?: string;
  flagTags?: string[];
  flagTagsOperator?: 'ANY' | 'ALL';
}

export interface FlagrEvaluationResponse {
  flagID?: number;
  flagKey?: string;
  flagSnapshotID?: number;
  segmentID?: number;
  variantID?: number;
  variantKey?: string;
  variantAttachment?: any;
  evalContext?: {
    entityID?: string;
    entityType?: string;
    entityContext?: any;
    enableDebug?: boolean;
    flagID?: number;
    flagKey?: string;
    flagTags?: string[];
    flagTagsOperator?: string;
  };
  timestamp?: string;
  evalDebugLog?: {
    segmentDebugLogs?: {
      segmentID?: number;
      msg?: string;
    }[];
    msg?: string;
  };
}

export type Extractor<R> = (a: { variantKey: string }) => R;

export type FlagToEvaluate<Response> = {
  request: FlagrEvaluationRequest<unknown>;
  matcher: Extractor<Response>;
};
