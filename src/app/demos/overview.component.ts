import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-overview',
  imports: [MatIconModule],
  template: `
    <div class="overview-page">
      <section class="hero">
        <div class="wip-banner">
          <mat-icon class="wip-icon">construction</mat-icon>
          <div>
            <strong>Work in Progress</strong>
            <p>Both this demo application and the features it showcases are under active
              development. Some features may be incomplete, experimental, or subject to change.</p>
          </div>
        </div>
        <h1 class="hero-title">Angular Template Upgrades</h1>
        <p class="hero-subtitle">
          Proposed features that modernize Angular's template expression system and developer
          experience
        </p>
      </section>

      <section class="feature-grid">
        <button class="feature-card" (click)="go('/ts-features')">
          <div class="card-icon ts"><mat-icon>code</mat-icon></div>
          <h3>TypeScript Template Features</h3>
          <p>Destructuring, BigInt, hex/octal/binary literals, computed properties, arrow rest params, block comments</p>
          <div class="card-footer">
            <span class="tag accent">NEW</span>
            <span class="tag">Parser</span>
            <span class="tag">Syntax</span>
          </div>
        </button>

        <button class="feature-card" (click)="go('/optional-chaining')">
          <div class="card-icon oc"><mat-icon>link</mat-icon></div>
          <h3>Native Optional Chaining</h3>
          <p>Align <code>?.</code> with ECMAScript — return <code>undefined</code> instead of <code>null</code></p>
          <div class="card-footer">
            <span class="tag accent">NEW</span>
            <span class="tag">Runtime</span>
            <span class="tag">Migration</span>
          </div>
        </button>

        <button class="feature-card" (click)="go('/mix-match')">
          <div class="card-icon mix"><mat-icon>compare_arrows</mat-icon></div>
          <h3>Mix &amp; Match</h3>
          <p>Legacy and native components side by side with migration path examples</p>
          <div class="card-footer">
            <span class="tag accent">NEW</span>
            <span class="tag">Comparison</span>
            <span class="tag">Migration</span>
          </div>
        </button>

        <button class="feature-card" (click)="go('/inlay-hints')">
          <div class="card-icon ih"><mat-icon>visibility</mat-icon></div>
          <h3>Inlay Hints</h3>
          <p>Angular-specific inlay hints for templates — types for &#64;for, &#64;if, &#64;let, events, pipes, and more</p>
          <div class="card-footer">
            <span class="tag accent">NEW</span>
            <span class="tag">LSP 3.17</span>
            <span class="tag">DX</span>
          </div>
        </button>

        <button class="feature-card" (click)="go('/css-intellisense')">
          <div class="card-icon css"><mat-icon>palette</mat-icon></div>
          <h3>CSS/ARIA IntelliSense</h3>
          <p>55+ diagnostics for CSS properties, units, ARIA attributes, DOM events, and host binding syntax</p>
          <div class="card-footer">
            <span class="tag accent">NEW</span>
            <span class="tag">Language Service</span>
            <span class="tag">Validation</span>
          </div>
        </button>

        <button class="feature-card" (click)="go('/template-debug')">
          <div class="card-icon debug"><mat-icon>bug_report</mat-icon></div>
          <h3>Template Debug Overlay</h3>
          <p>Live debug values, template breakpoints, and AST-based expression extraction in the editor</p>
          <div class="card-footer">
            <span class="tag accent">NEW</span>
            <span class="tag">Debugging</span>
            <span class="tag">LSP</span>
          </div>
        </button>

        <button class="feature-card" (click)="go('/selection-range')">
          <div class="card-icon sr"><mat-icon>select_all</mat-icon></div>
          <h3>Selection Range</h3>
          <p>Smart Expand Selection through Angular template AST — identifier to expression to element to block</p>
          <div class="card-footer">
            <span class="tag accent">NEW</span>
            <span class="tag">LSP 3.15</span>
            <span class="tag">Navigation</span>
          </div>
        </button>

        <button class="feature-card" (click)="go('/document-symbols')">
          <div class="card-icon ds"><mat-icon>account_tree</mat-icon></div>
          <h3>Document Symbols</h3>
          <p>Outline panel, breadcrumbs, Go to Symbol for Angular template elements, control flow, and declarations</p>
          <div class="card-footer">
            <span class="tag accent">NEW</span>
            <span class="tag">LSP</span>
            <span class="tag">Navigation</span>
          </div>
        </button>

        <button class="feature-card" (click)="go('/style-precedence')">
          <div class="card-icon sp"><mat-icon>layers</mat-icon></div>
          <h3>Style Binding Bugs</h3>
          <p>Live demonstrations of actual bugs in Angular's style binding precedence — imports[] order, property variants, and more</p>
          <div class="card-footer">
            <span class="tag accent">BUGS</span>
            <span class="tag">Standalone</span>
            <span class="tag">CSS IntelliSense</span>
          </div>
        </button>
      </section>

      <section class="stats-row">
        <div class="stat-card">
          <span class="stat-value">9</span>
          <span class="stat-label">Feature Demos</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">13+</span>
          <span class="stat-label">New Template Features</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">55+</span>
          <span class="stat-label">CSS/ARIA Diagnostics</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">20+</span>
          <span class="stat-label">Inlay Hint Categories</span>
        </div>
      </section>
    </div>
  `,
})
export class OverviewComponent {
  private router = inject(Router);
  go(path: string) { this.router.navigate([path]); }
}
