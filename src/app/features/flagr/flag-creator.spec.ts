import { createFlag, extractBoolean, extractString } from './flag-creator';
import { Extractor, FlagrEvaluationRequest, FlagToEvaluate } from './types';

describe('Flag Creator', () => {
  it('does boolean', () => {
    const context = {
      dev: true,
    };
    const request: FlagrEvaluationRequest<typeof context> = {
      flagKey: 'tacos',
      entityContext: context,
    };

    const result = createFlag(request, extractBoolean);

    expect(result.matcher({ variantKey: 'true' })).toBeTrue();
    expect(result.matcher({ variantKey: 'false' })).toBe(false);
  });
  it('does string', () => {
    const context = {
      dev: true,
    };
    const request: FlagrEvaluationRequest<typeof context> = {
      flagKey: 'tacos',
      entityContext: context,
    };

    const result = createFlag(request, extractString);

    expect(result.matcher({ variantKey: 'tacos' })).toBe('tacos');
  });
});
describe('workshop', () => {
  it('does things', () => {
    const context = {
      dev: true,
    };
    const flags = [
      createFlag(
        { flagKey: 'ng-courselist', entityContext: context },
        extractBoolean
      ),
      createFlag({ flagKey: 'tacos', entityContext: context }, extractString),
    ];
    function doIt(flags: FlagToEvaluate<unknown>[]) {
      // go through each flag, make an entity
      const requests = flags.map((f) => f.request);
      const entities = requests.map(
        (e) =>
          ({
            entityContext: e.entityContext,
            entityId: e.entityID,
            entityType: e.entityType,
          } as FlagEntity)
      );
      console.log({ entities });
      const flagIDs = flags
        .map((f) => f.request)
        .filter((e) => e.flagID)
        .map((e) => e.flagID) as number[];

      const flagTags = [
        ...flagIDs.map((i) => i.toString()),
        ...flags.map((e) => e.request.flagKey),
      ] as string[];

      const seed: PostEvaluationBatch = {
        enableDebug: false,
        entities,
        flagIDs,
        flagTags,
        flagTagsOperator: 'ANY',
      };

      // post the entity and get the response
      // run the Extractor on each response and create a new thing with those keys and the appropriate response.
      return seed;
    }

    const result = doIt(flags);
    console.log(result);
  });
});

interface FlagEntity {
  entityId: string;
  entityType: string;
  entityContext: any;
}
interface PostEvaluationBatch {
  entities: FlagrEvaluationRequest<unknown>[];
  enableDebug: boolean;
  flagIDs: number[];
  flagTags: string[];
  flagTagsOperator: 'ANY' | 'ALL';
}
