import { Component } from '@angular/core';
import { FlagrService } from './features/flagr/flagr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-flagr-app';
  flag$ = this.flagr.fetchFlag({
    flagKey: 'coursesReady',
    enableDebug: false
  });
  constructor(private flagr:FlagrService) {

  }
}
