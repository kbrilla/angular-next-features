import {Component} from '@angular/core';

@Component({
  selector: 'app-ts-features-demo',
  template: `
    <div class="demo-container">
      <h2>TypeScript Features in Angular Templates</h2>
      <p>
        This demo previously used experimental syntax that is not enabled in the current build.
      </p>
      <p>
        Use the optional chaining demos to validate current compiler behavior.
      </p>
    </div>
  `,
  styles: [
    `
      .demo-container {
        max-width: 900px;
        margin: 0 auto;
        padding: 32px;
      }
    `,
  ],
})
export class TsFeaturesDemoComponent {}
