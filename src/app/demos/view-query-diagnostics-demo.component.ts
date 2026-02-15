import {Component} from '@angular/core';

@Component({
  selector: 'app-view-query-diagnostics-demo',
  template: `
    <div class="demo-container">
      <div class="demo-header">
        <h2>View Query Target Validation</h2>
        <span class="badge vq-badge">Compiler</span>
        <span class="badge cap-badge">6 diagnostics</span>
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

      <!-- NG8024: Missing Optional View Query Target -->
      <div class="example-section">
        <h3>NG8024 — Missing Optional View Query Target</h3>
        <span class="severity warning">Warning</span>
        <p class="desc">
          Optional queries such as <code>viewChild('ref')</code>, <code>viewChildren('ref')</code>,
          and default <code>&#64;ViewChild('ref')</code> produce a warning when the target doesn't
          exist. These queries resolve to <code>undefined</code> at runtime.
        </p>
        <div class="code-block">
          <pre><code>&#64;Component({{'{'}}&nbsp;
  template: '&lt;div&gt;no refs here&lt;/div&gt;'
{{'}'}}&#41;
export class MyComp {{'{'}}&nbsp;
  // NG8024 (warning): target 'missing' does not exist
  el = viewChild('missing');
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

      <!-- NG8031: Query Lifecycle Access -->
      <div class="example-section">
        <h3>NG8031 — Non-static Query Accessed Too Early</h3>
        <span class="severity warning">Warning</span>
        <p class="desc">
          Non-static view queries are not available in <code>constructor</code> or
          <code>ngOnInit</code>. Access them in <code>ngAfterViewInit</code>, or use
          <code>static: true</code> if appropriate.
        </p>
        <div class="code-block">
          <pre><code>&#64;Component({{'{'}} template: '&lt;div #el&gt;&lt;/div&gt;' {{'}'}}&#41;
export class MyComp {{'{'}}
  el = viewChild('el');

  constructor() {{'{'}}
    this.el(); // NG8031 warning
  {{'}'}}
{{'}'}}
</code></pre>
        </div>
      </div>

      <!-- NG8028 static conditional -->
      <div class="example-section">
        <h3>NG8028 — Static Query Target Inside Conditional</h3>
        <span class="severity error">Error</span>
        <p class="desc">
          Static queries resolve before conditional blocks render. If the target exists only inside
          <code>&#64;if</code>/<code>*ngIf</code>, it can never be resolved correctly.
        </p>
        <div class="code-block">
          <pre><code>&#64;Component({{'{'}}
  template: '&#64;if (show) {{'{'}} &lt;div #panel&gt;&lt;/div&gt; {{'}'}}'
{{'}'}}&#41;
export class MyComp {{'{'}}
  &#64;ViewChild('panel', {{'{'}} static: true {{'}'}}) panel!: unknown; // NG8028
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
              <th>&#64;ViewChild()</th>
              <th>&#64;ViewChild({{'{'}} required: true {{'}'}})</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Missing target</td>
              <td class="cell-error">NG8023 Error</td>
              <td class="cell-warning">NG8024 Warning</td>
              <td class="cell-warning">NG8024 Warning</td>
              <td class="cell-warning">NG8024 Warning</td>
              <td class="cell-error">NG8023 Error</td>
            </tr>
            <tr>
              <td>read:TemplateRef on &lt;div&gt;</td>
              <td class="cell-error">NG8025 Error</td>
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
              <td class="cell-error">NG8028 Error (static: true)</td>
              <td class="cell-error">NG8028 Error (static: true)</td>
            </tr>
            <tr>
              <td>Accessed in constructor/ngOnInit</td>
              <td class="cell-warning">NG8031 Warning (non-static)</td>
              <td class="cell-warning">NG8031 Warning (non-static)</td>
              <td class="cell-none">—</td>
              <td class="cell-warning">NG8031 Warning (non-static)</td>
              <td class="cell-warning">NG8031 Warning (non-static)</td>
            </tr>
            <tr>
              <td>Type predicate (e.g. ElementRef)</td>
              <td colspan="5" class="cell-none">Skipped — resolved by type, not by ref name</td>
            </tr>
            <tr>
              <td>Empty template</td>
              <td colspan="5" class="cell-none">Skipped — may be placeholder/WIP code</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="issues-section">
        <h3>Community Issues Addressed</h3>

        <div class="pr-banner">
          <span class="pr-label">PR</span>
          <a href="https://github.com/angular/angular/pull/67078" target="_blank">
            angular/angular#67078 — fix(core): defer signal query results from first-pass embedded views
          </a>
        </div>

        <div class="issue-card">
          <div class="issue-header">
            <a class="issue-link" href="https://github.com/angular/angular/issues/57879" target="_blank">#57879</a>
            <span class="issue-title">viewChild.required() is lying about its type</span>
          </div>
          <p class="issue-desc">
            Required and optional <code>viewChild</code>/<code>viewChildren</code> queries had no compile-time
            validation that their targets actually existed in the template. NG8023–NG8031 diagnostics now catch
            missing targets, incorrect <code>read</code> types, and static/required query conflicts.
          </p>
        </div>
        <div class="issue-card">
          <div class="issue-header">
            <a class="issue-link" href="https://github.com/angular/angular/issues/59717" target="_blank">#59717</a>
            <span class="issue-title">Provide better type safety for viewChild</span>
          </div>
          <p class="issue-desc">
            Compile-time validation that view query targets exist in the template, with diagnostics for
            required queries targeting missing or conditionally-rendered elements.
          </p>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .demo-container { max-width: 900px; margin: 0 auto; padding: 2rem; }
    .demo-header { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; flex-wrap: wrap; }
    .demo-header h2 { margin: 0; font-size: 1.8rem; color: var(--adev-text); }
    .badge { padding: 0.25rem 0.75rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600; }
    .vq-badge { background: rgba(76, 175, 80, 0.12); color: #4caf50; border: 1px solid rgba(76,175,80,0.12); }
    .cap-badge { background: rgba(96, 165, 250, 0.08); color: var(--adev-info); border: 1px solid rgba(96,165,250,0.12); }
    .demo-description { color: var(--adev-text-secondary); line-height: 1.6; margin-bottom: 2rem; }
    .demo-description code { background: var(--adev-code-bg); padding: 0.15rem 0.4rem; border-radius: 4px; font-size: 0.9em; color: var(--adev-primary); border: 1px solid var(--adev-code-border); }
    .example-section { background: var(--adev-surface); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem; border: 1px solid var(--adev-border); color: var(--adev-text); }
    .example-section h3 { margin-top: 0; color: var(--adev-text); }
    .severity { display: inline-block; padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.75rem; font-weight: 700; margin-bottom: 0.5rem; }
    .severity.error { background: rgba(248,113,113,0.08); color: var(--adev-error); }
    .severity.warning { background: rgba(251,191,36,0.06); color: var(--adev-warning); }
    .desc { color: var(--adev-text-secondary); line-height: 1.6; }
    .desc code { background: var(--adev-code-bg); padding: 0.1rem 0.3rem; border-radius: 3px; font-size: 0.85em; color: var(--adev-code-text); border: 1px solid var(--adev-code-border); }
    .code-block { background: var(--adev-code-bg); border-radius: 8px; padding: 1rem 1.25rem; margin: 1rem 0; overflow-x: auto; border: 1px solid var(--adev-code-border); }
    .code-block pre { margin: 0; }
    .code-block code { color: var(--adev-code-text); font-family: 'Fira Code', 'Cascadia Code', monospace; font-size: 0.85rem; line-height: 1.5; white-space: pre; }
    .fix-block { background: rgba(74,222,128,0.04); border-radius: 8px; padding: 1rem 1.25rem; margin-top: 1rem; border-left: 3px solid var(--adev-success); }
    .fix-block h4 { margin: 0 0 0.5rem; color: var(--adev-success); font-size: 0.9rem; }
    .fix-block pre { margin: 0; background: rgba(74,222,128,0.06); border-radius: 4px; padding: 0.75rem; overflow-x: auto; color: var(--adev-text); }
    .fix-block code { font-family: 'Fira Code', 'Cascadia Code', monospace; font-size: 0.85rem; color: var(--adev-text); }
    .coverage-table { width: 100%; border-collapse: collapse; margin-top: 1rem; font-size: 0.85rem; }
    .coverage-table th, .coverage-table td { padding: 0.6rem 0.8rem; border: 1px solid var(--adev-border); text-align: center; }
    .coverage-table th { background: var(--adev-surface-2); font-weight: 600; color: var(--adev-text); }
    .coverage-table td:first-child { text-align: left; font-weight: 500; color: var(--adev-text); }
    .cell-error { background: rgba(248,113,113,0.06); color: var(--adev-error); font-weight: 600; }
    .cell-warning { background: rgba(251,191,36,0.04); color: var(--adev-warning); font-weight: 600; }
    .cell-none { color: var(--adev-text-secondary); }
    .issues-section { background: rgba(167, 139, 250, 0.06); border: 1px solid rgba(167, 139, 250, 0.2); padding: 20px; border-radius: 8px; margin: 20px 0; }
    .issues-section h3 { color: var(--adev-accent); border-bottom: 1px solid var(--adev-border); padding-bottom: 8px; }
    .pr-banner { display: flex; align-items: center; gap: 10px; margin: 12px 0; background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.3); padding: 10px 16px; border-radius: 8px; }
    .pr-label { background: #38bdf8; color: #0f0f11; padding: 2px 10px; border-radius: 4px; font-size: 12px; font-weight: 700; white-space: nowrap; }
    .pr-banner a { color: #38bdf8; text-decoration: none; font-size: 13px; font-weight: 600; }
    .pr-banner a:hover { text-decoration: underline; }
    .issue-card { background: var(--adev-surface); border: 1px solid var(--adev-border); padding: 16px; border-radius: 8px; margin: 12px 0; }
    .issue-header { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
    .issue-title { font-weight: 600; color: var(--adev-text); font-size: 14px; }
    .issue-desc { font-size: 13px; color: var(--adev-text-secondary); line-height: 1.6; }
    .new-feature-badge { background: linear-gradient(135deg, var(--adev-success), #059669); color: white; padding: 2px 10px; border-radius: 4px; font-size: 11px; font-weight: 700; letter-spacing: 0.5px; }
    .issue-link { background: var(--adev-accent); color: #0f0f11; padding: 2px 8px; border-radius: 4px; font-size: 12px; font-weight: 700; text-decoration: none; }
    .issue-link:hover { opacity: 0.85; }
  `],
})
export class ViewQueryDiagnosticsDemoComponent {}
