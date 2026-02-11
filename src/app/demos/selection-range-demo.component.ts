import {Component} from '@angular/core';

@Component({
  selector: 'app-selection-range-demo',
  template: `
    <div class="demo-container">
      <div class="demo-header">
        <h2>Selection Range (Smart Expand Selection)</h2>
      </div>
      <p class="demo-description">
        LSP <code>textDocument/selectionRange</code> support for Angular templates.
        Press <strong>Cmd+Shift+Right</strong> (Mac) or <strong>Ctrl+Shift+Right</strong> (Windows)
        to progressively expand selection through the Angular template AST — from identifier to
        expression to element to block to template root.
      </p>
      <p class="wip-note">
        This is a <strong>Language Service feature</strong> — it enhances the editor, not the
        template at runtime. The examples below show the expansion chains the LSP provides.
      </p>

      <!-- How it works -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> How Expand Selection Works</h3>
        <p class="desc">
          Starting from the cursor position, each press expands selection to the next logical
          AST node. The chain goes from innermost expression to outermost template root.
        </p>
        <div class="chain-demo">
          <div class="chain-title">Cursor on <code>city</code> inside interpolation:</div>
          <div class="chain-steps">
            <div class="chain-step"><span class="step-num">1</span><code>city</code><span class="step-desc">Identifier</span></div>
            <div class="chain-arrow">&rarr;</div>
            <div class="chain-step"><span class="step-num">2</span><code>user.address.city</code><span class="step-desc">Property chain</span></div>
            <div class="chain-arrow">&rarr;</div>
            <div class="chain-step"><span class="step-num">3</span><code>{{ '{{' }} user.address.city {{ '}}' }}</code><span class="step-desc">Interpolation</span></div>
            <div class="chain-arrow">&rarr;</div>
            <div class="chain-step"><span class="step-num">4</span><code>&lt;p&gt;...&lt;/p&gt;</code><span class="step-desc">Element</span></div>
            <div class="chain-arrow">&rarr;</div>
            <div class="chain-step"><span class="step-num">5</span><code>&lt;div&gt;...&lt;/div&gt;</code><span class="step-desc">Parent element</span></div>
          </div>
        </div>
      </div>

      <!-- Supported contexts -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> Supported Template Contexts</h3>
        <div class="context-grid">
          <div class="context-card">
            <h4>Interpolations</h4>
            <p>Expand through property access chains, method calls, ternaries, pipes</p>
            <div class="example-code">
              <code>{{ '{{' }} user.name | uppercase {{ '}}' }}</code>
            </div>
            <div class="chain-mini">
              name &rarr; user.name &rarr; user.name | uppercase &rarr; {{ '{{...}}' }} &rarr; element
            </div>
          </div>

          <div class="context-card">
            <h4>Bound Attributes</h4>
            <p>Expand from bound value through attribute to element</p>
            <div class="example-code">
              <code>[style.width.px]="containerWidth"</code>
            </div>
            <div class="chain-mini">
              containerWidth &rarr; [style.width.px]="..." &rarr; element attributes &rarr; element
            </div>
          </div>

          <div class="context-card">
            <h4>Event Handlers</h4>
            <p>Expand from handler expression through event binding</p>
            <div class="example-code">
              <code>(click)="save(form.value)"</code>
            </div>
            <div class="chain-mini">
              value &rarr; form.value &rarr; save(form.value) &rarr; (click)="..." &rarr; element
            </div>
          </div>

          <div class="context-card">
            <h4>Control Flow Blocks</h4>
            <p>Expand through &#64;if, &#64;for, &#64;switch, &#64;defer conditions</p>
            <div class="example-code">
              <code>&#64;if (items.length > 0)</code>
            </div>
            <div class="chain-mini">
              length &rarr; items.length &rarr; items.length > 0 &rarr; &#64;if block &rarr; parent
            </div>
          </div>

          <div class="context-card">
            <h4>Pipes</h4>
            <p>Expand pipe args, pipe name, input expression independently</p>
            <div class="example-code">
              <code>{{ '{{' }} price | currency:'USD':'symbol':'1.0-0' {{ '}}' }}</code>
            </div>
            <div class="chain-mini">
              'USD' &rarr; pipe args &rarr; price | currency:... &rarr; {{ '{{...}}' }} &rarr; element
            </div>
          </div>

          <div class="context-card">
            <h4>Safe Navigation</h4>
            <p>Expand through optional chaining steps</p>
            <div class="example-code">
              <code>{{ '{{' }} user?.address?.city {{ '}}' }}</code>
            </div>
            <div class="chain-mini">
              city &rarr; address?.city &rarr; user?.address?.city &rarr; {{ '{{...}}' }} &rarr; element
            </div>
          </div>
        </div>
      </div>

      <!-- Advanced features -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> Advanced Features</h3>

        <div class="feature-item">
          <h4>Sibling Grouping</h4>
          <p class="desc">
            Multiple sibling attributes are grouped together before expanding to the element.
            Multiple sibling children are grouped before expanding to the parent.
          </p>
          <div class="example-code">
            <code>&lt;button [disabled]="!valid" [class.active]="isActive" (click)="save()"&gt;</code>
          </div>
          <p class="note">Selection expands: attribute &rarr; all attributes group &rarr; full element</p>
        </div>

        <div class="feature-item">
          <h4>&#64;for Loop Expansion</h4>
          <p class="desc">Expands through loop variable, track expression, and &#64;empty block.</p>
          <div class="example-code">
            <code>&#64;for (item of items; track item.id) {{ '{' }} ... {{ '}' }} &#64;empty {{ '{' }} ... {{ '}' }}</code>
          </div>
        </div>

        <div class="feature-item">
          <h4>&#64;defer Trigger Expansion</h4>
          <p class="desc">Expands through trigger expressions (when, on hover, on viewport, on timer).</p>
          <div class="example-code">
            <code>&#64;defer (when isVisible; on hover(triggerEl); on timer(500ms))</code>
          </div>
        </div>

        <div class="feature-item">
          <h4>Ternary & Nullish Coalescing</h4>
          <p class="desc">Expands from branch value through full conditional expression.</p>
          <div class="example-code">
            <code>{{ '{{' }} isAdmin ? 'Admin' : 'User' {{ '}}' }}</code>
          </div>
          <p class="note">Cursor on 'Admin' &rarr; condition true branch &rarr; full ternary &rarr; interpolation</p>
        </div>

        <div class="feature-item">
          <h4>preserveWhitespaces</h4>
          <p class="desc">
            Correctly handles <code>preserveWhitespaces: true</code> — includes surrounding
            whitespace text nodes in sibling grouping.
          </p>
        </div>
      </div>

      <!-- Works in both template modes -->
      <div class="example-section">
        <h3>Works in Both Template Modes</h3>
        <div class="mode-grid">
          <div class="mode-card">
            <div class="mode-icon">📄</div>
            <h4>External Templates</h4>
            <code>templateUrl: './app.html'</code>
            <p>Selection ranges work directly in .html files</p>
          </div>
          <div class="mode-card">
            <div class="mode-icon">📝</div>
            <h4>Inline Templates</h4>
            <code>template: &#96;...&#96;</code>
            <p>Selection ranges work in backtick template literals inside .ts files</p>
          </div>
        </div>
        <p class="note">
          Inline templates correctly adjust offsets for the template position within the
          TypeScript file. The expansion chain is identical in both modes.
        </p>
      </div>
    </div>
  `,
  styles: [`
    .demo-container { max-width: 900px; margin: 0 auto; padding: 32px 32px 64px; }
    .demo-header { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; flex-wrap: wrap; }
    .demo-header h2 { font-size: 28px; font-weight: 700; color: var(--adev-text); margin: 0; }
    .demo-description { color: var(--adev-text-secondary); font-size: 15px; line-height: 1.7; margin-bottom: 24px; }
    .badge { display: inline-block; padding: 3px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; font-family: 'JetBrains Mono', monospace; }
    .sr-badge { background: rgba(34, 211, 238, 0.12); color: #22d3ee; border: 1px solid rgba(34, 211, 238, 0.25); }
    .feat-badge { display: inline-block; font-size: 9px; font-weight: 700; letter-spacing: 0.5px; background: linear-gradient(135deg, var(--adev-gradient-start), var(--adev-gradient-end)); color: #0f0f11; padding: 2px 6px; border-radius: 4px; vertical-align: middle; margin-right: 4px; }
    code { background: var(--adev-code-bg); border: 1px solid var(--adev-code-border); padding: 2px 6px; border-radius: 4px; font-size: 12px; color: var(--adev-primary); font-family: 'JetBrains Mono', monospace; }
    .wip-note { background: rgba(251, 191, 36, 0.08); border-left: 3px solid var(--adev-warning); padding: 10px 14px; border-radius: 6px; font-size: 13px; color: var(--adev-text-secondary); }
    .example-section { background: var(--adev-surface); border: 1px solid var(--adev-border); border-left: 3px solid var(--adev-info); padding: 20px; margin: 20px 0; border-radius: 8px; }
    h3 { color: var(--adev-text); margin-top: 0; font-size: 16px; font-weight: 600; }
    h4 { color: var(--adev-text); font-size: 14px; font-weight: 600; margin: 12px 0 6px; }
    .desc { color: var(--adev-text-secondary); font-size: 14px; margin: 8px 0 12px; }
    .note { background: rgba(74, 222, 128, 0.08); border-left: 3px solid var(--adev-success); padding: 10px 14px; border-radius: 6px; font-size: 13px; color: var(--adev-text-secondary); margin-top: 12px; }
    .chain-demo { margin: 16px 0; }
    .chain-title { font-size: 14px; color: var(--adev-text-secondary); margin-bottom: 12px; }
    .chain-steps { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .chain-step { background: var(--adev-surface-2); border: 1px solid var(--adev-border-subtle); padding: 8px 12px; border-radius: 6px; display: flex; flex-direction: column; align-items: center; gap: 4px; }
    .chain-step .step-num { display: flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 50%; background: var(--adev-primary); color: #0f0f11; font-size: 11px; font-weight: 700; }
    .chain-step .step-desc { font-size: 10px; color: var(--adev-text-tertiary); }
    .chain-arrow { color: var(--adev-text-tertiary); font-size: 16px; }
    .context-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 12px; }
    .context-card { background: var(--adev-surface-2); border: 1px solid var(--adev-border-subtle); padding: 14px; border-radius: 8px; }
    .context-card h4 { margin-top: 0; color: var(--adev-primary); }
    .context-card p { font-size: 13px; color: var(--adev-text-secondary); margin: 4px 0 8px; }
    .example-code { background: var(--adev-code-bg); padding: 8px 12px; border-radius: 6px; border: 1px solid var(--adev-code-border); margin: 8px 0; }
    .chain-mini { font-size: 11px; color: var(--adev-text-tertiary); font-family: 'JetBrains Mono', monospace; }
    .feature-item { margin: 16px 0; padding: 14px; background: var(--adev-surface-2); border-radius: 8px; border: 1px solid var(--adev-border-subtle); }
    .feature-item h4 { margin-top: 0; }
    .mode-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin: 12px 0; }
    .mode-card { background: var(--adev-surface-2); padding: 16px; border-radius: 8px; border: 1px solid var(--adev-border-subtle); text-align: center; }
    .mode-icon { font-size: 28px; margin-bottom: 8px; }
    .mode-card h4 { margin-top: 0; }
    .mode-card p { font-size: 13px; color: var(--adev-text-secondary); margin: 4px 0 0; }
  `],
})
export class SelectionRangeDemoComponent {}
