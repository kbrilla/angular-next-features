/**
 * PR 1: Optional Chaining Semantics Demo
 *
 * Demonstrates features from kbrilla/angular copilot/implement-optional-chaining:
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
import {Component, signal} from '@angular/core';

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
  // optionalChainingSemantics: 'legacy',  // <-- PR 1 feature: this is the default
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
          <span class="result">{{ currentUser()?.email ?? 'null' }}</span>
        </div>
      </div>

      <div class="example-section">
        <h3>Deep Chain Access</h3>
        <div class="code-row">
          <code>user?.address?.city</code>
          <span class="arrow">&rarr;</span>
          <span class="result">{{ currentUser()?.address?.city ?? 'null' }}</span>
        </div>
        <div class="code-row">
          <code>user?.address?.country?.name</code>
          <span class="arrow">&rarr;</span>
          <span class="result">{{ currentUser()?.address?.country?.name ?? 'null' }}</span>
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

      <div class="controls">
        <button (click)="setUserWithAddress()">User with Address</button>
        <button (click)="setUserWithoutAddress()">User without Address</button>
        <button class="null-btn" (click)="setNullUser()">Null User</button>
      </div>
    </div>
  `,
  styles: [`
    .demo-container { padding: 20px; }
    .badge {
      display: inline-block; padding: 4px 12px; border-radius: 12px;
      font-size: 13px; font-weight: 600; font-family: monospace;
    }
    .legacy { background: #fef3c7; color: #92400e; border: 1px solid #f59e0b; }
    .description { color: #475569; line-height: 1.6; }
    code { background: #f1f5f9; padding: 2px 6px; border-radius: 3px; font-size: 13px; }
    .example-section {
      background: #fffbeb; border-left: 4px solid #f59e0b;
      padding: 16px; margin: 16px 0; border-radius: 4px;
    }
    .example-section.pitfall {
      background: #fef2f2; border-left-color: #ef4444;
    }
    h3 { color: #92400e; margin-top: 0; font-size: 16px; }
    .code-row {
      display: flex; align-items: center; gap: 12px;
      background: white; padding: 10px; border-radius: 4px;
      margin: 8px 0; font-size: 14px;
    }
    .arrow { color: #9ca3af; font-size: 18px; }
    .result { font-weight: 600; color: #92400e; }
    .note {
      background: #eff6ff; border-left: 3px solid #3b82f6;
      padding: 10px; border-radius: 4px; font-size: 13px; color: #1e40af;
    }
    .warning {
      background: #fef2f2; border-left: 3px solid #ef4444;
      padding: 10px; border-radius: 4px; font-size: 13px; color: #991b1b;
    }
    .controls { display: flex; gap: 8px; margin-top: 16px; flex-wrap: wrap; }
    button {
      background: #f59e0b; color: white; border: none;
      padding: 8px 16px; border-radius: 4px; cursor: pointer; font-size: 13px;
    }
    button:hover { background: #d97706; }
    .null-btn { background: #dc2626; }
    .null-btn:hover { background: #b91c1c; }
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
