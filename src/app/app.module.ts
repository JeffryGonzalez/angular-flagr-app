import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { createFlag, extractBoolean } from './features/flagr/flag-creator';
import { FlagrModule } from './features/flagr/flagr.module';

const flags = [createFlag({ flagKey: 'ng-courselist' }, extractBoolean)];
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlagrModule.forRoot({
      serverUrl: 'http://flagr.hypertheory-class.com',
      flagsToEvaluate: flags,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
