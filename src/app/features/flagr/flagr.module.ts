import { InjectionToken, ModuleWithProviders } from '@angular/core';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { FlagrService } from './flagr.service';


@NgModule({
  declarations: [],
  imports: [ HttpClientModule]
})
export class FlagrModule {

  static forRoot(flaggerConfig:FlagrConfig): ModuleWithProviders<FlagrModule> {
    return ({
      ngModule: FlagrModule,
      providers: [{
        provide: FLAGR_CONFIGURATION,
        useValue: flaggerConfig
      },

      FlagrService
    ]
    })
  }
 }
export const FLAGR_CONFIGURATION = 'FLAGR_CONFIGURATION';
 export const WVMapModuleConfig = new InjectionToken<FlagrConfig>(FLAGR_CONFIGURATION);
 export interface FlagrConfig {
  serverUrl: string;
 }
