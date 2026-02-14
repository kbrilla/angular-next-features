import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-overview',
  imports: [MatIconModule, RouterLink],
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
        <a class="pr-link" href="https://github.com/angular/angular/pull/67068" target="_blank">
          <mat-icon>code</mat-icon>
          PR #67068 — feat(compiler): add nativeOptionalChainingSemantics option
        </a>
      </section>

      <section class="feature-grid">
        <a class="feature-card" routerLink="/ts-features">
          <div class="card-icon ts"><mat-icon>code</mat-icon></div>
          <h3>TypeScript Template Features</h3>
          <p>Destructuring, BigInt, hex/octal/binary literals, computed properties, arrow rest params, block comments</p>
          <div class="card-footer">
            <span class="tag accent">NEW</span>
            <span class="tag">Parser</span>
            <span class="tag">Syntax</span>
          </div>
        </a>



        <a class="feature-card" routerLink="/mix-match">
          <div class="card-icon mix"><mat-icon>compare_arrows</mat-icon></div>
          <h3>Optional Chaining &amp; Migration</h3>
          <p>Native <code>?.</code> returns <code>undefined</code> vs legacy <code>null</code> — side-by-side comparison, migration schematic, and inlay hint integration</p>
          <div class="card-footer">
            <span class="tag accent">NEW</span>
            <span class="tag">Comparison</span>
            <span class="tag">Migration</span>
          </div>
        </a>

        <a class="feature-card" routerLink="/inlay-hints">
          <div class="card-icon ih"><mat-icon>visibility</mat-icon></div>
          <h3>Inlay Hints</h3>
          <p>118+ test scenarios — types for &#64;for, &#64;if, &#64;let, events, pipes, &#64;HostListener, required inputs, and more</p>
          <div class="card-footer">
            <span class="tag accent">NEW</span>
            <span class="tag">LSP 3.17</span>
            <span class="tag">DX</span>
          </div>
        </a>

        <a class="feature-card" routerLink="/css-intellisense">
          <div class="card-icon css"><mat-icon>palette</mat-icon></div>
          <h3>CSS/ARIA IntelliSense</h3>
          <p>25+ diagnostic codes, 500+ CSS properties, 60+ units, ARIA attributes, DOM events, host binding validation</p>
          <div class="card-footer">
            <span class="tag accent">NEW</span>
            <span class="tag">Language Service</span>
            <span class="tag">Validation</span>
          </div>
        </a>

        <a class="feature-card" routerLink="/template-debug">
          <div class="card-icon debug"><mat-icon>bug_report</mat-icon></div>
          <h3>Template Debug Overlay</h3>
          <p>Live debug values, template breakpoints, and AST-based expression extraction in the editor</p>
          <div class="card-footer">
            <span class="tag accent">NEW</span>
            <span class="tag">Debugging</span>
            <span class="tag">LSP</span>
          </div>
        </a>

        <a class="feature-card" routerLink="/selection-range">
          <div class="card-icon sr"><mat-icon>select_all</mat-icon></div>
          <h3>Selection Range</h3>
          <p>Smart Expand Selection through Angular template AST — identifier to expression to element to block</p>
          <div class="card-footer">
            <span class="tag accent">NEW</span>
            <span class="tag">LSP 3.15</span>
            <span class="tag">Navigation</span>
          </div>
        </a>

        <a class="feature-card" routerLink="/document-symbols">
          <div class="card-icon ds"><mat-icon>account_tree</mat-icon></div>
          <h3>Document Symbols</h3>
          <p>Outline panel, breadcrumbs, Go to Symbol for Angular template elements, control flow, and declarations</p>
          <div class="card-footer">
            <span class="tag accent">NEW</span>
            <span class="tag">LSP</span>
            <span class="tag">Navigation</span>
          </div>
        </a>

        <a class="feature-card" routerLink="/style-precedence">
          <div class="card-icon sp"><mat-icon>layers</mat-icon></div>
          <h3>Style Binding Bugs</h3>
          <p>Live demonstrations of actual bugs in Angular's style binding precedence — imports[] order, property variants, and more</p>
          <div class="card-footer">
            <span class="tag accent">BUGS</span>
            <span class="tag">Standalone</span>
            <span class="tag">CSS IntelliSense</span>
          </div>
        </a>



        <a class="feature-card" routerLink="/linked-editing">
          <div class="card-icon le"><mat-icon>edit</mat-icon></div>
          <h3>Linked Editing</h3>
          <p>Mirror cursor for HTML tag pairs — rename opening tag and the closing tag updates automatically in inline templates</p>
          <div class="card-footer">
            <span class="tag accent">NEW</span>
            <span class="tag">LSP</span>
            <span class="tag">DX</span>
          </div>
        </a>

        <a class="feature-card" routerLink="/query-diagnostics">
          <div class="card-icon vq"><mat-icon>find_in_page</mat-icon></div>
          <h3>View Query Diagnostics</h3>
          <p>3 new compiler diagnostics — missing required targets (NG8023), read:TemplateRef mismatches (NG8025), conditional-only refs (NG8028)</p>
          <div class="card-footer">
            <span class="tag accent">NEW</span>
            <span class="tag">Compiler</span>
            <span class="tag">Diagnostics</span>
          </div>
        </a>

        <a class="feature-card" routerLink="/document-symbols">
          <div class="card-icon th"><mat-icon>account_tree</mat-icon></div>
          <h3>Type Hierarchy</h3>
          <p>Navigate supertypes and subtypes — heritage clauses, type alias intersections, class expressions. Hybrid FindAllReferences approach.</p>
          <div class="card-footer">
            <span class="tag accent">NEW</span>
            <span class="tag">LSP</span>
            <span class="tag">Navigation</span>
          </div>
        </a>
      </section>

      <section class="stats-row">
        <div class="stat-card">
          <span class="stat-value">12</span>
          <span class="stat-label">Feature Demos</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">13+</span>
          <span class="stat-label">New Template Features</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">25+</span>
          <span class="stat-label">CSS/ARIA Diagnostic Codes</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">118</span>
          <span class="stat-label">Inlay Hint Test Cases</span>
        </div>
      </section>
    </div>
  `,
})
export class OverviewComponent {}
