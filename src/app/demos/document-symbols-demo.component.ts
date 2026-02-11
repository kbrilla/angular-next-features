import {Component} from '@angular/core';

@Component({
  selector: 'app-document-symbols-demo',
  template: `
    <div class="demo-container">
      <div class="demo-header">
        <h2>Document Symbols (Outline &amp; Breadcrumbs)</h2>
      </div>
      <p class="demo-description">
        LSP <code>textDocument/documentSymbol</code> support for Angular templates.
        Powers the <strong>Outline panel</strong>, <strong>Breadcrumbs bar</strong>, and
        <strong>Go to Symbol</strong> (Cmd+Shift+O) in VS Code. Shows a structured tree
        of your template's elements, control flow blocks, and declarations.
      </p>
      <p class="wip-note">
        This is a <strong>Language Service feature</strong> — it enhances the editor's
        navigation UI, not the template at runtime.
      </p>

      <!-- What it shows -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> Outline Panel View</h3>
        <p class="desc">
          The Outline panel shows a structured tree of your Angular template.
          Each node has an appropriate icon based on its type.
        </p>
        <div class="outline-demo">
          <div class="outline-tree">
            <div class="tree-node root"><span class="tree-icon comp">C</span> AppComponent</div>
            <div class="tree-node l1"><span class="tree-icon elem">E</span> &lt;div class="container"&gt;</div>
            <div class="tree-node l2"><span class="tree-icon block">&#64;</span> &#64;if (isLoggedIn)</div>
            <div class="tree-node l3"><span class="tree-icon elem">E</span> &lt;header&gt;</div>
            <div class="tree-node l4"><span class="tree-icon elem">E</span> &lt;h1&gt;</div>
            <div class="tree-node l3"><span class="tree-icon decl">L</span> &#64;let greeting = 'Hello'</div>
            <div class="tree-node l2"><span class="tree-icon block">&#64;</span> &#64;else</div>
            <div class="tree-node l3"><span class="tree-icon elem">E</span> &lt;p&gt; "Please log in"</div>
            <div class="tree-node l2"><span class="tree-icon block">&#64;</span> &#64;for (item of items; track item.id)</div>
            <div class="tree-node l3"><span class="tree-icon var">V</span> item</div>
            <div class="tree-node l3"><span class="tree-icon elem">E</span> &lt;app-item-card&gt;</div>
            <div class="tree-node l4"><span class="tree-icon ref">#</span> #itemRef</div>
            <div class="tree-node l3"><span class="tree-icon block">&#64;</span> &#64;empty</div>
            <div class="tree-node l4"><span class="tree-icon elem">E</span> &lt;p&gt; "No items found"</div>
            <div class="tree-node l2"><span class="tree-icon block">&#64;</span> &#64;switch (status)</div>
            <div class="tree-node l3"><span class="tree-icon block">&#64;</span> &#64;case ('loading')</div>
            <div class="tree-node l3"><span class="tree-icon block">&#64;</span> &#64;case ('error')</div>
            <div class="tree-node l3"><span class="tree-icon block">&#64;</span> &#64;default</div>
            <div class="tree-node l2"><span class="tree-icon block">&#64;</span> &#64;defer (when isVisible)</div>
            <div class="tree-node l3"><span class="tree-icon elem">E</span> &lt;app-heavy-widget&gt;</div>
            <div class="tree-node l3"><span class="tree-icon block">&#64;</span> &#64;placeholder</div>
            <div class="tree-node l3"><span class="tree-icon block">&#64;</span> &#64;loading</div>
          </div>
        </div>
      </div>

      <!-- Symbol types -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> Symbol Types</h3>
        <div class="symbol-grid">
          <div class="symbol-card">
            <span class="tree-icon elem">E</span>
            <div>
              <strong>HTML Elements & Components</strong>
              <p>&lt;div&gt;, &lt;button&gt;, &lt;app-my-component&gt;</p>
            </div>
          </div>
          <div class="symbol-card">
            <span class="tree-icon block">&#64;</span>
            <div>
              <strong>Control Flow Blocks</strong>
              <p>&#64;if, &#64;else, &#64;for, &#64;switch, &#64;case, &#64;defer, &#64;placeholder, &#64;loading, &#64;error</p>
            </div>
          </div>
          <div class="symbol-card">
            <span class="tree-icon ref">#</span>
            <div>
              <strong>Template References</strong>
              <p>#myRef, #inputRef, #formRef</p>
            </div>
          </div>
          <div class="symbol-card">
            <span class="tree-icon var">V</span>
            <div>
              <strong>Loop Variables</strong>
              <p>item (&#64;for variable), i = $index, isLast = $last</p>
            </div>
          </div>
          <div class="symbol-card">
            <span class="tree-icon decl">L</span>
            <div>
              <strong>&#64;let Declarations</strong>
              <p>&#64;let greeting = 'Hello'; &#64;let total = items.length</p>
            </div>
          </div>
          <div class="symbol-card">
            <span class="tree-icon comp">C</span>
            <div>
              <strong>Component Classes (inline)</strong>
              <p>For .ts files with inline templates — component wraps template symbols</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Symbol names -->
      <div class="example-section">
        <h3>Symbol Name Formatting</h3>
        <p class="desc">Each symbol type has specific formatting for its display name in the Outline panel.</p>
        <div class="name-table">
          <div class="name-row">
            <span class="name-type">Element</span>
            <code>&lt;div class="container"&gt;</code>
            <span class="name-note">Tag name + key attrs</span>
          </div>
          <div class="name-row">
            <span class="name-type">&#64;if block</span>
            <code>&#64;if (isLoggedIn)</code>
            <span class="name-note">Includes condition expression</span>
          </div>
          <div class="name-row">
            <span class="name-type">&#64;for block</span>
            <code>&#64;for (item of items; track item.id)</code>
            <span class="name-note">Includes loop var + trackBy</span>
          </div>
          <div class="name-row">
            <span class="name-type">&#64;switch</span>
            <code>&#64;switch (status)</code>
            <span class="name-note">Includes switch expression</span>
          </div>
          <div class="name-row">
            <span class="name-type">&#64;case</span>
            <code>&#64;case ('loading')</code>
            <span class="name-note">Includes case value</span>
          </div>
          <div class="name-row">
            <span class="name-type">&#64;defer</span>
            <code>&#64;defer (when isVisible)</code>
            <span class="name-note">Includes trigger description</span>
          </div>
          <div class="name-row">
            <span class="name-type">Reference</span>
            <code>#myRef</code>
            <span class="name-note">Hash prefix preserved</span>
          </div>
          <div class="name-row">
            <span class="name-type">&#64;let</span>
            <code>&#64;let total = items.length</code>
            <span class="name-note">Name + expression (truncated at 30 chars)</span>
          </div>
        </div>
      </div>

      <!-- Go to Symbol demo -->
      <div class="example-section">
        <h3>Go to Symbol (Cmd+Shift+O)</h3>
        <p class="desc">
          Quick-jump to any template element, block, or declaration. Type <code>&#64;</code> to
          group by kind (elements, blocks, variables, declarations).
        </p>
        <div class="goto-demo">
          <div class="goto-header">
            <span class="goto-icon">🔍</span>
            <span class="goto-input">Go to Symbol in Editor...</span>
          </div>
          <div class="goto-list">
            <div class="goto-item"><span class="tree-icon elem">E</span> &lt;div class="container"&gt;</div>
            <div class="goto-item"><span class="tree-icon block">&#64;</span> &#64;if (isLoggedIn)</div>
            <div class="goto-item"><span class="tree-icon block">&#64;</span> &#64;for (item of items; track item.id)</div>
            <div class="goto-item active"><span class="tree-icon ref">#</span> #formRef</div>
            <div class="goto-item"><span class="tree-icon decl">L</span> &#64;let greeting = 'Hello'</div>
            <div class="goto-item"><span class="tree-icon block">&#64;</span> &#64;defer (when isVisible)</div>
          </div>
        </div>
      </div>

      <!-- Structural directives -->
      <div class="example-section">
        <h3>Structural Directives (Legacy)</h3>
        <p class="desc">
          Also supports legacy structural directives using microsyntax, displaying them
          with meaningful names in the outline.
        </p>
        <div class="name-table">
          <div class="name-row">
            <span class="name-type">*ngIf</span>
            <code>*ngIf="isVisible"</code>
            <span class="name-note">Shows as "*ngIf isVisible" with block icon</span>
          </div>
          <div class="name-row">
            <span class="name-type">*ngFor</span>
            <code>*ngFor="let item of items"</code>
            <span class="name-note">Shows as "*ngFor let item of items"</span>
          </div>
          <div class="name-row">
            <span class="name-type">*ngSwitch</span>
            <code>[ngSwitch]="status"</code>
            <span class="name-note">Shows as "[ngSwitch] status"</span>
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
    .ds-badge { background: rgba(232, 121, 249, 0.12); color: #e879f9; border: 1px solid rgba(232, 121, 249, 0.25); }
    .feat-badge { display: inline-block; font-size: 9px; font-weight: 700; letter-spacing: 0.5px; background: linear-gradient(135deg, var(--adev-gradient-start), var(--adev-gradient-end)); color: #0f0f11; padding: 2px 6px; border-radius: 4px; vertical-align: middle; margin-right: 4px; }
    code { background: var(--adev-code-bg); border: 1px solid var(--adev-code-border); padding: 2px 6px; border-radius: 4px; font-size: 12px; color: var(--adev-primary); font-family: 'JetBrains Mono', monospace; }
    .wip-note { background: rgba(251, 191, 36, 0.08); border-left: 3px solid var(--adev-warning); padding: 10px 14px; border-radius: 6px; font-size: 13px; color: var(--adev-text-secondary); margin-bottom: 12px; }
    .example-section { background: var(--adev-surface); border: 1px solid var(--adev-border); border-left: 3px solid var(--adev-info); padding: 20px; margin: 20px 0; border-radius: 8px; }
    h3 { color: var(--adev-text); margin-top: 0; font-size: 16px; font-weight: 600; }
    .desc { color: var(--adev-text-secondary); font-size: 14px; margin: 8px 0 12px; }
    .note { background: rgba(74, 222, 128, 0.08); border-left: 3px solid var(--adev-success); padding: 10px 14px; border-radius: 6px; font-size: 13px; color: var(--adev-text-secondary); margin-top: 12px; }
    .outline-demo { background: var(--adev-code-bg); border: 1px solid var(--adev-code-border); border-radius: 8px; padding: 16px; font-family: 'JetBrains Mono', monospace; font-size: 13px; color: var(--adev-code-text); }
    .outline-tree { display: flex; flex-direction: column; gap: 2px; }
    .tree-node { padding: 3px 8px; border-radius: 4px; display: flex; align-items: center; gap: 8px; }
    .tree-node:hover { background: rgba(240, 160, 200, 0.06); }
    .tree-node.root { font-weight: 700; }
    .tree-node.l1 { padding-left: 20px; }
    .tree-node.l2 { padding-left: 40px; }
    .tree-node.l3 { padding-left: 60px; }
    .tree-node.l4 { padding-left: 80px; }
    .tree-icon { display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; border-radius: 3px; font-size: 10px; font-weight: 700; flex-shrink: 0; }
    .tree-icon.elem { background: rgba(96, 165, 250, 0.2); color: #60a5fa; }
    .tree-icon.block { background: rgba(192, 132, 252, 0.2); color: #c084fc; }
    .tree-icon.ref { background: rgba(251, 191, 36, 0.2); color: #fbbf24; }
    .tree-icon.var { background: rgba(74, 222, 128, 0.2); color: #4ade80; }
    .tree-icon.decl { background: rgba(34, 211, 238, 0.2); color: #22d3ee; }
    .tree-icon.comp { background: rgba(240, 160, 200, 0.2); color: var(--adev-primary); }
    .symbol-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 10px; }
    .symbol-card { display: flex; align-items: flex-start; gap: 10px; background: var(--adev-surface-2); padding: 12px; border-radius: 6px; }
    .symbol-card p { font-size: 12px; color: var(--adev-text-tertiary); margin: 2px 0 0; }
    .name-table { display: flex; flex-direction: column; gap: 6px; }
    .name-row { display: grid; grid-template-columns: 100px 1fr 1fr; gap: 12px; align-items: center; background: var(--adev-surface-2); padding: 8px 12px; border-radius: 6px; font-size: 13px; }
    .name-type { font-weight: 600; color: var(--adev-text-secondary); }
    .name-note { font-size: 12px; color: var(--adev-text-tertiary); }
    .goto-demo { background: var(--adev-surface-2); border: 1px solid var(--adev-border); border-radius: 8px; overflow: hidden; }
    .goto-header { display: flex; align-items: center; gap: 8px; padding: 10px 14px; border-bottom: 1px solid var(--adev-border); background: var(--adev-surface); }
    .goto-icon { font-size: 14px; }
    .goto-input { color: var(--adev-text-secondary); font-size: 14px; }
    .goto-list { }
    .goto-item { display: flex; align-items: center; gap: 8px; padding: 6px 14px; font-size: 13px; color: var(--adev-text); font-family: 'JetBrains Mono', monospace; }
    .goto-item.active { background: rgba(240, 160, 200, 0.08); color: var(--adev-primary); }
    .goto-item:hover { background: rgba(240, 160, 200, 0.04); }
  `],
})
export class DocumentSymbolsDemoComponent {}
