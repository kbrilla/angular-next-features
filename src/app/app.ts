import { Component } from '@angular/core';
import { OptionalChainingLegacyDemoComponent } from './demos/optional-chaining-demo.component';
import { TsFeaturesDemoComponent } from './demos/ts-features-demo.component';
import { MixedChainingDemoComponent } from './demos/mixed-chaining-demo.component';

@Component({
  selector: 'app-root',
  imports: [
    OptionalChainingLegacyDemoComponent,
    TsFeaturesDemoComponent,
    MixedChainingDemoComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
