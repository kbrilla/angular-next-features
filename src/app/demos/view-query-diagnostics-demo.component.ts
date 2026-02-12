import {Component} from '@angular/core';

@Component({
  selector: 'app-view-query-diagnostics-demo',
  template: `
    <div class="demo-container">
      <div class="demo-header">
        <h2>View Query Target Validation</h2>
        <span class="badge vq-badge">Compiler</span>
        <span class="badge cap-badge">3 diagnostics</span>
      </div>
      <p class="demo-description">
        New compile-time diagnostics that catch view query misuse <strong>before</strong> runtime.
        These validate that <code>viewChild()</code>, <code>viewChildren()</code>, and their decorator
        equivalents target references that actually exist and are correctly used.
      </p>

      <!-- NG8023: Missing Required View Query Target -->
      <div class="example-section">
        <h3>NG8023 — Missing Required View Query Target</h3>
        <span class="severity error">Error</span>
        <p class="desc">
          When <code>viewChild.required('ref')</code> targets a template reference that doesn't exist
          anywhere in the template, the compiler produces an <strong>error</strong>. At runtime, this
          would throw <code>NG0951</code>.
        </p>
        <div class="code-block">
          <pre><code>&#64;Component({{'{'}}&nbsp;
  template: '&lt;div&gt;no refs here&lt;/div&gt;'
{{'}'}}&#41;
export class MyComp {{'{'}}&nbsp;
  // NG8023: Required view query 'el' expects a target matching 'missing',
  //         but no such target exists in the component's template.
  el = viewChild.required('missing');  // ← ERROR
{{'}'}}
</code></pre>
        </div>
        <div class="fix-block">
          <h4>Fix</h4>
          <pre><code>&#64;Component({{'{'}}&nbsp;
  template: '&lt;div #missing&gt;found&lt;/div&gt;'  // ← add the ref
{{'}'}}&#41;
export class MyComp {{'{'}}&nbsp;
  el = viewChild.required('missing');  // ✓ OK
{{'}'}}
</code></pre>
        </div>
      </div>

      <!-- NG8025: read:TemplateRef Mismatch -->
      <div class="example-section">
        <h3>NG8025 — read:TemplateRef on Non-Template Element</h3>
        <span class="severity error">Error</span>
        <p class="desc">
          When a query uses <code>read: TemplateRef</code> but the target reference is on a regular
          element (not <code>&lt;ng-template&gt;</code>), the compiler produces an error. Reading
          <code>TemplateRef</code> from a <code>&lt;div&gt;</code> always returns <code>undefined</code>.
        </p>
        <div class="code-block">
          <pre><code>&#64;Component({{'{'}}&nbsp;
  template: '&lt;div #myDiv&gt;hello&lt;/div&gt;'  // ← regular element, NOT ng-template
{{'}'}}&#41;
export class MyComp {{'{'}}&nbsp;
  // NG8025: View query 'tpl' uses 'read: TemplateRef' but the target
  //         '#myDiv' is on a regular element, not an &lt;ng-template&gt;.
  tpl = viewChild.required('myDiv', {{'{'}}&nbsp;read: TemplateRef {{'}'}});  // ← ERROR
{{'}'}}
</code></pre>
        </div>
        <div class="fix-block">
          <h4>Fix — use ng-template</h4>
          <pre><code>&#64;Component({{'{'}}&nbsp;
  template: '&lt;ng-template #myTpl&gt;content&lt;/ng-template&gt;'
{{'}'}}&#41;
export class MyComp {{'{'}}&nbsp;
  tpl = viewChild.required('myTpl', {{'{'}}&nbsp;read: TemplateRef {{'}'}});  // ✓ OK
{{'}'}}
</code></pre>
        </div>
      </div>

      <!-- NG8028: Conditional-Only Target -->
      <div class="example-section">
        <h3>NG8028 — Required Query Target Only in Conditional Block</h3>
        <span class="severity error">Error</span>
        <p class="desc">
          When <code>viewChild.required('ref')</code> targets a reference that only exists inside
          <code>&#64;if</code>, <code>&#64;switch</code>, <code>&#64;for</code>, or <code>&#64;defer</code>,
          the query may throw <code>NG0951</code> at runtime when the condition is false.
        </p>
        <div class="code-block">
          <pre><code>&#64;Component({{'{'}}&nbsp;
  template: '&#64;if (showPanel) {{'{'}}&nbsp;&lt;div #panel&gt;...&lt;/div&gt; {{'}'}}'
{{'}'}}&#41;
export class MyComp {{'{'}}&nbsp;
  showPanel = true;
  // NG8028: Required view query 'el' targets '#panel' which only exists
  //         inside a conditional block. When the condition is not met,
  //         this query will throw NG0951.
  el = viewChild.required('panel');  // ← ERROR
{{'}'}}
</code></pre>
        </div>
        <div class="fix-block">
          <h4>Fix — use optional query</h4>
          <pre><code>el = viewChild('panel');  // ✓ Optional — returns undefined when absent</code></pre>
          <h4>Fix — move ref outside conditional</h4>
          <pre><code>template: '&lt;div #panel&gt; &#64;if (showPanel) {{'{'}}&nbsp;...content... {{'}'}}&nbsp;&lt;/div&gt;'</code></pre>
        </div>
      </div>

      <!-- Coverage Matrix -->
      <div class="example-section">
        <h3>Diagnostic Coverage Matrix</h3>
        <table class="coverage-table">
          <thead>
            <tr>
              <th>Scenario</th>
              <th>viewChild.required()</th>
              <th>viewChild()</th>
              <th>viewChildren()</th>
              <th>&#64;ViewChild</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Missing target</td>
              <td class="cell-error">NG8023 Error</td>
              <td class="cell-none">—</td>
              <td class="cell-none">—</td>
              <td class="cell-none">—</td>
            </tr>
            <tr>
              <td>read:TemplateRef on &lt;div&gt;</td>
              <td class="cell-error">NG8025 Error</td>
              <td class="cell-error">NG8025 Error</td>
              <td class="cell-error">NG8025 Error</td>
              <td class="cell-error">NG8025 Error</td>
            </tr>
            <tr>
              <td>Target only in &#64;if/&#64;switch/&#64;defer</td>
              <td class="cell-error">NG8028 Error</td>
              <td class="cell-none">—</td>
              <td class="cell-none">—</td>
              <td class="cell-none">—</td>
            </tr>
            <tr>
              <td>Type predicate (e.g. ElementRef)</td>
              <td colspan="4" class="cell-none">Skipped — resolved by type, not by ref name</td>
            </tr>
            <tr>
              <td>Empty template</td>
              <td colspan="4" class="cell-none">Skipped — may be placeholder/WIP code</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Coming Soon -->
      <div class="example-section coming-soon">
        <h3>Coming Soon</h3>
        <ul class="upcoming-list">
          <li>
            <strong>NG8024 (Warning)</strong> — Optional queries (<code>viewChild('ref')</code>,
            <code>viewChildren('ref')</code>) targeting non-existent refs. Will be implemented as an
            Extended Template Check for proper warning-level diagnostics.
          </li>
          <li>
            <strong>Query Lifecycle Detection</strong> — Detect when queries are accessed in
            lifecycle hooks where they're not yet available (e.g., <code>viewChild</code> in
            <code>constructor</code> or <code>ngOnInit</code> for non-static queries).
          </li>
          <li>
            <strong>Static Query in Conditional</strong> — <code>&#64;ViewChild('ref', {{'{'}}&nbsp;static: true {{'}'}}</code>)
            inside <code>&#64;if</code>/<code>*ngIf</code> is always a bug.
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .demo-container { max-width: 900px; margin: 0 auto; padding: 2rem; }
    .demo-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; flex-wrap: wrap; }
    .demo-header h2 { margin: 0; font-size: 1.8rem; }
    .badge { padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600; }
    .vq-badge { background: #e8f5e9; color: #2e7d32; }
    .cap-badge { background: #e3f2fd; color: #1565c0; }
    .demo-description { color: #555; line-height: 1.6; margin-bottom: 2rem; }
    .demo-description code { background: #f5f5f5; padding: 0.15rem 0.4rem; border-radius: 4px; font-size: 0.9em; }
    .example-section { background: #fafafa; border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; border: 1px solid #e0e0e0; }
    .example-section h3 { margin-top: 0; color: #333; }
    .severity { display: inline-block; padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 700; margin-bottom: 0.5rem; }
    .severity.error { background: #ffebee; color: #c62828; }
    .severity.warning { background: #fff8e1; color: #f57f17; }
    .desc { color: #666; line-height: 1.6; }
    .desc code { background: #f0f0f0; padding: 0.1rem 0.3rem; border-radius: 3px; font-size: 0.85em; }
    .code-block { background: #263238; border-radius: 8px; padding: 1rem 1.25rem; margin: 1rem 0; overflow-x: auto; }
    .code-block pre { margin: 0; }
    .code-block code { color: #eeffff; font-family: 'Fira Code', 'Cascadia Code', monospace; font-size: 0.85rem; line-height: 1.5; white-space: pre; }
    .fix-block { background: #e8f5e9; border-radius: 8px; padding: 1rem 1.25rem; margin-top: 1rem; }
    .fix-block h4 { margin: 0 0 0.5rem; color: #2e7d32; font-size: 0.9rem; }
    .fix-block pre { margin: 0; background: #c8e6c9; border-radius: 4px; padding: 0.75rem; overflow-x: auto; }
    .fix-block code { font-family: 'Fira Code', 'Cascadia Code', monospace; font-size: 0.85rem; color: #1b5e20; }
    .coverage-table { width: 100%; border-collapse: collapse; margin-top: 1rem; font-size: 0.85rem; }
    .coverage-table th, .coverage-table td { padding: 0.6rem 0.8rem; border: 1px solid #e0e0e0; text-align: center; }
    .coverage-table th { background: #f5f5f5; font-weight: 600; }
    .coverage-table td:first-child { text-align: left; font-weight: 500; }
    .cell-error { background: #ffebee; color: #c62828; font-weight: 600; }
    .cell-warning { background: #fff8e1; color: #f57f17; font-weight: 600; }
    .cell-none { color: #999; }
    .coming-soon { border: 2px dashed #90caf9; background: #e3f2fd; }
    .coming-soon h3 { color: #1565c0; }
    .upcoming-list { padding-left: 1.5rem; }
    .upcoming-list li { margin-bottom: 0.75rem; color: #555; line-height: 1.5; }
    .upcoming-list code { background: #bbdefb; padding: 0.1rem 0.3rem; border-radius: 3px; font-size: 0.85em; }
  `],
})
export class ViewQueryDiagnosticsDemoComponent {}
