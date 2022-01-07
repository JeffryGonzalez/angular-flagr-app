import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlagrModule } from './features/flagr/flagr.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlagrModule.forRoot({ serverUrl: 'http://localhost:18000'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
