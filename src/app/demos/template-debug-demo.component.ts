import {Component} from '@angular/core';

@Component({
  selector: 'app-template-debug-demo',
  template: `
    <div class="demo-container">
      <div class="demo-header">
        <h2>Template Debug Overlay</h2>
      </div>
      <p class="demo-description">
        A live debugging overlay for Angular templates — see expression values, set breakpoints, and
        inspect template state directly in your editor. Powered by the Angular Language Service.
      </p>

      <!-- 1. Live Debug Values -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> Live Expression Values</h3>
        <p class="desc">
          See the runtime value of every template expression rendered as an overlay in the editor.
          Hovers, interpolations, bindings — all annotated with their current values.
        </p>
        <div class="overlay-demo">
          <div class="overlay-code">
            <span class="code-line">
              <span class="tmpl-tag">&lt;h1&gt;</span>{{ '{{' }} title {{ '}}' }}<span class="tmpl-tag">&lt;/h1&gt;</span>
              <span class="overlay-value">"Welcome to Angular"</span>
            </span>
            <span class="code-line">
              <span class="tmpl-tag">&lt;p&gt;</span>Items: {{ '{{' }} items.length {{ '}}' }}<span class="tmpl-tag">&lt;/p&gt;</span>
              <span class="overlay-value">3</span>
            </span>
            <span class="code-line">
              <span class="tmpl-attr">[class.active]</span>="isActive"
              <span class="overlay-value">true</span>
            </span>
            <span class="code-line">
              <span class="tmpl-directive">&#64;if</span> (user?.isAdmin) {{ '{' }}
              <span class="overlay-value">false</span>
            </span>
          </div>
        </div>
        <p class="note">
          Values update in real-time as the app runs. Uses <code>with(ctx)</code> evaluation for
          complex expressions and handles both creation and update phases.
        </p>
      </div>

      <!-- 2. Template Breakpoints -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> Template Breakpoints</h3>
        <p class="desc">
          Set breakpoints directly in HTML templates — no need to find the generated JS.
          The language service maps template lines to the correct compiled output.
        </p>
        <div class="breakpoint-demo">
          <div class="bp-line">
            <span class="bp-gutter"><span class="bp-dot"></span></span>
            <code>&lt;button (click)="handleSubmit()"&gt;Submit&lt;/button&gt;</code>
          </div>
          <div class="bp-line">
            <span class="bp-gutter"></span>
            <code>&lt;div *ngIf="showForm"&gt;</code>
          </div>
          <div class="bp-line hit">
            <span class="bp-gutter"><span class="bp-dot active"></span></span>
            <code>  {{ '{{' }} formData | json {{ '}}' }}</code>
            <span class="bp-hit-badge">● Hit</span>
          </div>
          <div class="bp-line">
            <span class="bp-gutter"></span>
            <code>&lt;/div&gt;</code>
          </div>
        </div>
        <p class="note">
          Breakpoints pause execution at the corresponding template expression evaluation,
          giving you full access to the component context in the debugger.
        </p>
      </div>

      <!-- 3. AST-Based Expression Extraction -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> AST-Based Expression Extraction</h3>
        <p class="desc">
          The debug overlay uses the compiler's AST to extract <strong>every</strong> expression in a
          template — interpolations, bindings, event handlers, control flow conditions, and pipes.
        </p>
        <div class="extraction-demo">
          <div class="ext-category">
            <span class="ext-label">Interpolations</span>
            <code>{{ '{{' }} user.name {{ '}}' }}</code>
            <code>{{ '{{' }} count + 1 {{ '}}' }}</code>
          </div>
          <div class="ext-category">
            <span class="ext-label">Property bindings</span>
            <code>[style.width.px]="containerWidth"</code>
            <code>[disabled]="!isValid"</code>
          </div>
          <div class="ext-category">
            <span class="ext-label">Event handlers</span>
            <code>(click)="save(form.value)"</code>
          </div>
          <div class="ext-category">
            <span class="ext-label">Control flow</span>
            <code>&#64;if (items.length > 0)</code>
            <code>&#64;for (item of items; track item.id)</code>
          </div>
          <div class="ext-category">
            <span class="ext-label">Pipes</span>
            <code>{{ '{{' }} value | currency:'USD' {{ '}}' }}</code>
          </div>
        </div>
        <p class="note">
          Uses <code>RecursiveVisitor</code> with <code>valueSpan</code> for precise source mapping.
          Removed legacy <code>TemplateMapper</code> in favor of compiler-native resolution.
        </p>
      </div>

      <!-- 4. Inline Template Support -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> Inline Template Support</h3>
        <p class="desc">
          Works with both external (<code>.html</code>) and inline (<code>template: &#96;...&#96;</code>) templates.
          The overlay correctly adjusts offsets for inline templates within TypeScript files.
        </p>
        <div class="inline-demo">
          <div class="file-tab">.component.ts</div>
          <div class="file-content">
            <span class="ts-kw">&#64;Component</span>({{ '{' }}<br>
            &nbsp;&nbsp;template: <span class="ts-str">&#96;</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span class="tmpl-tag">&lt;div&gt;</span>{{ '{{' }} message() {{ '}}' }}<span class="tmpl-tag">&lt;/div&gt;</span>
            <span class="overlay-value inline">"Hello!"</span><br>
            &nbsp;&nbsp;<span class="ts-str">&#96;</span><br>
            {{ '}' }})
          </div>
        </div>
      </div>

      <!-- 5. Pipe Stripping -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> Smart Pipe Stripping</h3>
        <p class="desc">
          For evaluation, Angular pipes are stripped from expressions (since they can't be called
          directly as JS functions). The overlay handles nested parentheses correctly.
        </p>
        <div class="example-table">
          <div class="ex-row">
            <code>{{ '{{' }} value | currency {{ '}}' }}</code>
            <span class="arrow">→ evaluates as:</span>
            <code>value</code>
          </div>
          <div class="ex-row">
            <code>{{ '{{' }} (a + b) | number:'1.2-2' {{ '}}' }}</code>
            <span class="arrow">→ evaluates as:</span>
            <code>(a + b)</code>
          </div>
          <div class="ex-row">
            <code>{{ '{{' }} fn(x | inner) | outer {{ '}}' }}</code>
            <span class="arrow">→ evaluates as:</span>
            <code>fn(x | inner)</code>
          </div>
        </div>
        <p class="note">Respects parentheses depth — pipes inside function calls (inner) are preserved.</p>
      </div>

      <!-- How to Enable -->
      <div class="example-section enable">
        <h3>How to Enable</h3>
        <p class="desc">
          The Template Debug Overlay is activated through the Angular Language Service extension.
          It exposes additional LSP endpoints for expression extraction and evaluation.
        </p>
        <div class="enable-steps">
          <div class="step">
            <span class="step-num">1</span>
            <span class="step-text">Install the custom Angular Language Service VSIX</span>
          </div>
          <div class="step">
            <span class="step-num">2</span>
            <span class="step-text">Open a component with a template</span>
          </div>
          <div class="step">
            <span class="step-num">3</span>
            <span class="step-text">Run the "Angular: Show Template Debug Overlay" command</span>
          </div>
          <div class="step">
            <span class="step-num">4</span>
            <span class="step-text">Values appear as inline decorations in your editor</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .demo-container { max-width: 900px; margin: 0 auto; padding: 32px 32px 64px; }
    .demo-header { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; flex-wrap: wrap; }
    .demo-header h2 { font-size: 28px; font-weight: 700; color: var(--adev-text); margin: 0; }
    .demo-description { color: var(--adev-text-secondary); font-size: 15px; line-height: 1.7; margin-bottom: 24px; }
    .badge { display: inline-block; padding: 3px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; font-family: 'JetBrains Mono', monospace; }
    .debug-badge { background: rgba(251, 146, 60, 0.12); color: #fb923c; border: 1px solid rgba(251, 146, 60, 0.25); }
    .feat-badge {
      display: inline-block; font-size: 9px; font-weight: 700; letter-spacing: 0.5px;
      background: linear-gradient(135deg, var(--adev-gradient-start), var(--adev-gradient-end));
      color: #0f0f11; padding: 2px 6px; border-radius: 4px; vertical-align: middle; margin-right: 4px;
    }
    code {
      background: var(--adev-code-bg); border: 1px solid var(--adev-code-border);
      padding: 2px 6px; border-radius: 4px; font-size: 12px; color: var(--adev-primary);
      font-family: 'JetBrains Mono', monospace;
    }
    .example-section {
      background: var(--adev-surface); border: 1px solid var(--adev-border);
      border-left: 3px solid var(--adev-info); padding: 20px; margin: 20px 0; border-radius: 8px;
    }
    .example-section.enable { border-left-color: var(--adev-success); }
    h3 { color: var(--adev-text); margin-top: 0; font-size: 16px; font-weight: 600; }
    .desc { color: var(--adev-text-secondary); font-size: 14px; margin: 8px 0 12px; }
    .note {
      background: rgba(74, 222, 128, 0.08); border-left: 3px solid var(--adev-success);
      padding: 10px 14px; border-radius: 6px; font-size: 13px; color: var(--adev-text-secondary); margin-top: 12px;
    }

    /* Overlay demo */
    .overlay-demo { margin: 16px 0; }
    .overlay-code {
      background: var(--adev-code-bg); border: 1px solid var(--adev-code-border);
      border-radius: 8px; padding: 16px; font-family: 'JetBrains Mono', monospace; font-size: 13px;
    }
    .code-line { display: flex; align-items: center; gap: 16px; padding: 4px 0; color: var(--adev-code-text); }
    .tmpl-tag { color: #f472b6; }
    .tmpl-attr { color: #60a5fa; }
    .tmpl-directive { color: #c084fc; font-weight: 600; }
    .overlay-value {
      background: rgba(251, 146, 60, 0.15); border: 1px solid rgba(251, 146, 60, 0.3);
      color: #fb923c; padding: 2px 8px; border-radius: 4px; font-size: 11px; margin-left: auto;
    }
    .overlay-value.inline { display: inline-block; margin-left: 8px; }

    /* Breakpoint demo */
    .breakpoint-demo {
      background: var(--adev-code-bg); border: 1px solid var(--adev-code-border);
      border-radius: 8px; overflow: hidden; font-family: 'JetBrains Mono', monospace; font-size: 13px;
    }
    .bp-line { display: flex; align-items: center; gap: 8px; padding: 6px 12px; color: var(--adev-code-text); }
    .bp-line.hit { background: rgba(248, 113, 113, 0.1); }
    .bp-gutter { width: 16px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
    .bp-dot { width: 10px; height: 10px; border-radius: 50%; background: #ef4444; }
    .bp-dot.active { background: #ef4444; box-shadow: 0 0 6px rgba(239, 68, 68, 0.5); }
    .bp-hit-badge { font-size: 10px; color: #ef4444; font-weight: 700; margin-left: auto; }

    /* Extraction demo */
    .extraction-demo { display: flex; flex-direction: column; gap: 8px; }
    .ext-category {
      display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
      background: var(--adev-surface-2); padding: 8px 12px; border-radius: 6px;
    }
    .ext-label { font-size: 11px; font-weight: 700; color: var(--adev-text-tertiary); text-transform: uppercase; letter-spacing: 0.5px; min-width: 140px; }

    /* Inline demo */
    .inline-demo { margin: 12px 0; }
    .file-tab {
      display: inline-block; background: var(--adev-surface-2); border: 1px solid var(--adev-code-border);
      border-bottom: none; padding: 4px 12px; border-radius: 6px 6px 0 0; font-size: 12px;
      color: var(--adev-text-secondary); font-family: 'JetBrains Mono', monospace;
    }
    .file-content {
      background: var(--adev-code-bg); border: 1px solid var(--adev-code-border);
      border-radius: 0 8px 8px 8px; padding: 16px; font-family: 'JetBrains Mono', monospace;
      font-size: 13px; color: var(--adev-code-text); line-height: 1.8;
    }
    .ts-kw { color: #c084fc; }
    .ts-str { color: #4ade80; }

    /* Example table */
    .example-table { display: flex; flex-direction: column; gap: 6px; }
    .ex-row {
      display: flex; align-items: center; gap: 12px;
      background: var(--adev-surface-2); padding: 8px 12px; border-radius: 6px; font-size: 13px;
    }
    .arrow { color: var(--adev-text-tertiary); font-size: 12px; white-space: nowrap; }

    /* Enable steps */
    .enable-steps { display: flex; flex-direction: column; gap: 8px; }
    .step {
      display: flex; align-items: center; gap: 12px;
      background: var(--adev-surface-2); padding: 10px 14px; border-radius: 6px;
    }
    .step-num {
      display: flex; align-items: center; justify-content: center; width: 28px; height: 28px;
      border-radius: 50%; background: var(--adev-primary); color: #0f0f11;
      font-size: 14px; font-weight: 700; flex-shrink: 0;
    }
    .step-text { color: var(--adev-text); font-size: 14px; }
  `],
})
export class TemplateDebugDemoComponent {}
