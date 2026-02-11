import {Component} from '@angular/core';

@Component({
  selector: 'app-inlay-hints-demo',
  template: `
    <div class="demo-page">
      <div class="demo-header">
        <h2>Angular-Specific Inlay Hints</h2>
        <span class="badge">LSP 3.17</span>
      </div>
      <p class="demo-description">
        Rich, configurable inlay hints for Angular templates — showing types for control flow
        variables, event parameters, pipe outputs, input bindings, and more. Fully aligned with
        TypeScript's inlay hints configuration.
      </p>

      <!-- Variable Type Hints -->
      <section class="example-section">
        <h3>Variable Type Hints</h3>
        <p class="desc">
          Inline type annotations for template-declared variables, equivalent to TypeScript's
          <code>includeInlayVariableTypeHints</code>.
        </p>

        <div class="hint-grid">
          <div class="hint-example">
            <div class="hint-label">&#64;for loop variable</div>
            <div class="code-block">
              <pre>&#64;for (<span class="hl-var">user</span><span class="hl-hint">: User</span> of users; track user.id) {{ '{' }}
  {{ '{{ user.name }}' }}
{{ '}' }}</pre>
            </div>
            <div class="config-tag">forLoopVariableTypes: true</div>
          </div>

          <div class="hint-example">
            <div class="hint-label">&#64;if alias</div>
            <div class="code-block">
              <pre>&#64;if (fetchData(); as <span class="hl-var">result</span><span class="hl-hint">: ApiResult</span>) {{ '{' }}
  {{ '{{ result.data }}' }}
{{ '}' }}</pre>
            </div>
            <div class="config-tag">ifAliasTypes: true | 'complex'</div>
          </div>

          <div class="hint-example">
            <div class="hint-label">&#64;let declaration</div>
            <div class="code-block">
              <pre>&#64;let <span class="hl-var">count</span><span class="hl-hint">: number</span> = items.length;</pre>
            </div>
            <div class="config-tag">letDeclarationTypes: true</div>
          </div>

          <div class="hint-example">
            <div class="hint-label">Template reference</div>
            <div class="code-block">
              <pre>&lt;input <span class="hl-var">#nameInput</span><span class="hl-hint">: HTMLInputElement</span> /&gt;</pre>
            </div>
            <div class="config-tag">referenceVariableTypes: true</div>
          </div>
        </div>
      </section>

      <!-- Event Parameter Types -->
      <section class="example-section">
        <h3>Event Parameter Type Hints</h3>
        <p class="desc">
          Shows the inferred type of <code>$event</code> in event bindings. Supports native DOM
          events, component &#64;Output / output(), model() changes, and animation events.
        </p>

        <div class="hint-grid">
          <div class="hint-example">
            <div class="hint-label">Native DOM event</div>
            <div class="code-block">
              <pre>&lt;button (<span class="hl-event">click</span><span class="hl-hint">: MouseEvent</span>)="onClick($event)"&gt;</pre>
            </div>
          </div>

          <div class="hint-example">
            <div class="hint-label">Component output</div>
            <div class="code-block">
              <pre>&lt;app-search (<span class="hl-event">queryChange</span><span class="hl-hint">: string</span>)="onSearch($event)"&gt;</pre>
            </div>
          </div>

          <div class="hint-example">
            <div class="hint-label">model() change</div>
            <div class="code-block">
              <pre>&lt;my-slider ((<span class="hl-event">valueChange</span><span class="hl-hint">: number</span>))="val = $event"&gt;</pre>
            </div>
          </div>

          <div class="hint-example">
            <div class="hint-label">Animation event</div>
            <div class="code-block">
              <pre>&lt;div (&#64;fadeIn.done<span class="hl-hint">: AnimationEvent</span>)="onDone($event)"&gt;</pre>
            </div>
          </div>
        </div>
      </section>

      <!-- Property Binding & Pipe Hints -->
      <section class="example-section">
        <h3>Property Binding & Pipe Hints</h3>

        <div class="hint-grid">
          <div class="hint-example">
            <div class="hint-label">Input binding</div>
            <div class="code-block">
              <pre>&lt;app-user [<span class="hl-var">user</span><span class="hl-hint">: User</span>]="currentUser"&gt;</pre>
            </div>
            <div class="config-tag">propertyBindingTypes: true</div>
          </div>

          <div class="hint-example">
            <div class="hint-label">Required input indicator</div>
            <div class="code-block">
              <pre>&lt;app-form [<span class="hl-var">config</span><span class="hl-hint">: FormConfig!</span>]="formConfig"&gt;</pre>
            </div>
            <div class="config-tag">requiredInputIndicator: 'exclamation'</div>
          </div>

          <div class="hint-example">
            <div class="hint-label">Pipe output</div>
            <div class="code-block">
              <pre>{{ '{{ data$ | async' }}<span class="hl-hint">: Data | null</span> {{ '}}' }}</pre>
            </div>
            <div class="config-tag">pipeOutputTypes: true</div>
          </div>

          <div class="hint-example">
            <div class="hint-label">Two-way binding</div>
            <div class="code-block">
              <pre>&lt;mat-checkbox [(<span class="hl-var">checked</span><span class="hl-hint">: WritableSignal&lt;boolean&gt;</span>)]="done"&gt;</pre>
            </div>
            <div class="config-tag">twoWayBindingSignalTypes: true</div>
          </div>
        </div>
      </section>

      <!-- Parameter Name Hints -->
      <section class="example-section">
        <h3>Parameter Name Hints</h3>
        <p class="desc">
          Shows parameter names for function/method calls in templates, like TypeScript's
          <code>includeInlayParameterNameHints</code>.
        </p>

        <div class="hint-grid">
          <div class="hint-example">
            <div class="hint-label">Method call</div>
            <div class="code-block">
              <pre>(click)="moveTo(<span class="hl-hint">x:</span> 100, <span class="hl-hint">y:</span> 200)"</pre>
            </div>
            <div class="config-tag">parameterNameHints: 'all'</div>
          </div>

          <div class="hint-example">
            <div class="hint-label">Literals only</div>
            <div class="code-block">
              <pre>{{ '{{ formatDate(date, ' }}<span class="hl-hint">locale:</span> 'en-US'{{ ') }}' }}</pre>
            </div>
            <div class="config-tag">parameterNameHints: 'literals'</div>
          </div>
        </div>
      </section>

      <!-- Arrow Function Hints -->
      <section class="example-section">
        <h3>Arrow Function Type Hints</h3>

        <div class="hint-grid">
          <div class="hint-example">
            <div class="hint-label">Parameter types</div>
            <div class="code-block">
              <pre>{{ '{{ items.filter((' }}<span class="hl-var">item</span><span class="hl-hint">: Item</span>) =&gt; item.active{{ ') }}' }}</pre>
            </div>
            <div class="config-tag">arrowFunctionParameterTypes: true</div>
          </div>

          <div class="hint-example">
            <div class="hint-label">Return type</div>
            <div class="code-block">
              <pre>{{ '{{ items.reduce((a, b)' }}<span class="hl-hint">: number</span> =&gt; a + b{{ ') }}' }}</pre>
            </div>
            <div class="config-tag">arrowFunctionReturnTypes: true</div>
          </div>
        </div>
      </section>

      <!-- Control Flow Block Hints -->
      <section class="example-section">
        <h3>Control Flow Block Hints</h3>

        <div class="hint-grid">
          <div class="hint-example">
            <div class="hint-label">&#64;switch expression</div>
            <div class="code-block">
              <pre>&#64;switch (<span class="hl-var">status</span><span class="hl-hint">: Status</span>) {{ '{' }}
  &#64;case (Status.Active) {{ '{' }} ... {{ '}' }}
{{ '}' }}</pre>
            </div>
            <div class="config-tag">switchExpressionTypes: true</div>
          </div>

          <div class="hint-example">
            <div class="hint-label">&#64;defer trigger</div>
            <div class="code-block">
              <pre>&#64;defer (when <span class="hl-var">isVisible</span><span class="hl-hint">: boolean</span>) {{ '{' }}
  &lt;heavy-component /&gt;
{{ '}' }}</pre>
            </div>
            <div class="config-tag">deferTriggerTypes: true</div>
          </div>
        </div>
      </section>

      <!-- Configuration -->
      <section class="example-section config">
        <h3>Configuration</h3>
        <p class="desc">
          All options are configurable via VS Code settings or the Angular language service plugin
          config. Options mirror TypeScript's where applicable.
        </p>

        <div class="code-block wide">
          <pre>// VS Code settings.json
{{ '{' }}
  "angular.inlayHints.forLoopVariableTypes": true,
  "angular.inlayHints.ifAliasTypes": "complex",
  "angular.inlayHints.letDeclarationTypes": true,
  "angular.inlayHints.referenceVariableTypes": true,
  "angular.inlayHints.eventParameterTypes": true,
  "angular.inlayHints.pipeOutputTypes": true,
  "angular.inlayHints.propertyBindingTypes": true,
  "angular.inlayHints.parameterNameHints": "all",
  "angular.inlayHints.arrowFunctionParameterTypes": true,
  "angular.inlayHints.arrowFunctionReturnTypes": true,
  "angular.inlayHints.interactiveInlayHints": false,
  "angular.inlayHints.requiredInputIndicator": "none"
{{ '}' }}</pre>
        </div>
      </section>

      <!-- Interactive Hints -->
      <section class="example-section">
        <h3>Interactive Hints</h3>
        <p class="desc">
          When <code>interactiveInlayHints</code> is enabled, clicking a type hint navigates to
          the type definition — just like TypeScript's interactive inlay hints.
        </p>
        <div class="note-box">
          Requires VS Code 1.78+ with LSP 3.17 inlay hints support.
          The Angular Language Server handles the <code>textDocument/inlayHint</code> request and
          returns hints with clickable display parts.
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .demo-page {
        max-width: 900px;
        margin: 0 auto;
        padding: 32px 32px 64px;
      }

      .demo-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 8px;
        flex-wrap: wrap;
      }

      .demo-header h2 {
        font-size: 28px;
        font-weight: 700;
        color: var(--adev-text);
        margin: 0;
      }

      .badge {
        font-size: 11px;
        font-weight: 600;
        font-family: 'JetBrains Mono', monospace;
        background: rgba(240, 160, 200, 0.12);
        color: var(--adev-primary);
        border: 1px solid rgba(240, 160, 200, 0.25);
        padding: 3px 10px;
        border-radius: 6px;
      }

      .demo-description {
        color: var(--adev-text-secondary);
        font-size: 15px;
        line-height: 1.7;
        margin-bottom: 32px;
      }

      .example-section {
        margin-bottom: 32px;
      }

      .example-section h3 {
        font-size: 18px;
        font-weight: 600;
        color: var(--adev-text);
        margin: 0 0 8px;
        padding-bottom: 8px;
        border-bottom: 1px solid var(--adev-border);
      }

      .desc {
        font-size: 14px;
        color: var(--adev-text-secondary);
        line-height: 1.6;
        margin: 0 0 16px;
      }

      .hint-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
      }

      .hint-example {
        background: var(--adev-surface);
        border: 1px solid var(--adev-border);
        border-radius: 8px;
        padding: 16px;
      }

      .hint-label {
        font-size: 12px;
        font-weight: 600;
        color: var(--adev-text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 10px;
      }

      .code-block {
        background: var(--adev-code-bg);
        border: 1px solid var(--adev-code-border);
        border-radius: 6px;
        overflow-x: auto;
      }

      .code-block pre {
        margin: 0;
        padding: 12px 14px;
        font-size: 13px;
        line-height: 1.6;
        border: none;
        background: none;
        color: var(--adev-code-text);
      }

      .code-block.wide pre {
        padding: 16px;
      }

      .hl-var {
        color: #7dd3fc;
      }
      .hl-hint {
        color: var(--adev-primary);
        opacity: 0.7;
        font-style: italic;
      }
      .hl-event {
        color: #fbbf24;
      }

      .config-tag {
        margin-top: 10px;
        font-size: 11px;
        font-family: 'JetBrains Mono', monospace;
        color: var(--adev-text-tertiary);
      }

      .note-box {
        background: var(--adev-surface);
        border: 1px solid var(--adev-border);
        border-left: 3px solid var(--adev-info);
        border-radius: 8px;
        padding: 14px 16px;
        font-size: 14px;
        color: var(--adev-text-secondary);
        line-height: 1.6;
      }

      @media (max-width: 768px) {
        .hint-grid {
          grid-template-columns: 1fr;
        }
        .demo-page {
          padding: 20px 16px;
        }
      }
    `,
  ],
})
export class InlayHintsDemoComponent {}
