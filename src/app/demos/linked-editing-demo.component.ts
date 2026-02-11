import {Component} from '@angular/core';

@Component({
  selector: 'app-linked-editing-demo',
  template: `
    <div class="demo-container">
      <div class="demo-header">
        <h2>Linked Editing Ranges</h2>
        <span class="badge le-badge">LSP</span>
        <span class="badge ver-badge">v21.0.0+</span>
      </div>
      <p class="demo-description">
        Linked editing (also known as "mirror cursor") allows you to edit matching HTML tag pairs
        simultaneously. When you rename an opening tag, the closing tag updates automatically, and
        vice versa. Uses the LSP <code>textDocument/linkedEditingRange</code> request.
      </p>

      <!-- How to Enable -->
      <div class="example-section">
        <h3>How to Enable</h3>
        <div class="enable-grid">
          <div class="enable-card">
            <h4>Option 1: Always-On (Settings)</h4>
            <p class="desc">Enabled by default in VS Code. If not working, check:</p>
            <div class="code-block"><pre><code>// settings.json
{{'{'}}{{'}'}}
  "editor.linkedEditing": true
{{'}'}}</code></pre></div>
          </div>
          <div class="enable-card">
            <h4>Option 2: On-Demand (Command)</h4>
            <p class="desc">Trigger for the current tag pair only:</p>
            <div class="shortcut-list">
              <div class="shortcut"><span class="key">&#8679;&#8984;F2</span><span>macOS</span></div>
              <div class="shortcut"><span class="key">Ctrl+Shift+F2</span><span>Windows/Linux</span></div>
            </div>
            <p class="desc">Or: Command Palette &rarr; <strong>"Start Linked Editing"</strong></p>
          </div>
        </div>
      </div>

      <!-- How It Works -->
      <div class="example-section">
        <h3>How It Works</h3>
        <div class="demo-visual">
          <div class="code-block wide"><pre><code>&lt;<span class="hl-tag-edit">div</span> class="container"&gt;     <span class="dim">&larr; cursor on "div" here</span>
  &lt;span&gt;Hello&lt;/span&gt;
&lt;/<span class="hl-tag-edit">div</span>&gt;                      <span class="dim">&larr; updates automatically</span></code></pre></div>
          <div class="cursor-indicator">
            <span class="cursor-dot"></span>
            <span>Place cursor on tag name &rarr; type to rename &rarr; both tags update</span>
          </div>
        </div>
      </div>

      <!-- Custom Component Selectors -->
      <div class="example-section">
        <h3>Works with Angular Component Selectors</h3>
        <div class="code-block wide"><pre><code>&lt;<span class="hl-tag-edit">app-my-component</span>&gt;      <span class="dim">&larr; rename here</span>
  &lt;p&gt;Content&lt;/p&gt;
&lt;/<span class="hl-tag-edit">app-my-component</span>&gt;     <span class="dim">&larr; mirrors automatically</span>

<span class="dim">Word pattern: [-\\w]+  (allows hyphens for custom elements)</span></code></pre></div>
      </div>

      <!-- Supported Scenarios -->
      <div class="example-section">
        <h3>Supported Scenarios</h3>
        <div class="scenario-table">
          <div class="scenario-header"><span>Scenario</span><span>Status</span></div>
          <div class="scenario-row ok"><span>Inline templates in .ts files</span><span class="status-ok">&#10003; Supported</span></div>
          <div class="scenario-row ok"><span>External .html template files</span><span class="status-ok">&#10003; Supported</span></div>
          <div class="scenario-row ok"><span>Opening tag &rarr; Closing tag</span><span class="status-ok">&#10003; Supported</span></div>
          <div class="scenario-row ok"><span>Closing tag &rarr; Opening tag</span><span class="status-ok">&#10003; Supported</span></div>
          <div class="scenario-row ok"><span>Custom Angular selectors (e.g. &lt;app-my-component&gt;)</span><span class="status-ok">&#10003; Supported</span></div>
          <div class="scenario-row ok"><span>Nested elements</span><span class="status-ok">&#10003; Supported</span></div>
        </div>
      </div>

      <!-- Excluded Scenarios -->
      <div class="example-section dim-section">
        <h3>Excluded Scenarios</h3>
        <div class="scenario-table">
          <div class="scenario-row na"><span>Self-closing tags (<code>&lt;input /&gt;</code>, <code>&lt;br /&gt;</code>)</span><span class="status-na">N/A — no closing tag</span></div>
          <div class="scenario-row na"><span>Void elements (<code>&lt;input&gt;</code>, <code>&lt;br&gt;</code>, <code>&lt;img&gt;</code>)</span><span class="status-na">N/A — HTML5 void elements</span></div>
          <div class="scenario-row na"><span>Cursor on attributes or content</span><span class="status-na">N/A — must be on tag name</span></div>
        </div>
      </div>

      <!-- Technical Details -->
      <div class="example-section">
        <h3>Technical Details</h3>
        <div class="tech-list">
          <div class="tech-item">
            <strong>LSP Request:</strong>
            <code>textDocument/linkedEditingRange</code>
          </div>
          <div class="tech-item">
            <strong>Inline templates:</strong>
            <span>Angular Language Service handles the request</span>
          </div>
          <div class="tech-item">
            <strong>External HTML:</strong>
            <span>VS Code's built-in HTML Language Support handles it</span>
          </div>
          <div class="tech-item">
            <strong>Word pattern:</strong>
            <code>[-\\w]+</code>
            <span class="dim">(allows hyphens for custom element names)</span>
          </div>
        </div>
      </div>

      <!-- Troubleshooting -->
      <div class="example-section dim-section">
        <h3>Troubleshooting</h3>
        <div class="troubleshoot-list">
          <div class="ts-item">
            <strong>Not working in inline templates?</strong>
            <ul>
              <li>Angular Language Service extension must be installed and active</li>
              <li>File must be a TypeScript file with an &#64;Component decorator</li>
              <li>Cursor must be directly on the tag name (not on &lt; or attributes)</li>
              <li>Try: Cmd+Shift+P &rarr; "Angular: Restart Angular Language server"</li>
            </ul>
          </div>
          <div class="ts-item">
            <strong>Works in HTML but not TypeScript?</strong>
            <ul>
              <li>Extension version must be v21.0.0+ which includes this feature</li>
              <li>Template must use <code>template:</code> (not <code>templateUrl:</code> for inline)</li>
            </ul>
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
    .le-badge { background: rgba(56, 189, 248, 0.12); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.25); }
    .ver-badge { background: rgba(74, 222, 128, 0.12); color: #22c55e; border: 1px solid rgba(74, 222, 128, 0.25); }
    code { background: var(--adev-code-bg); border: 1px solid var(--adev-code-border); padding: 2px 6px; border-radius: 4px; font-size: 12px; color: var(--adev-primary); font-family: 'JetBrains Mono', monospace; }
    .example-section { background: var(--adev-surface); border: 1px solid var(--adev-border); border-left: 3px solid var(--adev-info); padding: 20px; margin: 20px 0; border-radius: 8px; }
    .example-section.dim-section { border-left-color: var(--adev-text-tertiary); opacity: 0.85; }
    h3 { color: var(--adev-text); margin-top: 0; font-size: 16px; font-weight: 600; }
    h4 { color: var(--adev-text); font-size: 14px; font-weight: 600; margin: 12px 0 8px; }
    .desc { color: var(--adev-text-secondary); font-size: 14px; margin: 8px 0 12px; }
    .dim { color: #64748b; font-style: italic; }
    .enable-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .enable-card { background: var(--adev-surface-2); border: 1px solid var(--adev-border); border-radius: 8px; padding: 16px; }
    .code-block { background: var(--adev-code-bg); border: 1px solid var(--adev-code-border); border-radius: 8px; padding: 14px; margin: 8px 0; overflow-x: auto; }
    .code-block.wide { margin: 12px 0; }
    .code-block pre { margin: 0; }
    .code-block code { background: none; border: none; padding: 0; font-size: 13px; color: var(--adev-code-text); line-height: 1.7; }
    .shortcut-list { display: flex; gap: 12px; margin: 8px 0; }
    .shortcut { display: flex; align-items: center; gap: 8px; padding: 6px 12px; background: var(--adev-code-bg); border: 1px solid var(--adev-code-border); border-radius: 6px; font-size: 13px; }
    .key { font-family: 'JetBrains Mono', monospace; font-weight: 600; color: var(--adev-primary); font-size: 13px; }
    .shortcut span:last-child { color: var(--adev-text-tertiary); font-size: 12px; }
    .hl-tag-edit { color: #fbbf24; background: rgba(251, 191, 36, 0.15); padding: 1px 4px; border-radius: 3px; font-weight: 600; }
    .demo-visual { position: relative; }
    .cursor-indicator { display: flex; align-items: center; gap: 8px; margin-top: 8px; font-size: 13px; color: var(--adev-text-secondary); }
    .cursor-dot { width: 8px; height: 8px; border-radius: 50%; background: #fbbf24; animation: pulse 1.5s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
    .scenario-table { display: flex; flex-direction: column; gap: 4px; }
    .scenario-header { display: grid; grid-template-columns: 1fr 160px; gap: 12px; padding: 6px 10px; font-weight: 700; color: var(--adev-text-secondary); font-size: 11px; text-transform: uppercase; }
    .scenario-row { display: grid; grid-template-columns: 1fr 160px; gap: 12px; padding: 8px 12px; border-radius: 6px; font-size: 13px; align-items: center; }
    .scenario-row.ok { background: rgba(74, 222, 128, 0.06); }
    .scenario-row.na { background: rgba(100, 116, 139, 0.06); }
    .status-ok { color: #4ade80; font-weight: 600; font-size: 12px; }
    .status-na { color: #94a3b8; font-size: 12px; font-style: italic; }
    .tech-list { display: flex; flex-direction: column; gap: 8px; }
    .tech-item { display: flex; align-items: center; gap: 10px; padding: 8px 12px; background: var(--adev-surface-2); border-radius: 6px; font-size: 13px; flex-wrap: wrap; }
    .tech-item span { color: var(--adev-text-secondary); font-size: 12px; }
    .troubleshoot-list { display: flex; flex-direction: column; gap: 16px; }
    .ts-item ul { margin: 4px 0 0; padding-left: 20px; }
    .ts-item li { font-size: 13px; color: var(--adev-text-secondary); line-height: 1.8; }
    @media (max-width: 768px) { .enable-grid { grid-template-columns: 1fr; } }
  `],
})
export class LinkedEditingDemoComponent {}
