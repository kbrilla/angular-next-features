/**
 * Mixed Usage Demo: Legacy + Native Optional Chaining Side by Side
 *
 * Shows that components with different optionalChainingSemantics can coexist
 * in the same application. This is a key feature of PR 1:
 *
 * - LegacyChainingComponent uses `optionalChainingSemantics: 'legacy'` (default)
 * - NativeChainingComponent uses `optionalChainingSemantics: 'native'`
 * - Both render side-by-side showing the behavioral differences
 */
import {Component, signal, Input} from '@angular/core';
import {JsonPipe} from '@angular/common';

interface Config {
  theme?: string;
  debug?: boolean;
  api?: {
    baseUrl?: string;
    timeout?: number;
    headers?: {
      authorization?: string;
    };
  };
}

/**
 * Legacy semantics component.
 * optionalChainingSemantics: 'legacy' (default behavior, can be omitted)
 */
@Component({
  selector: 'app-legacy-chaining',
  // optionalChainingSemantics: 'legacy',
  template: `
    <div class="panel legacy">
      <h3>Legacy Component</h3>
      <span class="badge legacy-badge">optionalChainingSemantics: 'legacy'</span>
      <p class="small">a?.b returns <strong>null</strong> when a is nullish</p>

      <div class="result-row">
        <code>config?.theme</code>
        <span class="value">{{ config()?.theme ?? fallbackLabel }}</span>
      </div>
      <div class="result-row">
        <code>config?.api?.baseUrl</code>
        <span class="value">{{ config()?.api?.baseUrl ?? fallbackLabel }}</span>
      </div>
      <div class="result-row">
        <code>config?.api?.timeout</code>
        <span class="value">{{ config()?.api?.timeout ?? fallbackLabel }}</span>
      </div>
      <div class="result-row">
        <code>config?.api?.headers?.authorization</code>
        <span class="value">{{ config()?.api?.headers?.authorization ?? fallbackLabel }}</span>
      </div>

      <div class="comparison-box">
        <p><strong>Strict equality (legacy):</strong></p>
        <code>config?.missing === null</code>
        <span class="result-true">true (returns null)</span>
      </div>
    </div>
  `,
  styles: [`
    .panel { padding: 20px; border-radius: 8px; height: 100%; }
    .legacy { background: #fffbeb; border: 2px solid #f59e0b; }
    h3 { margin-top: 0; }
    .badge {
      display: inline-block; padding: 3px 10px; border-radius: 10px;
      font-size: 12px; font-weight: 600; font-family: monospace;
    }
    .legacy-badge { background: #fef3c7; color: #92400e; }
    .small { font-size: 13px; color: #64748b; }
    code { background: #f8fafc; padding: 2px 6px; border-radius: 3px; font-size: 12px; }
    .result-row {
      display: flex; justify-content: space-between; align-items: center;
      padding: 8px; margin: 6px 0; background: white; border-radius: 4px;
    }
    .value { font-weight: 600; color: #92400e; }
    .comparison-box {
      margin-top: 12px; padding: 10px; background: #fef2f2;
      border-radius: 4px; border-left: 3px solid #ef4444;
    }
    .result-true { display: block; margin-top: 4px; font-weight: 700; color: #16a34a; }
  `],
})
export class LegacyChainingComponent {
  config = signal<Config | null>(null);
  fallbackLabel = 'null';

  @Input() set configData(value: Config | null) {
    this.config.set(value);
  }
}

/**
 * Native semantics component.
 * optionalChainingSemantics: 'native' (ECMAScript behavior)
 */
@Component({
  selector: 'app-native-chaining',
  // optionalChainingSemantics: 'native',  // <-- PR 1 feature
  template: `
    <div class="panel native">
      <h3>Native Component</h3>
      <span class="badge native-badge">optionalChainingSemantics: 'native'</span>
      <p class="small">a?.b returns <strong>undefined</strong> when a is nullish</p>

      <div class="result-row">
        <code>config?.theme</code>
        <span class="value">{{ config()?.theme ?? fallbackLabel }}</span>
      </div>
      <div class="result-row">
        <code>config?.api?.baseUrl</code>
        <span class="value">{{ config()?.api?.baseUrl ?? fallbackLabel }}</span>
      </div>
      <div class="result-row">
        <code>config?.api?.timeout</code>
        <span class="value">{{ config()?.api?.timeout ?? fallbackLabel }}</span>
      </div>
      <div class="result-row">
        <code>config?.api?.headers?.authorization</code>
        <span class="value">{{ config()?.api?.headers?.authorization ?? fallbackLabel }}</span>
      </div>

      <div class="comparison-box">
        <p><strong>Strict equality (native):</strong></p>
        <code>config?.missing === null</code>
        <span class="result-false">false (returns undefined)</span>
      </div>
    </div>
  `,
  styles: [`
    .panel { padding: 20px; border-radius: 8px; height: 100%; }
    .native { background: #eff6ff; border: 2px solid #3b82f6; }
    h3 { margin-top: 0; }
    .badge {
      display: inline-block; padding: 3px 10px; border-radius: 10px;
      font-size: 12px; font-weight: 600; font-family: monospace;
    }
    .native-badge { background: #dbeafe; color: #1e40af; }
    .small { font-size: 13px; color: #64748b; }
    code { background: #f8fafc; padding: 2px 6px; border-radius: 3px; font-size: 12px; }
    .result-row {
      display: flex; justify-content: space-between; align-items: center;
      padding: 8px; margin: 6px 0; background: white; border-radius: 4px;
    }
    .value { font-weight: 600; color: #1e40af; }
    .comparison-box {
      margin-top: 12px; padding: 10px; background: #fef2f2;
      border-radius: 4px; border-left: 3px solid #ef4444;
    }
    .result-false { display: block; margin-top: 4px; font-weight: 700; color: #dc2626; }
  `],
})
export class NativeChainingComponent {
  config = signal<Config | null>(null);
  fallbackLabel = 'undefined';

  @Input() set configData(value: Config | null) {
    this.config.set(value);
  }
}

/**
 * Parent container: shows both legacy and native components side by side
 * with the same data, proving they can be mixed and matched.
 */
@Component({
  selector: 'app-mixed-chaining-demo',
  imports: [LegacyChainingComponent, NativeChainingComponent, JsonPipe],
  template: `
    <div class="demo-container">
      <h2>Mix and Match: Legacy + Native Optional Chaining</h2>
      <p class="description">
        Both components receive the <strong>same data</strong> but use different
        <code>optionalChainingSemantics</code>. They coexist in the same app,
        proving per-component override works alongside the project-wide setting.
      </p>

      <div class="config-section">
        <h3>tsconfig.json (project-wide)</h3>
        <pre class="config-code">{{ '{' }}
  "angularCompilerOptions": {{ '{' }}
    "strictOptionalChainingSemantics": true
  {{ '}' }}
{{ '}' }}</pre>
        <p class="config-note">
          Each component can override via <code>optionalChainingSemantics: 'legacy'</code>
          or <code>'native'</code> in its &#64;Component decorator.
        </p>
      </div>

      <div class="side-by-side">
        <app-legacy-chaining [configData]="currentConfig()"></app-legacy-chaining>
        <app-native-chaining [configData]="currentConfig()"></app-native-chaining>
      </div>

      <div class="data-controls">
        <h3>Test Data</h3>
        <div class="control-buttons">
          <button (click)="setFullConfig()">Full Config</button>
          <button (click)="setPartialConfig()">Partial Config</button>
          <button (click)="setMinimalConfig()">Minimal Config</button>
          <button class="null-btn" (click)="setNullConfig()">Null Config</button>
        </div>
        <pre class="data-preview">{{ currentConfig() | json }}</pre>
      </div>

      <div class="migration-section">
        <h3>Migration Path</h3>
        <div class="migration-steps">
          <div class="step">
            <span class="step-num">1</span>
            <div>
              <strong>Enable diagnostic warning</strong>
              <p><code>"legacySafeNavigationUsage": "warning"</code> in extended diagnostics</p>
            </div>
          </div>
          <div class="step">
            <span class="step-num">2</span>
            <div>
              <strong>Run migration schematic</strong>
              <p><code>ng generate &#64;angular/core:optional-chaining-semantics-migration</code></p>
            </div>
          </div>
          <div class="step">
            <span class="step-num">3</span>
            <div>
              <strong>Enable native semantics</strong>
              <p><code>"strictOptionalChainingSemantics": true</code> in tsconfig</p>
            </div>
          </div>
          <div class="step">
            <span class="step-num">4</span>
            <div>
              <strong>Per-component override</strong>
              <p>Override individual components that need legacy behavior</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Migration Examples -->
      <div class="examples-section">
        <h3>Migration Examples (from actual schematic tests)</h3>

        <div class="example-group safe">
          <h4>Safe Contexts (no change needed)</h4>
          <p class="group-description">
            These expressions behave identically with null or undefined —
            the migration schematic leaves them as-is.
          </p>

          <div class="example-row">
            <div class="before"><code>{{ '{{ a?.b }}' }}</code></div>
            <div class="arrow">&rarr;</div>
            <div class="after"><code>{{ '{{ a?.b }}' }}</code></div>
            <div class="reason">Interpolation renders both null and undefined as ""</div>
          </div>

          <div class="example-row">
            <div class="before"><code>{{ '{{ a?.b?.c?.d }}' }}</code></div>
            <div class="arrow">&rarr;</div>
            <div class="after"><code>{{ '{{ a?.b?.c?.d }}' }}</code></div>
            <div class="reason">Deep chains in interpolation — same rendering</div>
          </div>

          <div class="example-row">
            <div class="before"><code>{{ "{{ a?.b ?? 'fallback' }}" }}</code></div>
            <div class="arrow">&rarr;</div>
            <div class="after"><code>{{ "{{ a?.b ?? 'fallback' }}" }}</code></div>
            <div class="reason">?? catches both null and undefined</div>
          </div>

          <div class="example-row">
            <div class="before"><code>{{ "{{ a?.b || 'default' }}" }}</code></div>
            <div class="arrow">&rarr;</div>
            <div class="after"><code>{{ "{{ a?.b || 'default' }}" }}</code></div>
            <div class="reason">|| treats both as falsy</div>
          </div>

          <div class="example-row">
            <div class="before"><code>{{ '{{ a?.b && something }}' }}</code></div>
            <div class="arrow">&rarr;</div>
            <div class="after"><code>{{ '{{ a?.b && something }}' }}</code></div>
            <div class="reason">Both are falsy — same short-circuit</div>
          </div>

          <div class="example-row">
            <div class="before"><code>{{ '{{ !a?.b }}' }}</code></div>
            <div class="arrow">&rarr;</div>
            <div class="after"><code>{{ '{{ !a?.b }}' }}</code></div>
            <div class="reason">Negation: both falsy = true</div>
          </div>

          <div class="example-row">
            <div class="before"><code>{{ '{{ a?.b == null }}' }}</code></div>
            <div class="arrow">&rarr;</div>
            <div class="after"><code>{{ '{{ a?.b == null }}' }}</code></div>
            <div class="reason">Loose equality: null == undefined is true</div>
          </div>

          <div class="example-row">
            <div class="before"><code>{{ '{{ a?.b != null }}' }}</code></div>
            <div class="arrow">&rarr;</div>
            <div class="after"><code>{{ '{{ a?.b != null }}' }}</code></div>
            <div class="reason">Loose inequality: same rule</div>
          </div>

          <div class="example-row">
            <div class="before"><code>{{ '{{ a?.b ? x : y }}' }}</code></div>
            <div class="arrow">&rarr;</div>
            <div class="after"><code>{{ '{{ a?.b ? x : y }}' }}</code></div>
            <div class="reason">Condition position — truthiness check only</div>
          </div>
        </div>

        <div class="example-group sensitive">
          <h4>Sensitive Contexts (MUST convert — ternary form)</h4>
          <p class="group-description">
            These expressions would behave differently with null vs undefined.
            The migration converts them to explicit ternary guards.
          </p>

          <div class="example-row">
            <div class="before"><code>{{ '{{ a?.b }}' }} in strict equality</code></div>
            <div class="arrow">&rarr;</div>
            <div class="after"><code>{{ '{{ a != null ? a.b : null }}' }}</code></div>
            <div class="reason">Preserves null return for === null checks</div>
          </div>

          <div class="example-row">
            <div class="before"><code>{{ '{{ a?.b?.c }}' }} in sensitive ctx</code></div>
            <div class="arrow">&rarr;</div>
            <div class="after"><code>{{ '{{ a != null ? (a.b != null ? a.b.c : null) : null }}' }}</code></div>
            <div class="reason">Deep chain: nested ternary guards</div>
          </div>

          <div class="example-row">
            <div class="before"><code>{{ '{{ a.b?.c?.d }}' }} mixed chain</code></div>
            <div class="arrow">&rarr;</div>
            <div class="after"><code>{{ '{{ a.b != null ? (a.b.c != null ? a.b.c.d : null) : null }}' }}</code></div>
            <div class="reason">Guards start at first safe nav, not before</div>
          </div>

          <div class="example-row">
            <div class="before"><code>{{ '"prefix" + a?.b' }}</code></div>
            <div class="arrow">&rarr;</div>
            <div class="after"><code>{{ '"prefix" + (a != null ? a.b : null)' }}</code></div>
            <div class="reason">"prefixnull" vs "prefixundefined" would differ</div>
          </div>

          <div class="example-row">
            <div class="before"><code>{{ '{{ a?.b === null }}' }}</code></div>
            <div class="arrow">&rarr;</div>
            <div class="after"><code>{{ '{{ (a != null ? a.b : null) === null }}' }}</code></div>
            <div class="reason">null === null is true, undefined === null is false</div>
          </div>
        </div>

        <div class="example-group best-effort">
          <h4>Best Effort Mode (?? null fallback)</h4>
          <p class="group-description">
            When a <code>?.</code> expression can't be converted to a ternary
            (method calls, keyed access, pipes), best-effort mode appends <code>?? null</code>.
            This ensures the return value remains null instead of undefined.
          </p>

          <div class="example-row">
            <div class="before"><code>{{ 'a?.method()' }}</code></div>
            <div class="arrow">&rarr;</div>
            <div class="after"><code>{{ 'a?.method() ?? null' }}</code></div>
            <div class="reason">Method calls: can't build ternary (side effects)</div>
          </div>

          <div class="example-row">
            <div class="before"><code>{{ 'a?.[key]' }}</code></div>
            <div class="arrow">&rarr;</div>
            <div class="after"><code>{{ 'a?.[key] ?? null' }}</code></div>
            <div class="reason">Keyed access: not a simple property chain</div>
          </div>

          <div class="example-row">
            <div class="before"><code>{{ 'a?.b | pipe' }}</code></div>
            <div class="arrow">&rarr;</div>
            <div class="after"><code>{{ 'a?.b ?? null | pipe' }}</code></div>
            <div class="reason">Pipe transform: best-effort fallback needed</div>
          </div>

          <div class="example-row">
            <div class="before"><code>{{ 'a?.b?.method()?.c' }}</code></div>
            <div class="arrow">&rarr;</div>
            <div class="after"><code>{{ 'a?.b?.method()?.c ?? null' }}</code></div>
            <div class="reason">Mixed chain with method: can't fully decompose</div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .demo-container { padding: 20px; }
    .description { color: #475569; line-height: 1.6; }
    code { background: #f1f5f9; padding: 2px 6px; border-radius: 3px; font-size: 13px; }
    .config-section {
      background: #f8fafc; border: 1px solid #e2e8f0;
      padding: 16px; border-radius: 8px; margin: 16px 0;
    }
    .config-code {
      background: #1e293b; color: #e2e8f0; padding: 12px;
      border-radius: 4px; font-size: 13px; overflow-x: auto;
    }
    .config-note { font-size: 13px; color: #64748b; margin-bottom: 0; }
    .side-by-side {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 16px; margin: 20px 0;
    }
    .data-controls {
      background: #f8fafc; border: 1px solid #e2e8f0;
      padding: 16px; border-radius: 8px; margin: 16px 0;
    }
    .control-buttons { display: flex; gap: 8px; flex-wrap: wrap; margin: 12px 0; }
    button {
      background: #475569; color: white; border: none;
      padding: 8px 16px; border-radius: 4px; cursor: pointer; font-size: 13px;
    }
    button:hover { background: #334155; }
    .null-btn { background: #dc2626; }
    .null-btn:hover { background: #b91c1c; }
    .data-preview {
      background: #1e293b; color: #94a3b8; padding: 12px;
      border-radius: 4px; font-size: 12px; max-height: 200px; overflow: auto;
    }
    .migration-section {
      background: #f0fdf4; border: 1px solid #86efac;
      padding: 16px; border-radius: 8px; margin: 16px 0;
    }
    .migration-steps { display: flex; flex-direction: column; gap: 12px; }
    .step {
      display: flex; gap: 12px; align-items: flex-start;
      background: white; padding: 12px; border-radius: 4px;
    }
    .step-num {
      display: flex; align-items: center; justify-content: center;
      width: 28px; height: 28px; border-radius: 50%;
      background: #22c55e; color: white; font-weight: 700; font-size: 14px;
      flex-shrink: 0;
    }
    .step p { margin: 4px 0 0; font-size: 13px; color: #64748b; }
    .examples-section {
      background: #f8fafc; border: 1px solid #e2e8f0;
      padding: 16px; border-radius: 8px; margin: 16px 0;
    }
    .examples-section h3 { color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
    .example-group { margin: 16px 0; padding: 16px; border-radius: 8px; }
    .example-group.safe { background: #f0fdf4; border: 1px solid #86efac; }
    .example-group.sensitive { background: #fef2f2; border: 1px solid #fca5a5; }
    .example-group.best-effort { background: #fffbeb; border: 1px solid #fcd34d; }
    .example-group h4 { margin-top: 0; }
    .safe h4 { color: #166534; }
    .sensitive h4 { color: #991b1b; }
    .best-effort h4 { color: #92400e; }
    .group-description { font-size: 13px; color: #475569; margin-bottom: 12px; }
    .example-row {
      display: grid; grid-template-columns: 1fr auto 1fr 1fr;
      gap: 8px; align-items: center;
      background: white; padding: 8px 12px; border-radius: 4px; margin: 6px 0;
      font-size: 13px;
    }
    .example-row .arrow { color: #9ca3af; font-size: 16px; text-align: center; }
    .example-row .before code { color: #dc2626; }
    .example-row .after code { color: #16a34a; }
    .example-row .reason { color: #64748b; font-size: 12px; font-style: italic; }
    @media (max-width: 768px) {
      .side-by-side { grid-template-columns: 1fr; }
      .example-row { grid-template-columns: 1fr; gap: 4px; }
      .example-row .arrow { display: none; }
    }
  `],
})
export class MixedChainingDemoComponent {
  currentConfig = signal<Config | null>(null);

  private fullConfig: Config = {
    theme: 'dark',
    debug: true,
    api: {
      baseUrl: 'https://api.example.com',
      timeout: 5000,
      headers: {
        authorization: 'Bearer token123',
      },
    },
  };

  private partialConfig: Config = {
    theme: 'light',
    api: {
      baseUrl: 'https://api.example.com',
    },
  };

  private minimalConfig: Config = {
    theme: 'auto',
  };

  setFullConfig() {
    this.currentConfig.set(this.fullConfig);
  }

  setPartialConfig() {
    this.currentConfig.set(this.partialConfig);
  }

  setMinimalConfig() {
    this.currentConfig.set(this.minimalConfig);
  }

  setNullConfig() {
    this.currentConfig.set(null);
  }

  ngOnInit() {
    this.setFullConfig();
  }
}
