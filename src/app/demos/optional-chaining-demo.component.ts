/**
 * Optional Chaining Semantics Demo
 *
 * Demonstrates:
 *
 * - Legacy semantics: `?.` returns `null` on short-circuit (Angular default)
 * - Native semantics: `?.` returns `undefined` on short-circuit (ECMAScript standard)
 * - Per-component override via `optionalChainingSemantics: 'native' | 'legacy'`
 * - Project-wide: `strictOptionalChainingSemantics: true` in tsconfig
 * - Extended diagnostic: `legacySafeNavigationUsage`
 * - Migration schematic: `optional-chaining-semantics-migration`
 *
 * This component uses LEGACY semantics (default Angular behavior).
 */
import {Component, Pipe, signal} from '@angular/core';

@Pipe({ name: 'stringifyNullish', standalone: true })
export class StringifyNullishLegacyPipe {
  transform(value: any): string {
    return value === null ? 'null' : value === undefined ? 'undefined' : String(value);
  }
}

interface User {
  id: number;
  name: string;
  email?: string;
  address?: {
    street?: string;
    city?: string;
    zip?: string;
    country?: {
      name?: string;
      code?: string;
    };
  };
}

@Component({
  selector: 'app-optional-chaining-legacy-demo',
  imports: [StringifyNullishLegacyPipe],
  optionalChainingSemantics: 'legacy',  // this is the default
  template: `
    <div class="demo-container">
      <h2>Legacy Safe Navigation (default Angular behavior)</h2>
      <span class="badge legacy">optionalChainingSemantics: 'legacy'</span>
      <p class="description">
        With legacy semantics, <code>a?.b</code> returns <code>null</code> when
        <code>a</code> is nullish. This is the traditional Angular behavior.
      </p>

      <div class="example-section">
        <h3>Simple Property Access</h3>
        <div class="code-row">
          <code>user?.name</code>
          <span class="arrow">&rarr;</span>
          <span class="result">{{ currentUser()?.name }}</span>
        </div>
        <div class="code-row">
          <code>user?.email</code>
          <span class="arrow">&rarr;</span>
          <span class="result">{{ currentUser()?.email | stringifyNullish }}</span>
        </div>
      </div>

      <div class="example-section">
        <h3>Deep Chain Access</h3>
        <div class="code-row">
          <code>user?.address?.city</code>
          <span class="arrow">&rarr;</span>
          <span class="result">{{ currentUser()?.address?.city | stringifyNullish }}</span>
        </div>
        <div class="code-row">
          <code>user?.address?.country?.name</code>
          <span class="arrow">&rarr;</span>
          <span class="result">{{ currentUser()?.address?.country?.name | stringifyNullish }}</span>
        </div>
      </div>

      <div class="example-section">
        <h3>Null Coalescing with Legacy ?.</h3>
        <p class="note">
          <code>??</code> catches both <code>null</code> and <code>undefined</code>,
          so it works safely regardless of the semantics mode.
        </p>
        <div class="code-row">
          <code>user?.address?.city ?? 'N/A'</code>
          <span class="arrow">&rarr;</span>
          <span class="result">{{ currentUser()?.address?.city ?? 'N/A' }}</span>
        </div>
      </div>

      <div class="example-section pitfall">
        <h3>Strict Equality Pitfall</h3>
        <p class="warning">
          With legacy: <code>user?.missing === null</code> is <code>true</code> (returns null).<br>
          With native: <code>user?.missing === null</code> is <code>false</code> (returns undefined).<br>
          This is the key behavioral difference the PR addresses!
        </p>
      </div>

      <!-- Key access -->
      <div class="example-section">
        <h3>Key Index Access (?.[])</h3>
        <div class="code-row">
          <code>user?.address?.['city']</code>
          <span class="arrow">&rarr;</span>
          <span class="result">{{ currentUser()?.address?.['city'] | stringifyNullish }}</span>
        </div>
        <p class="note">
          <code>?.[key]</code> expressions are supported with native semantics.
          The migration schematic auto-converts simple chains but flags <code>?.[]</code> patterns
          for manual review.
        </p>
      </div>

      <!-- Migration Schematic -->
      <div class="example-section">
        <h3>Migration Schematic</h3>
        <p class="description">
          The <code>optional-chaining-semantics-migration</code> schematic auto-converts
          safe navigation chains. It uses AST-based analysis (not regex) and handles:
        </p>
        <div class="migration-list">
          <div class="migration-item"><code>a?.b</code> &rarr; <code>a?.b</code> (no change needed for simple chains)</div>
          <div class="migration-item"><code>a?.b === null</code> &rarr; <code>a?.b == null</code> (loose equality)</div>
          <div class="migration-item"><code>a?.b !== null</code> &rarr; <code>a?.b != null</code> (loose inequality)</div>
          <div class="migration-item"><code>a?.b ?? fallback</code> &rarr; unchanged (already nullish-safe)</div>
        </div>
        <p class="note">
          Run with: <code>ng generate &#64;angular/core:optional-chaining-semantics-migration</code>.
          The schematic now covers component templates plus host binding expressions in
          <code>&#64;Component.host</code> and <code>&#64;Directive.host</code>.
          It still does not rewrite arbitrary class code outside Angular template/host expressions.
          Supports <code>!.</code> patterns and negated ternary expressions in null-safe detection.
        </p>
      </div>

      <!-- Extended Diagnostic -->
      <div class="example-section">
        <h3>Extended Diagnostic: legacySafeNavigationUsage (NG8119)</h3>
        <p class="description">
          When <code>strictOptionalChainingSemantics</code> is NOT enabled, the language service
          produces a warning on every <code>?.</code> usage that would behave differently with
          native semantics.
        </p>
        <div class="code-row">
          <span class="diag-msg">NG8119: This safe navigation expression uses legacy Angular semantics
            (returns 'null' on short-circuit). With 'strictOptionalChainingSemantics' enabled,
            it would return 'undefined' instead.</span>
        </div>
        <p class="note">
          The diagnostic can be configured via <code>extendedDiagnostics</code> in tsconfig:
          <code>"legacySafeNavigationUsage": "warning" | "error" | "suppress"</code>
        </p>
      </div>

      <!-- Configuration Options -->
      <div class="example-section">
        <h3>Configuration Options</h3>
        <div class="config-list">
          <div class="config-row">
            <span class="config-where">tsconfig.json</span>
            <code>"strictOptionalChainingSemantics": true</code>
            <span class="config-scope">Project-wide</span>
          </div>
          <div class="config-row">
            <span class="config-where">&#64;Component</span>
            <code>optionalChainingSemantics: 'native'</code>
            <span class="config-scope">Per-component override</span>
          </div>
          <div class="config-row">
            <span class="config-where">&#64;Component</span>
            <code>optionalChainingSemantics: 'legacy'</code>
            <span class="config-scope">Opt-back to legacy</span>
          </div>
        </div>
      </div>

      <div class="controls">
        <button (click)="setUserWithAddress()">User with Address</button>
        <button (click)="setUserWithoutAddress()">User without Address</button>
        <button class="null-btn" (click)="setNullUser()">Null User</button>
      </div>
    </div>
  `,
  styles: [`
    .demo-container { max-width: 900px; margin: 0 auto; padding: 32px 32px 64px; }
    .badge {
      display: inline-block; padding: 3px 10px; border-radius: 6px;
      font-size: 11px; font-weight: 600; font-family: 'JetBrains Mono', monospace;
    }
    .legacy {
      background: rgba(251, 191, 36, 0.12); color: #fbbf24;
      border: 1px solid rgba(251, 191, 36, 0.25);
    }
    .description { color: var(--adev-text-secondary); line-height: 1.6; }
    code {
      background: var(--adev-code-bg); border: 1px solid var(--adev-code-border);
      padding: 2px 6px; border-radius: 4px; font-size: 13px; color: var(--adev-primary);
    }
    .example-section {
      background: var(--adev-surface); border: 1px solid var(--adev-border);
      border-left: 3px solid var(--adev-warning);
      padding: 20px; margin: 20px 0; border-radius: 8px;
    }
    .example-section.pitfall { border-left-color: var(--adev-error); }
    h3 { color: var(--adev-text); margin-top: 0; font-size: 16px; font-weight: 600; }
    .code-row {
      display: flex; align-items: center; gap: 12px;
      background: var(--adev-surface-2); padding: 10px 12px; border-radius: 6px;
      margin: 8px 0; font-size: 14px;
    }
    .arrow { color: var(--adev-text-tertiary); font-size: 18px; }
    .result { font-weight: 600; color: var(--adev-warning); }
    .note {
      background: rgba(96, 165, 250, 0.08); border-left: 3px solid var(--adev-info);
      padding: 10px 14px; border-radius: 6px; font-size: 13px; color: var(--adev-text-secondary);
    }
    .warning {
      background: rgba(248, 113, 113, 0.08); border-left: 3px solid var(--adev-error);
      padding: 10px 14px; border-radius: 6px; font-size: 13px; color: var(--adev-text-secondary);
    }
    .controls { display: flex; gap: 8px; margin-top: 16px; flex-wrap: wrap; }
    button {
      background: var(--adev-accent); color: white; border: none;
      padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 13px;
    }
    button:hover { opacity: 0.85; }
    .null-btn { background: var(--adev-error); }
    .migration-list { display: flex; flex-direction: column; gap: 6px; margin: 8px 0; }
    .migration-item { background: var(--adev-surface-2); padding: 8px 12px; border-radius: 6px; font-size: 13px; }
    .diag-msg { color: var(--adev-warning); font-style: italic; font-size: 13px; line-height: 1.6; }
    .config-list { display: flex; flex-direction: column; gap: 6px; }
    .config-row { display: flex; align-items: center; gap: 12px; background: var(--adev-surface-2); padding: 8px 12px; border-radius: 6px; font-size: 13px; flex-wrap: wrap; }
    .config-where { font-size: 11px; font-weight: 700; color: var(--adev-text-tertiary); min-width: 100px; }
    .config-scope { font-size: 11px; color: var(--adev-text-tertiary); margin-left: auto; }
  `],
})
export class OptionalChainingLegacyDemoComponent {
  currentUser = signal<User | null>(null);

  private userWithAddress: User = {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    address: {
      street: '123 Main St',
      city: 'New York',
      zip: '10001',
      country: {name: 'United States', code: 'US'},
    },
  };

  private userWithoutAddress: User = {
    id: 2,
    name: 'Bob Smith',
    email: 'bob@example.com',
  };

  setUserWithAddress() {
    this.currentUser.set(this.userWithAddress);
  }

  setUserWithoutAddress() {
    this.currentUser.set(this.userWithoutAddress);
  }

  setNullUser() {
    this.currentUser.set(null);
  }

  ngOnInit() {
    this.setUserWithAddress();
  }
}
