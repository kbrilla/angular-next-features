/**
 * Mixed Usage Demo: Legacy + Native Optional Chaining Side by Side
 *
 * Shows that components with different optionalChainingSemantics can coexist
 * in the same application:
 *
 * - LegacyChainingComponent uses `optionalChainingSemantics: 'legacy'` (default)
 * - NativeChainingComponent uses `optionalChainingSemantics: 'native'`
 * - Both render side-by-side showing the behavioral differences
 */
import {Component, signal, Input, Pipe, Directive, HostBinding} from '@angular/core';
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

@Pipe({ name: 'stringifyNullish', standalone: true })
export class StringifyNullishPipe {
  transform(value: any): string {
    return value === null ? 'null' : value === undefined ? 'undefined' : String(value);
  }
}

/**
 * Legacy semantics component.
 * optionalChainingSemantics: 'legacy' (default behavior, can be omitted)
 */
@Component({
  selector: 'app-legacy-chaining',
  optionalChainingSemantics: 'legacy',
  imports: [StringifyNullishPipe],
  template: `
    <div class="panel legacy">
      <h3>Legacy Component</h3>
      <span class="badge legacy-badge">optionalChainingSemantics: 'legacy'</span>
      <p class="small">a?.b returns <strong>null</strong> when a is nullish</p>

      <div class="result-row">
        <code>config?.theme</code>
        <span class="value"
          [class.value-null]="config()?.theme === null"
          [class.value-undefined]="config()?.theme === undefined">{{ config()?.theme  | stringifyNullish }}</span>
      </div>
      <div class="result-row">
        <code>config?.api?.baseUrl</code>
        <span class="value"
          [class.value-null]="config()?.api?.baseUrl === null"
          [class.value-undefined]="config()?.api?.baseUrl === undefined">{{ config()?.api?.baseUrl | stringifyNullish }}</span>
      </div>
      <div class="result-row">
        <code>config?.api?.timeout</code>
        <span class="value"
          [class.value-null]="config()?.api?.timeout === null"
          [class.value-undefined]="config()?.api?.timeout === undefined">{{ config()?.api?.timeout | stringifyNullish }}</span>
      </div>
      <div class="result-row">
        <code>config?.api?.headers?.authorization</code>
        <span class="value"
          [class.value-null]="config()?.api?.headers?.authorization === null"
          [class.value-undefined]="config()?.api?.headers?.authorization === undefined">{{ config()?.api?.headers?.authorization | stringifyNullish }}</span>
      </div>

      <div class="comparison-box">
        <p><strong>Strict equality (legacy):</strong></p>
        <code>config?.api?.timeout === null</code>
        <span class="result-true">{{ config()?.api?.timeout === null }} (returns {{ config()?.api?.timeout | stringifyNullish }})</span>
      </div>
    </div>
  `,
  styles: [`
    .panel { padding: 20px; border-radius: 8px; height: 100%; }
    .legacy { background: var(--adev-surface); border: 1px solid var(--adev-warning); }
    h3 { margin-top: 0; color: var(--adev-text); font-weight: 600; }
    .badge {
      display: inline-block; padding: 3px 10px; border-radius: 6px;
      font-size: 11px; font-weight: 600; font-family: 'JetBrains Mono', monospace;
    }
    .legacy-badge { background: rgba(251, 191, 36, 0.12); color: #fbbf24; }
    .small { font-size: 13px; color: var(--adev-text-secondary); }
    code {
      background: var(--adev-code-bg); border: 1px solid var(--adev-code-border);
      padding: 2px 6px; border-radius: 4px; font-size: 12px; color: var(--adev-primary);
    }
    .result-row {
      display: flex; justify-content: space-between; align-items: center;
      padding: 8px 12px; margin: 6px 0; background: var(--adev-surface-2); border-radius: 6px;
    }
    .value { font-weight: 700; color: var(--adev-warning); padding: 2px 8px; border-radius: 6px; }
    .value-null {
      background: rgba(239, 68, 68, 0.18);
      border: 1px solid rgba(239, 68, 68, 0.5);
      color: #ef4444;
      box-shadow: 0 0 6px rgba(239, 68, 68, 0.25);
      font-weight: 800;
      font-size: 13px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .value-undefined {
      background: rgba(239, 68, 68, 0.18);
      border: 1px solid rgba(239, 68, 68, 0.5);
      color: #ef4444;
      box-shadow: 0 0 6px rgba(239, 68, 68, 0.25);
      font-weight: 800;
      font-size: 13px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .comparison-box {
      margin-top: 12px; padding: 10px 14px; background: rgba(248, 113, 113, 0.08);
      border-radius: 6px; border-left: 3px solid var(--adev-error);
    }
    .comparison-box p { color: var(--adev-text-secondary); }
    .comparison-box code { color: var(--adev-error); }
    .result-true { display: block; margin-top: 4px; font-weight: 700; color: var(--adev-success); }
  `],
})
export class LegacyChainingComponent {
  config = signal<Config | null>(null);

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
  optionalChainingSemantics: 'native',  // per-component override
  imports: [StringifyNullishPipe],
  template: `
    <div class="panel native">
      <h3>Native Component</h3>
      <span class="badge native-badge">optionalChainingSemantics: 'native'</span>
      <p class="small">a?.b returns <strong>undefined</strong> when a is nullish</p>

      <div class="result-row">
        <code>config?.theme</code>
        <span class="value"
          [class.value-null]="config()?.theme === null"
          [class.value-undefined]="config()?.theme === undefined">{{ config()?.theme | stringifyNullish }}</span>
      </div>
      <div class="result-row">
        <code>config?.api?.baseUrl</code>
        <span class="value"
          [class.value-null]="config()?.api?.baseUrl === null"
          [class.value-undefined]="config()?.api?.baseUrl === undefined">{{ config()?.api?.baseUrl | stringifyNullish }}</span>
      </div>
      <div class="result-row">
        <code>config?.api?.timeout</code>
        <span class="value"
          [class.value-null]="config()?.api?.timeout === null"
          [class.value-undefined]="config()?.api?.timeout === undefined">{{ config()?.api?.timeout | stringifyNullish }}</span>
      </div>
      <div class="result-row">
        <code>config?.api?.headers?.authorization</code>
        <span class="value"
          [class.value-null]="config()?.api?.headers?.authorization === null"
          [class.value-undefined]="config()?.api?.headers?.authorization === undefined">{{ config()?.api?.headers?.authorization | stringifyNullish }}</span>
      </div>

      <div class="comparison-box">
        <p><strong>Strict equality (native):</strong></p>
        <code>config?.api?.timeout === null</code>
        <span class="result-false">{{ config()?.api?.timeout === null }} (returns {{ config()?.api?.timeout | stringifyNullish }})</span>
      </div>
    </div>
  `,
  styles: [`
    .panel { padding: 20px; border-radius: 8px; height: 100%; }
    .native { background: var(--adev-surface); border: 1px solid var(--adev-info); }
    h3 { margin-top: 0; color: var(--adev-text); font-weight: 600; }
    .badge {
      display: inline-block; padding: 3px 10px; border-radius: 6px;
      font-size: 11px; font-weight: 600; font-family: 'JetBrains Mono', monospace;
    }
    .native-badge { background: rgba(96, 165, 250, 0.12); color: #60a5fa; }
    .small { font-size: 13px; color: var(--adev-text-secondary); }
    code {
      background: var(--adev-code-bg); border: 1px solid var(--adev-code-border);
      padding: 2px 6px; border-radius: 4px; font-size: 12px; color: var(--adev-primary);
    }
    .result-row {
      display: flex; justify-content: space-between; align-items: center;
      padding: 8px 12px; margin: 6px 0; background: var(--adev-surface-2); border-radius: 6px;
    }
    .value { font-weight: 700; color: var(--adev-info); padding: 2px 8px; border-radius: 6px; }
    .value-null {
      background: rgba(239, 68, 68, 0.18);
      border: 1px solid rgba(239, 68, 68, 0.5);
      color: #ef4444;
      box-shadow: 0 0 6px rgba(239, 68, 68, 0.25);
      font-weight: 800;
      font-size: 13px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .value-undefined {
      background: rgba(239, 68, 68, 0.18);
      border: 1px solid rgba(239, 68, 68, 0.5);
      color: #ef4444;
      box-shadow: 0 0 6px rgba(239, 68, 68, 0.25);
      font-weight: 800;
      font-size: 13px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .comparison-box {
      margin-top: 12px; padding: 10px 14px; background: rgba(248, 113, 113, 0.08);
      border-radius: 6px; border-left: 3px solid var(--adev-error);
    }
    .comparison-box p { color: var(--adev-text-secondary); }
    .comparison-box code { color: var(--adev-error); }
    .result-false { display: block; margin-top: 4px; font-weight: 700; color: var(--adev-error); }
  `],
})
export class NativeChainingComponent {
  config = signal<Config | null>(null);

  @Input() set configData(value: Config | null) {
    this.config.set(value);
  }
}

/**
 * A directive that uses NATIVE optional chaining semantics in its host bindings.
 * When applied to a component that uses LEGACY semantics, the directive's
 * host bindings still use native behavior independently.
 */
@Directive({
  selector: '[appNativeHostDir]',
  standalone: true,
  exportAs: 'appNativeHostDir',
  optionalChainingSemantics: 'native',
  host: {
    '[attr.data-native-title]': 'labelData?.title',
    '[class.native-active]': '!!labelData?.active',
  },
})
export class NativeHostDirective {
  @Input() labelData: { title?: string; active?: boolean } | null = null;

  /**
   * Expose the computed value so the host component can read it directly,
   * avoiding the DOM getAttribute() limitation (which always returns null
   * for missing attributes, losing the null vs undefined distinction).
   */
  get nativeTitleValue(): string | null | undefined {
    return this.labelData?.title;
  }
}

/**
 * A component that uses LEGACY semantics but includes NativeHostDirective
 * via hostDirectives — demonstrating that each declaration keeps its own semantics.
 */
@Component({
  selector: 'app-mixed-example',
  standalone: true,
  imports: [StringifyNullishPipe, NativeHostDirective],
  optionalChainingSemantics: 'legacy',
  template: `
    <div class="mixed-live-panel">
      <div class="mixed-header">
        <span class="badge legacy-badge">Component: legacy</span>
        <span class="badge native-badge">Directive host bindings: native</span>
      </div>
      <div class="mixed-row">
        <span class="mixed-label">Template <code>item?.value</code> (legacy)</span>
        <span class="mixed-value"
          [class.val-null]="item()?.value === null"
          [class.val-undefined]="item()?.value === undefined">{{ item()?.value | stringifyNullish }}</span>
      </div>
      <div class="mixed-row">
        <span class="mixed-label">Host attr <code>[attr.data-native-title]</code> (native)</span>
        <span class="mixed-value"
          [class.val-null]="nativeTitle === 'null'"
          [class.val-undefined]="nativeTitle === 'undefined'">{{ nativeTitle }}</span>
      </div>
      <div class="mixed-explanation">
        The template expression uses <strong>legacy</strong> (returns <span class="highlight-null">null</span>)
        while the directive host binding uses <strong>native</strong> (returns <span class="highlight-undefined">undefined</span>)
        — each declaration owns its semantics independently.
      </div>
    </div>
  `,
  styles: [`
    .mixed-live-panel { padding: 16px; background: var(--adev-surface-2); border-radius: 8px; }
    .mixed-header { display: flex; gap: 8px; margin-bottom: 12px; flex-wrap: wrap; }
    .badge { display: inline-block; padding: 3px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; font-family: 'JetBrains Mono', monospace; }
    .legacy-badge { background: rgba(251, 191, 36, 0.12); color: #fbbf24; }
    .native-badge { background: rgba(96, 165, 250, 0.12); color: #60a5fa; }
    .mixed-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; margin: 4px 0; background: var(--adev-surface); border-radius: 6px; }
    .mixed-label { font-size: 13px; color: var(--adev-text-secondary); }
    .mixed-label code { background: var(--adev-code-bg); border: 1px solid var(--adev-code-border); padding: 1px 4px; border-radius: 3px; font-size: 12px; }
    .mixed-value { font-weight: 700; padding: 2px 8px; border-radius: 6px; }
    .val-null { background: rgba(239, 68, 68, 0.18); border: 1px solid rgba(239, 68, 68, 0.5); color: #ef4444; font-weight: 800; text-transform: uppercase; }
    .val-undefined { background: rgba(239, 68, 68, 0.18); border: 1px solid rgba(239, 68, 68, 0.5); color: #ef4444; font-weight: 800; text-transform: uppercase; }
    .mixed-explanation { margin-top: 10px; padding: 10px; background: rgba(96, 165, 250, 0.08); border-left: 3px solid var(--adev-info); border-radius: 6px; font-size: 13px; color: var(--adev-text-secondary); }
    .highlight-null { color: #ef4444; font-weight: 700; }
    .highlight-undefined { color: #ef4444; font-weight: 700; }
  `],
})
export class MixedExampleComponent {
  item = signal<{ value?: string } | null>(null);
  /** Injected from parent — the raw value from the native directive's ?.title evaluation */
  @Input() nativeTitleRaw: string | null | undefined = null;

  get nativeTitle(): string {
    const val = this.nativeTitleRaw;
    return val === null ? 'null' : val === undefined ? 'undefined' : val;
  }
}

/**
 * Parent container: shows both legacy and native components side by side
 * with the same data, proving they can be mixed and matched.
 */
@Component({
  selector: 'app-mixed-chaining-demo',
  imports: [LegacyChainingComponent, NativeChainingComponent, MixedExampleComponent, NativeHostDirective, JsonPipe],
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
    "nativeOptionalChainingSemantics": true
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

      <div class="mix-match-section">
        <h3>Mix &amp; Match: Component + Directive + hostDirectives</h3>
        <p class="group-description">
          Semantics can be set independently per declaration. A component can stay legacy while an attached
          directive (or a hostDirective composed into it) uses native semantics.
          <strong>Below is a live example:</strong>
        </p>

        <div class="live-mix-match">
          <h4>Live Demo: Legacy Component + Native Host Directive</h4>
          <div appNativeHostDir #nativeDir="appNativeHostDir" [labelData]="mixedLabelData()">
            <app-mixed-example [nativeTitleRaw]="nativeDir.nativeTitleValue"></app-mixed-example>
          </div>
          <div class="mix-match-controls">
            <button (click)="setMixedWithData()">Set Data</button>
            <button class="null-btn" (click)="setMixedNull()">Set Null</button>
          </div>
        </div>

        <h4>How It Works</h4>
        <div class="example-row">
          <div class="before"><code>&#64;Component({{ '{' }} optionalChainingSemantics: 'legacy' {{ '}' }})</code></div>
          <div class="arrow">+</div>
          <div class="after"><code>&#64;Directive({{ '{' }} optionalChainingSemantics: 'native' {{ '}' }})</code></div>
          <div class="reason">Template stays legacy, directive host bindings use native</div>
        </div>
        <div class="example-row">
          <div class="before"><code>hostDirectives: [NativeHostDir]</code></div>
          <div class="arrow">+</div>
          <div class="after"><code>optionalChainingSemantics: 'legacy'</code></div>
          <div class="reason">Parent/child host behavior can differ intentionally</div>
        </div>
        <div class="note-box">
          <strong>Key insight:</strong> Each &#64;Component and &#64;Directive maintains its own semantics.
          A legacy component's template returns <span style="color:#ef4444;font-weight:700">null</span>, 
          while a native directive's host bindings return <span style="color:#ef4444;font-weight:700">undefined</span> —
          both on the same DOM element! Keep mixed mode temporary during rollout, then converge to native semantics project-wide.
        </div>
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
              <strong>Run migration (safe mode)</strong>
              <p><code>ng generate &#64;angular/core:optional-chaining-semantics-migration</code></p>
            </div>
          </div>
          <div class="step">
            <span class="step-num">3</span>
            <div>
              <strong>Optional: interactive approval</strong>
              <p><code>--interactive</code> to review/approve each migrated template/host expression</p>
            </div>
          </div>
          <div class="step">
            <span class="step-num">4</span>
            <div>
              <strong>Enable native semantics</strong>
              <p><code>"nativeOptionalChainingSemantics": true</code> in tsconfig</p>
            </div>
          </div>
          <div class="step">
            <span class="step-num">5</span>
            <div>
              <strong>Per-component override</strong>
              <p>Override individual components that need legacy behavior</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Migration Examples -->
      <div class="examples-section">
        <h3>Migration Examples (34 schematic tests + quick fixes)</h3>

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

          <div class="example-row">
            <div class="before"><code>&#64;if (user?.address)</code></div>
            <div class="arrow">&rarr;</div>
            <div class="after"><code>&#64;if (user?.address)</code></div>
            <div class="reason">&#64;if condition: both null and undefined are falsy</div>
          </div>

          <div class="example-row">
            <div class="before"><code>&#64;if (a?.b?.c) {{ '{' }}...{{ '}' }} &#64;else if (a?.d)</code></div>
            <div class="arrow">&rarr;</div>
            <div class="after"><code>&#64;if (a?.b?.c) {{ '{' }}...{{ '}' }} &#64;else if (a?.d)</code></div>
            <div class="reason">&#64;else if: also a truthiness check, safe</div>
          </div>

          <div class="example-row">
            <div class="before"><code>&#64;if (user?.address; as addr)</code></div>
            <div class="arrow">&rarr;</div>
            <div class="after"><code>&#64;if (user?.address; as addr)</code></div>
            <div class="reason">&#64;if with alias: condition is still a truthiness check</div>
          </div>

          <div class="example-row">
            <div class="before"><code>&#64;defer (when config?.ready)</code></div>
            <div class="arrow">&rarr;</div>
            <div class="after"><code>&#64;defer (when config?.ready)</code></div>
            <div class="reason">&#64;defer when: boolean-like condition, safe</div>
          </div>

          <div class="example-row">
            <div class="before"><code>[class.active]="item?.selected"</code></div>
            <div class="arrow">&rarr;</div>
            <div class="after"><code>[class.active]="item?.selected"</code></div>
            <div class="reason">Class binding: truthy/falsy check, safe</div>
          </div>

          <div class="example-row">
            <div class="before"><code>[hidden]="!user?.isVisible"</code></div>
            <div class="arrow">&rarr;</div>
            <div class="after"><code>[hidden]="!user?.isVisible"</code></div>
            <div class="reason">Property binding with negation: safe</div>
          </div>

          <div class="example-row">
            <div class="before"><code>{{ '{{ !!a?.b }}' }}</code></div>
            <div class="arrow">&rarr;</div>
            <div class="after"><code>{{ '{{ !!a?.b }}' }}</code></div>
            <div class="reason">Double negation: coerces to boolean, safe</div>
          </div>

          <div class="example-row">
            <div class="before"><code>{{ '{{ !a?.b?.c ? x : y }}' }}</code></div>
            <div class="arrow">&rarr;</div>
            <div class="after"><code>{{ '{{ !a?.b?.c ? x : y }}' }}</code></div>
            <div class="reason">Negated ternary condition: truthiness check, safe</div>
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
            <strong>Safety exception:</strong> call-receiver patterns like <code>a?.method()</code>
            are intentionally skipped to avoid generating invalid code.
          </p>

          <div class="example-row">
            <div class="before"><code>{{ 'a?.method()' }}</code></div>
            <div class="arrow">&rarr;</div>
            <div class="after"><code>{{ 'a?.method()' }}</code></div>
            <div class="reason">Skipped for manual review (receiver-call rewrite is unsafe)</div>
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

        <div class="example-group host-expr">
          <h4>Host Expression Migration (decorator metadata)</h4>
          <p class="group-description">
            The migration schematic now also converts host binding expressions in
            <code>&#64;Component.host</code> and <code>&#64;Directive.host</code> decorator metadata,
            respecting TS string quoting (single, double, backtick).
          </p>

          <div class="example-row">
            <div class="before"><code>host: {{ '{' }}'[title]': 'user?.name'{{ '}' }}</code></div>
            <div class="arrow">&rarr;</div>
            <div class="after"><code>host: {{ '{' }}'[title]': 'user != null ? user.name : null'{{ '}' }}</code></div>
            <div class="reason">Simple host expression — safe ternary conversion</div>
          </div>

          <div class="example-row">
            <div class="before"><code>host: {{ '{' }}'[title]': 'a?.method()'{{ '}' }}</code></div>
            <div class="arrow">&rarr;</div>
            <div class="after"><code>host: {{ '{' }}'[title]': 'a?.method() ?? null'{{ '}' }}</code></div>
            <div class="reason">Call pattern — best-effort ?? null fallback</div>
          </div>

          <div class="example-row">
            <div class="before"><code>host: {{ '{' }}"[title]": "it\\'s a?.b"{{ '}' }}</code></div>
            <div class="arrow">&rarr;</div>
            <div class="after"><code>Preserved quote escaping in output</code></div>
            <div class="reason">TS string quoting is respected for safe insertion</div>
          </div>
        </div>

        <div class="example-group quickfix">
          <h4>NG8119 Quick Fixes (Language Service Code Actions)</h4>
          <p class="group-description">
            The language service offers inline code actions when <code>legacySafeNavigationUsage</code>
            is enabled. Two fix modes are available per-expression and as fix-all:
          </p>

          <div class="example-row">
            <div class="before"><code>{{ '{{ user?.name }}' }} <span class="diag-inline">⚠ NG8119</span></code></div>
            <div class="arrow">&rarr;</div>
            <div class="after"><code>{{ '{{ user != null ? user.name : null }}' }}</code></div>
            <div class="reason"><strong>Safe fix:</strong> ternary guard preserves null return</div>
          </div>

          <div class="example-row">
            <div class="before"><code>{{ '{{ user?.name }}' }} <span class="diag-inline">⚠ NG8119</span></code></div>
            <div class="arrow">&rarr;</div>
            <div class="after"><code>{{ '{{ user?.name ?? null }}' }}</code></div>
            <div class="reason"><strong>Best-effort fix:</strong> appends ?? null fallback</div>
          </div>

          <div class="example-row">
            <div class="before"><code>Fix all in file</code></div>
            <div class="arrow">&rarr;</div>
            <div class="after"><code>Applies safe or best-effort to all NG8119 diagnostics</code></div>
            <div class="reason"><strong>Fix-all:</strong> batch conversion across entire file</div>
          </div>
        </div>
      </div>

      <div class="host-bindings-section">
        <h3>&#x2705; Host Bindings Follow Optional Chaining Semantics</h3>
        <p class="group-description">
          Optional chaining semantics now apply consistently across template expressions and host
          binding expressions (<code>&#64;Component.host</code>, <code>&#64;Directive.host</code>,
          host directives, and <code>&#64;HostBinding</code> generated host instructions).
        </p>

        <div class="example-row">
          <div class="before"><code>template: '{{ '{{ user?.name }}' }}'</code></div>
          <div class="arrow">&rarr;</div>
          <div class="after"><code>Respects selected semantics</code></div>
          <div class="reason">Template expressions</div>
        </div>
        <div class="example-row">
          <div class="before"><code>host: {{ '{' }}'[style.color]': 'theme?.primaryColor'{{ '}' }}</code></div>
          <div class="arrow">&rarr;</div>
          <div class="after"><code>Also respects selected semantics</code></div>
          <div class="reason">Host property bindings</div>
        </div>
        <div class="example-row">
          <div class="before"><code>&#64;Directive({{ '{' }} optionalChainingSemantics: 'native' {{ '}' }})</code></div>
          <div class="arrow">&rarr;</div>
          <div class="after"><code>Directive host bindings use native behavior</code></div>
          <div class="reason">Per-directive override support</div>
        </div>

        <div class="note-box gap-note">
          <p><strong>Migration coverage:</strong> The migration schematic now handles both component
            templates and host binding expressions in decorator metadata.</p>
          <p><strong>Recommendation:</strong> Enable <code>legacySafeNavigationUsage</code>, run the migration,
            then enable <code>nativeOptionalChainingSemantics</code> project-wide.</p>
        </div>
      </div>

      <!-- INLAY HINTS TIE-IN -->
      <div class="inlay-hints-section">
        <h3>&#x1F4A1; Inlay Hints Make the Difference Visible</h3>
        <p class="group-description">
          With <strong>inlay hints</strong> enabled, the <code>null</code> vs <code>undefined</code>
          difference is immediately visible next to every <code>?.</code> usage in the editor —
          without running the app.
        </p>

        <div class="example-row">
          <div class="before"><code>{{ '{{ user?.name }}' }}<span class="native-hint">: string | undefined</span></code></div>
          <div class="arrow">vs</div>
          <div class="after"><code>{{ '{{ user?.name }}' }}<span class="legacy-hint">: string | null</span></code></div>
          <div class="reason">Inlay hint reveals semantics at a glance</div>
        </div>

        <div class="note-box">
          See the <strong>Inlay Hints</strong> demo for the complete reference of all 118 test scenarios
          and 25 configuration options.
        </div>
      </div>

      <!-- Community Issues Section -->
      <div class="issues-section">
        <h3>Community Issues Addressed</h3>
        <p class="issues-intro">
          These changes address longstanding community requests dating back to 2019:
        </p>

        <div class="issue-card">
          <div class="issue-header">
            <a class="issue-link" href="https://github.com/angular/angular/issues/34385" target="_blank">#34385</a>
            <span class="issue-title">Align with the optional chaining spec</span>
          </div>
          <p class="issue-desc">
            Requests that template <code>?.</code> match TC39 semantics (return <code>undefined</code> on short-circuit).
            Documents that generated TCB and runtime diverge from modern JS, and links to historical safe-navigation behavior.
          </p>
          <div class="issue-tags">
            <span class="tag">runtime</span>
            <span class="tag">type</span>
            <span class="tag">migration</span>
            <span class="tag">safe-navigation</span>
          </div>
          <p class="addressed">
            <strong>Addressed by:</strong> <code>optionalChainingSemantics: 'native'</code> per-component
            and <code>nativeOptionalChainingSemantics: true</code> project-wide setting.
          </p>
        </div>

        <div class="issue-card">
          <div class="issue-header">
            <a class="issue-link" href="https://github.com/angular/angular/issues/37622" target="_blank">#37622</a>
            <span class="issue-title">optional chaining uses 'null', but strictTemplates treats it as 'undefined'</span>
          </div>
          <p class="issue-desc">
            <code>foo?.bar</code> yields <code>null</code> at runtime, but strict template checking infers
            <code>undefined</code>. This means declared inputs may accept the wrong union type,
            causing confusing type errors.
          </p>
          <div class="issue-tags">
            <span class="tag">runtime</span>
            <span class="tag">type</span>
            <span class="tag">compiler</span>
          </div>
          <p class="addressed">
            <strong>Addressed by:</strong> Native semantics aligns runtime (<code>undefined</code>) with what TypeScript's
            type checker expects, eliminating the null/undefined mismatch.
          </p>
        </div>

        <div class="issue-card">
          <div class="issue-header">
            <a class="issue-link" href="https://github.com/angular/angular/issues/37619" target="_blank">#37619</a>
            <span class="issue-title">strictTemplates + strictNullChecks doesn't work well with optional chaining</span>
          </div>
          <p class="issue-desc">
            Strictness flags plus <code>?.</code> trigger "Object is possibly 'undefined'" diagnostics
            even though runtime guards exist. Points to TCB generation and upstream compiler/type-checking limitations.
          </p>
          <div class="issue-tags">
            <span class="tag">type</span>
            <span class="tag">migration</span>
            <span class="tag">partial-compilation</span>
          </div>
          <p class="addressed">
            <strong>Addressed by:</strong> With native semantics, the TCB correctly models the runtime return type
            as <code>T | undefined</code>, matching TypeScript's own <code>?.</code> type narrowing.
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .demo-container { max-width: 900px; margin: 0 auto; padding: 32px 32px 64px; }
    .description { color: var(--adev-text-secondary); line-height: 1.6; }
    code {
      background: var(--adev-code-bg); border: 1px solid var(--adev-code-border);
      padding: 2px 6px; border-radius: 4px; font-size: 13px; color: var(--adev-primary);
    }
    .config-section {
      background: var(--adev-surface); border: 1px solid var(--adev-border);
      padding: 20px; border-radius: 8px; margin: 20px 0;
    }
    .config-code {
      background: var(--adev-code-bg); color: var(--adev-code-text);
      border: 1px solid var(--adev-code-border);
      padding: 12px; border-radius: 6px; font-size: 13px; overflow-x: auto;
    }
    .config-note { font-size: 13px; color: var(--adev-text-secondary); margin-bottom: 0; }
    .side-by-side {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 16px; margin: 20px 0;
    }
    .data-controls {
      background: var(--adev-surface); border: 1px solid var(--adev-border);
      padding: 20px; border-radius: 8px; margin: 20px 0;
    }
    .control-buttons { display: flex; gap: 8px; flex-wrap: wrap; margin: 12px 0; }
    button {
      background: var(--adev-accent); color: white; border: none;
      padding: 8px 16px; border-radius: 6px; cursor: pointer; font-size: 13px;
    }
    button:hover { opacity: 0.85; }
    .null-btn { background: var(--adev-error); }
    .data-preview {
      background: var(--adev-code-bg); color: var(--adev-text-tertiary);
      border: 1px solid var(--adev-code-border);
      padding: 12px; border-radius: 6px; font-size: 12px; max-height: 200px; overflow: auto;
    }
    .migration-section {
      background: rgba(74, 222, 128, 0.06); border: 1px solid rgba(74, 222, 128, 0.2);
      padding: 20px; border-radius: 8px; margin: 20px 0;
    }
    .migration-steps { display: flex; flex-direction: column; gap: 12px; }
    .step {
      display: flex; gap: 12px; align-items: flex-start;
      background: var(--adev-surface); padding: 12px; border-radius: 6px;
    }
    .step-num {
      display: flex; align-items: center; justify-content: center;
      width: 28px; height: 28px; border-radius: 50%;
      background: var(--adev-success); color: #0f0f11; font-weight: 700; font-size: 14px;
      flex-shrink: 0;
    }
    .step p { margin: 4px 0 0; font-size: 13px; color: var(--adev-text-secondary); }
    .examples-section {
      background: var(--adev-surface); border: 1px solid var(--adev-border);
      padding: 20px; border-radius: 8px; margin: 20px 0;
    }
    .examples-section h3 { color: var(--adev-text); border-bottom: 1px solid var(--adev-border); padding-bottom: 8px; }
    .example-group { margin: 16px 0; padding: 16px; border-radius: 8px; }
    .example-group.safe { background: rgba(74, 222, 128, 0.06); border: 1px solid rgba(74, 222, 128, 0.2); }
    .example-group.sensitive { background: rgba(248, 113, 113, 0.06); border: 1px solid rgba(248, 113, 113, 0.2); }
    .example-group.best-effort { background: rgba(251, 191, 36, 0.06); border: 1px solid rgba(251, 191, 36, 0.2); }
    .example-group.host-expr { background: rgba(167, 139, 250, 0.06); border: 1px solid rgba(167, 139, 250, 0.2); }
    .example-group.quickfix { background: rgba(56, 189, 248, 0.06); border: 1px solid rgba(56, 189, 248, 0.2); }
    .example-group h4 { margin-top: 0; }
    .safe h4 { color: var(--adev-success); }
    .sensitive h4 { color: var(--adev-error); }
    .best-effort h4 { color: var(--adev-warning); }
    .host-expr h4 { color: var(--adev-accent); }
    .quickfix h4 { color: #38bdf8; }
    .diag-inline { color: var(--adev-warning); font-size: 11px; font-weight: 700; }
    .group-description { font-size: 13px; color: var(--adev-text-secondary); margin-bottom: 12px; }
    .example-row {
      display: grid; grid-template-columns: 1fr auto 1fr 1fr;
      gap: 8px; align-items: center;
      background: var(--adev-surface-2); padding: 8px 12px; border-radius: 6px; margin: 6px 0;
      font-size: 13px;
    }
    .example-row .arrow { color: var(--adev-text-tertiary); font-size: 16px; text-align: center; }
    .example-row .before code { color: var(--adev-error); }
    .example-row .after code { color: var(--adev-success); }
    .example-row .reason { color: var(--adev-text-tertiary); font-size: 12px; font-style: italic; }
    .issues-section {
      background: rgba(167, 139, 250, 0.06); border: 1px solid rgba(167, 139, 250, 0.2);
      padding: 20px; border-radius: 8px; margin: 20px 0;
    }
    .issues-section h3 { color: var(--adev-accent); border-bottom: 1px solid var(--adev-border); padding-bottom: 8px; }
    .issues-intro { font-size: 13px; color: var(--adev-text-secondary); }
    .issue-card {
      background: var(--adev-surface); border: 1px solid var(--adev-border);
      padding: 16px; border-radius: 8px; margin: 12px 0;
    }
    .issue-header { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
    .issue-link {
      background: var(--adev-accent); color: #0f0f11; padding: 2px 8px;
      border-radius: 4px; font-size: 12px; font-weight: 700;
      text-decoration: none;
    }
    .issue-link:hover { opacity: 0.85; }
    .issue-title { font-weight: 600; color: var(--adev-text); font-size: 14px; }
    .issue-desc { font-size: 13px; color: var(--adev-text-secondary); line-height: 1.6; }
    .issue-tags { display: flex; gap: 6px; flex-wrap: wrap; margin: 8px 0; }
    .tag {
      background: rgba(167, 139, 250, 0.12); color: var(--adev-accent); padding: 2px 8px;
      border-radius: 6px; font-size: 11px; font-weight: 600;
    }
    .addressed {
      background: rgba(74, 222, 128, 0.08); border-left: 3px solid var(--adev-success);
      padding: 8px 12px; border-radius: 6px; font-size: 13px;
      color: var(--adev-success); margin-bottom: 0;
    }
    .host-bindings-section {
      background: rgba(251, 191, 36, 0.06); border: 1px solid rgba(251, 191, 36, 0.2);
      padding: 20px; border-radius: 8px; margin: 20px 0;
    }
    .host-bindings-section h3 { color: var(--adev-warning); }
    .gap-note { margin-top: 12px; }
    .gap-note p { margin: 4px 0; font-size: 13px; }
    .status-highlight {
      background: linear-gradient(135deg, rgba(74, 222, 128, 0.1), rgba(34, 197, 94, 0.05));
      border: 2px solid var(--adev-success);
      border-radius: 8px;
      padding: 12px 16px;
      margin-bottom: 16px;
      font-size: 15px;
      font-weight: 600;
      color: var(--adev-success);
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 2px 8px rgba(74, 222, 128, 0.15);
    }
    .status-icon {
      font-size: 18px;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
    .note-box { background: var(--adev-surface); border: 1px solid var(--adev-border); border-left: 3px solid var(--adev-info);
      border-radius: 8px; padding: 14px 16px; font-size: 14px; color: var(--adev-text-secondary); line-height: 1.6; }
    .live-mix-match {
      background: linear-gradient(135deg, rgba(251, 191, 36, 0.06), rgba(96, 165, 250, 0.06));
      border: 2px dashed rgba(167, 139, 250, 0.35);
      border-radius: 8px; padding: 16px; margin: 12px 0;
    }
    .live-mix-match h4 { margin-top: 0; color: var(--adev-accent); font-size: 14px; }
    .mix-match-controls { display: flex; gap: 8px; margin-top: 12px; }
    .inlay-hints-section {
      background: rgba(240, 160, 200, 0.06); border: 1px solid rgba(240, 160, 200, 0.2);
      padding: 20px; border-radius: 8px; margin: 20px 0;
    }
    .inlay-hints-section h3 { color: var(--adev-primary); }
    .native-hint { color: #22c55e; font-style: italic; opacity: 0.7; }
    .legacy-hint { color: #fb923c; font-style: italic; opacity: 0.7; }
    @media (max-width: 768px) {
      .side-by-side { grid-template-columns: 1fr; }
      .example-row { grid-template-columns: 1fr; gap: 4px; }
      .example-row .arrow { display: none; }
    }
  `],
})
export class MixedChainingDemoComponent {
  currentConfig = signal<Config | null>(null);
  mixedLabelData = signal<{ title?: string; active?: boolean } | null>(null);

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

  setMixedWithData() {
    this.mixedLabelData.set({ title: 'Dashboard', active: true });
  }

  setMixedNull() {
    this.mixedLabelData.set(null);
  }

  ngOnInit() {
    this.setMinimalConfig();
    this.setMixedNull();
  }
}
