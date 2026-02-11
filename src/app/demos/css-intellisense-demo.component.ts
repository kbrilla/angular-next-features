import {Component} from '@angular/core';

interface DiagnosticRow {
  code: string;
  name: string;
  severity: string;
  desc: string;
}

interface BindingExample {
  syntax: string;
  result: string;
  diagnostic: string;
}

@Component({
  selector: 'app-css-intellisense-demo',
  template: `
    <div class="demo-container">
      <div class="demo-header">
        <h2>CSS / ARIA / Events IntelliSense</h2>
        <span class="badge css-badge">feat/css-intellisense-legacy</span>
      </div>
      <p class="demo-description">
        Comprehensive CSS property, unit, value, ARIA attribute, and DOM event validation for
        Angular templates. 55+ diagnostic codes across 42 binding contexts. Unlike the other demos,
        these are <strong>Language Service features</strong> — they light up in the editor, not in
        the template at runtime.
      </p>

      <!-- Stats -->
      <div class="stats-row">
        <div class="stat">
          <span class="stat-value">55+</span>
          <span class="stat-label">Diagnostic codes</span>
        </div>
        <div class="stat">
          <span class="stat-value">42</span>
          <span class="stat-label">Binding contexts</span>
        </div>
        <div class="stat">
          <span class="stat-value">500+</span>
          <span class="stat-label">CSS properties</span>
        </div>
        <div class="stat">
          <span class="stat-value">60+</span>
          <span class="stat-label">CSS units</span>
        </div>
      </div>

      <!-- 1. CSS Property Validation -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> CSS Property Validation</h3>
        <p class="desc">Validates CSS property names across all template binding contexts.</p>
        <div class="example-table">
          <div class="ex-row ok">
            <code>[style.backgroundColor]="color"</code>
            <span class="tag ok-tag">✓ valid</span>
          </div>
          <div class="ex-row ok">
            <code>[style.background-color]="color"</code>
            <span class="tag ok-tag">✓ kebab-case</span>
          </div>
          <div class="ex-row ok">
            <code>[style.--my-color]="color"</code>
            <span class="tag ok-tag">✓ custom prop</span>
          </div>
          <div class="ex-row ok">
            <code>[style.-webkit-transform]="t"</code>
            <span class="tag ok-tag">✓ vendor prefix</span>
          </div>
          <div class="ex-row err">
            <code>[style.bgColor]="color"</code>
            <span class="tag err-tag">✗ 99001 "Did you mean 'backgroundColor'?"</span>
          </div>
          <div class="ex-row err">
            <code>[style]="&#123;bgColor: 'red'&#125;"</code>
            <span class="tag err-tag">✗ 99003</span>
          </div>
          <div class="ex-row err">
            <code>host: &#123;'[style.foo]': 'bar'&#125;</code>
            <span class="tag err-tag">✗ 99006</span>
          </div>
        </div>
        <p class="note">Accepts 500+ CSS properties. Fuzzy-match suggestions via Levenshtein distance ≤ 3.</p>
      </div>

      <!-- 2. CSS Unit Validation -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> CSS Unit Validation</h3>
        <p class="desc">Validates unit suffixes in <code>[style.X.unit]</code> bindings — 60+ units.</p>
        <div class="unit-grid">
          <div class="unit-cat">
            <span class="unit-cat-label">Absolute</span>
            <span class="unit-list">px cm mm Q in pc pt</span>
          </div>
          <div class="unit-cat">
            <span class="unit-cat-label">Relative</span>
            <span class="unit-list">em rem ex ch lh rlh</span>
          </div>
          <div class="unit-cat">
            <span class="unit-cat-label">Viewport</span>
            <span class="unit-list">vw vh vi vb vmin vmax svw svh dvw dvh</span>
          </div>
          <div class="unit-cat">
            <span class="unit-cat-label">Container</span>
            <span class="unit-list">cqw cqh cqi cqb cqmin cqmax</span>
          </div>
          <div class="unit-cat">
            <span class="unit-cat-label">Other</span>
            <span class="unit-list">% deg rad turn s ms Hz kHz dpi dpcm dppx fr</span>
          </div>
        </div>
        <div class="example-table">
          <div class="ex-row ok">
            <code>[style.width.px]="100"</code>
            <span class="tag ok-tag">✓</span>
          </div>
          <div class="ex-row err">
            <code>[style.width.invalid]="100"</code>
            <span class="tag err-tag">✗ 99002 "Unknown unit"</span>
          </div>
          <div class="ex-row warn">
            <code>[style.opacity.px]="1"</code>
            <span class="tag warn-tag">⚠ 99015 "opacity is unitless"</span>
          </div>
        </div>
      </div>

      <!-- 3. CSS Obsolete Property Detection -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> Obsolete CSS Property Detection</h3>
        <div class="obsolete-table">
          <div class="obs-row">
            <span class="obs-old">gridGap</span>
            <span class="obs-arrow">→</span>
            <span class="obs-new">gap</span>
          </div>
          <div class="obs-row">
            <span class="obs-old">gridColumnGap</span>
            <span class="obs-arrow">→</span>
            <span class="obs-new">columnGap</span>
          </div>
          <div class="obs-row">
            <span class="obs-old">boxPack</span>
            <span class="obs-arrow">→</span>
            <span class="obs-new">justifyContent</span>
          </div>
          <div class="obs-row">
            <span class="obs-old">boxAlign</span>
            <span class="obs-arrow">→</span>
            <span class="obs-new">alignItems</span>
          </div>
          <div class="obs-row">
            <span class="obs-old">pageBreakAfter</span>
            <span class="obs-arrow">→</span>
            <span class="obs-new">breakAfter</span>
          </div>
          <div class="obs-row">
            <span class="obs-old">wordWrap</span>
            <span class="obs-arrow">→</span>
            <span class="obs-new">overflowWrap</span>
          </div>
        </div>
        <p class="note">Codes: 99008 (template), 99009 (host), 99010 (object). Links to MDN docs.</p>
      </div>

      <!-- 4. CSS Conflict Detection -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> CSS Conflict Detection</h3>
        <p class="desc">Detects duplicates, cross-binding conflicts, and shorthand/longhand clashes.</p>
        <div class="example-table">
          <div class="ex-row err">
            <code>[style]="&#123;color: 'red', color: 'blue'&#125;"</code>
            <span class="tag err-tag">✗ 99004 Duplicate property</span>
          </div>
          <div class="ex-row err">
            <code>&lt;div [style.width]="w1" [style]=&#123;width: '100px'&#125;&gt;</code>
            <span class="tag err-tag">✗ 99005 Cross-binding conflict</span>
          </div>
          <div class="ex-row err">
            <code>&lt;div [style.width]="w1" [style.width]="w2"&gt;</code>
            <span class="tag err-tag">✗ 99020 Duplicate individual</span>
          </div>
          <div class="ex-row warn">
            <code>&lt;div [style.background]="bg" [style.backgroundColor]="c"&gt;</code>
            <span class="tag warn-tag">⚠ 99014 Shorthand override</span>
          </div>
        </div>
        <p class="note">Tracks 30+ shorthand → longhand mappings (background, border, margin, padding, flex, gap…).</p>
      </div>

      <!-- 5. ARIA Validation -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> ARIA Attribute & Role Validation</h3>
        <p class="desc">Validates 48 ARIA attributes, value types (boolean, tristate, token, etc.), and 79 roles.</p>
        <div class="example-table">
          <div class="ex-row ok">
            <code>[attr.aria-label]="text"</code>
            <span class="tag ok-tag">✓</span>
          </div>
          <div class="ex-row ok">
            <code>role="navigation"</code>
            <span class="tag ok-tag">✓</span>
          </div>
          <div class="ex-row err">
            <code>[attr.aria-foo]="val"</code>
            <span class="tag err-tag">✗ 99101 "Unknown ARIA attribute"</span>
          </div>
          <div class="ex-row err">
            <code>aria-checked="yes"</code>
            <span class="tag err-tag">✗ 99102 (Expected tristate: true/false/mixed)</span>
          </div>
          <div class="ex-row err">
            <code>role="invalidrole"</code>
            <span class="tag err-tag">✗ 99103 "Unknown ARIA role"</span>
          </div>
        </div>
      </div>

      <!-- 6. Event Validation -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> DOM Event & Modifier Validation</h3>
        <p class="desc">Validates 100+ DOM events, keyboard modifiers, and global event targets.</p>
        <div class="example-table">
          <div class="ex-row ok">
            <code>(click)="handler()"</code>
            <span class="tag ok-tag">✓</span>
          </div>
          <div class="ex-row ok">
            <code>(keydown.ctrl.s)="save()"</code>
            <span class="tag ok-tag">✓</span>
          </div>
          <div class="ex-row warn">
            <code>(invalidevent)="handler()"</code>
            <span class="tag warn-tag">⚠ 99201</span>
          </div>
          <div class="ex-row err">
            <code>(keydown.invalid)="handler()"</code>
            <span class="tag err-tag">✗ 99202 "Unknown modifier"</span>
          </div>
        </div>
        <div class="sub-section">
          <h4>Global Event Targets</h4>
          <p class="desc">
            Only <strong>3</strong> global targets are supported (compiler-verified):
            <code>window</code>, <code>document</code>, <code>body</code>.
          </p>
          <div class="example-table">
            <div class="ex-row ok">
              <code>&#64;HostListener('window:resize')</code>
              <span class="tag ok-tag">✓</span>
            </div>
            <div class="ex-row ok">
              <code>&#64;HostListener('document:click')</code>
              <span class="tag ok-tag">✓</span>
            </div>
            <div class="ex-row err">
              <code>&#64;HostListener('container:click')</code>
              <span class="tag err-tag">✗ 99504</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 7. Host Binding Syntax -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> Host Binding Syntax Validation</h3>
        <p class="desc">Detects missing brackets/parentheses in component host metadata — a very common mistake.</p>
        <div class="example-table">
          <div class="ex-row err">
            <code>host: &#123;'click': 'onClick()'&#125;</code>
            <span class="tag err-tag">✗ 99408 "Missing ()" — static attribute, not event!</span>
          </div>
          <div class="ex-row err">
            <code>host: &#123;'disabled': 'isDisabled'&#125;</code>
            <span class="tag err-tag">✗ 99409 "Missing []" — static attribute!</span>
          </div>
          <div class="ex-row ok">
            <code>host: &#123;'(click)': 'onClick()'&#125;</code>
            <span class="tag ok-tag">✓ Event listener</span>
          </div>
          <div class="ex-row ok">
            <code>host: &#123;'[disabled]': 'isDisabled'&#125;</code>
            <span class="tag ok-tag">✓ Property binding</span>
          </div>
        </div>
        <div class="warning-box">
          Without brackets, <code>host: &#123;'disabled': 'isDisabled'&#125;</code> creates a
          <strong>static attribute</strong> <code>disabled="isDisabled"</code> —
          the literal string, NOT a binding!
        </div>
      </div>

      <!-- 8. Completions & Quick Fixes -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> Completions & Quick Fixes</h3>
        <div class="completion-demo">
          <div class="completion-block">
            <span class="completion-trigger">[style.b<span class="cursor">|</span>]</span>
            <div class="completion-list">
              <div class="completion-item">backgroundColor</div>
              <div class="completion-item">backgroundImage</div>
              <div class="completion-item">border</div>
              <div class="completion-item">borderRadius</div>
              <div class="completion-item">boxShadow</div>
            </div>
          </div>
          <div class="completion-block">
            <span class="completion-trigger">[style.width.<span class="cursor">|</span>]</span>
            <div class="completion-list">
              <div class="completion-item">px</div>
              <div class="completion-item">em</div>
              <div class="completion-item">rem</div>
              <div class="completion-item">%</div>
              <div class="completion-item">vw / vh</div>
            </div>
          </div>
        </div>
        <p class="desc">Quick fixes include: fix typo, fix unit, remove unit (unitless), expand shorthand, convert between object and individual bindings, replace obsolete property.</p>
      </div>

      <!-- Scope Limitations -->
      <div class="example-section dim">
        <h3>Scope Limitations</h3>
        <p class="desc">Features intentionally <strong>excluded</strong>:</p>
        <ul class="limit-list">
          <li><strong>Class name validation</strong> — too noisy (global styles, SCSS, CDN, dynamic classes)</li>
          <li><strong>data-* attributes</strong> — user-defined by W3C spec</li>
          <li><strong>General template errors</strong> — already handled by Angular compiler (8001–8118)</li>
          <li><strong>TypeScript type errors</strong> — already comprehensive via TypeScript LSP</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .demo-container { max-width: 900px; margin: 0 auto; padding: 32px 32px 64px; }
    .demo-header { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; flex-wrap: wrap; }
    .demo-header h2 { font-size: 28px; font-weight: 700; color: var(--adev-text); margin: 0; }
    .demo-description { color: var(--adev-text-secondary); font-size: 15px; line-height: 1.7; margin-bottom: 24px; }
    .badge { display: inline-block; padding: 3px 10px; border-radius: 6px; font-size: 11px; font-weight: 600; font-family: 'JetBrains Mono', monospace; }
    .css-badge { background: rgba(168, 85, 247, 0.12); color: #a855f7; border: 1px solid rgba(168, 85, 247, 0.25); }
    .feat-badge {
      display: inline-block; font-size: 9px; font-weight: 700; letter-spacing: 0.5px;
      background: linear-gradient(135deg, var(--adev-gradient-start), var(--adev-gradient-end));
      color: #0f0f11; padding: 2px 6px; border-radius: 4px; vertical-align: middle; margin-right: 4px;
    }
    .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
    .stat {
      background: var(--adev-surface); border: 1px solid var(--adev-border);
      border-radius: 8px; padding: 16px; text-align: center;
    }
    .stat-value { display: block; font-size: 28px; font-weight: 700; color: var(--adev-primary); }
    .stat-label { display: block; font-size: 12px; color: var(--adev-text-tertiary); margin-top: 4px; }
    code {
      background: var(--adev-code-bg); border: 1px solid var(--adev-code-border);
      padding: 2px 6px; border-radius: 4px; font-size: 12px; color: var(--adev-primary);
      font-family: 'JetBrains Mono', monospace;
    }
    .example-section {
      background: var(--adev-surface); border: 1px solid var(--adev-border);
      border-left: 3px solid var(--adev-info); padding: 20px; margin: 20px 0; border-radius: 8px;
    }
    .example-section.dim { border-left-color: var(--adev-text-tertiary); opacity: 0.8; }
    h3 { color: var(--adev-text); margin-top: 0; font-size: 16px; font-weight: 600; }
    h4 { color: var(--adev-text); font-size: 14px; font-weight: 600; margin: 16px 0 8px; }
    .desc { color: var(--adev-text-secondary); font-size: 14px; margin: 8px 0 12px; }
    .note {
      background: rgba(74, 222, 128, 0.08); border-left: 3px solid var(--adev-success);
      padding: 10px 14px; border-radius: 6px; font-size: 13px; color: var(--adev-text-secondary); margin-top: 12px;
    }
    .warning-box {
      background: rgba(248, 113, 113, 0.08); border-left: 3px solid var(--adev-error);
      padding: 12px 16px; border-radius: 6px; margin: 12px 0;
      font-size: 13px; line-height: 1.6; color: var(--adev-text-secondary);
    }
    .example-table { display: flex; flex-direction: column; gap: 6px; }
    .ex-row {
      display: flex; align-items: center; justify-content: space-between; gap: 12px;
      padding: 8px 12px; border-radius: 6px; font-size: 13px;
    }
    .ex-row.ok { background: rgba(74, 222, 128, 0.06); }
    .ex-row.err { background: rgba(248, 113, 113, 0.06); }
    .ex-row.warn { background: rgba(251, 191, 36, 0.06); }
    .tag { font-size: 11px; font-weight: 600; white-space: nowrap; }
    .ok-tag { color: var(--adev-success); }
    .err-tag { color: var(--adev-error); }
    .warn-tag { color: var(--adev-warning); }
    .unit-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 8px; margin: 12px 0; }
    .unit-cat { background: var(--adev-surface-2); padding: 10px 12px; border-radius: 6px; }
    .unit-cat-label { display: block; font-size: 11px; font-weight: 700; color: var(--adev-text-tertiary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
    .unit-list { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--adev-primary); word-spacing: 6px; }
    .obsolete-table { display: flex; flex-direction: column; gap: 6px; }
    .obs-row {
      display: flex; align-items: center; gap: 12px;
      background: var(--adev-surface-2); padding: 8px 12px; border-radius: 6px; font-size: 13px;
    }
    .obs-old { color: var(--adev-error); text-decoration: line-through; font-family: 'JetBrains Mono', monospace; min-width: 140px; }
    .obs-arrow { color: var(--adev-text-tertiary); }
    .obs-new { color: var(--adev-success); font-family: 'JetBrains Mono', monospace; font-weight: 600; }
    .sub-section { margin-top: 16px; padding-top: 12px; border-top: 1px solid var(--adev-border-subtle); }
    .completion-demo { display: flex; gap: 16px; flex-wrap: wrap; margin: 12px 0; }
    .completion-block { background: var(--adev-code-bg); border: 1px solid var(--adev-code-border); border-radius: 8px; padding: 12px; min-width: 200px; flex: 1; }
    .completion-trigger { font-family: 'JetBrains Mono', monospace; font-size: 14px; color: var(--adev-code-text); display: block; margin-bottom: 8px; }
    .cursor { display: inline-block; width: 2px; height: 16px; background: var(--adev-primary); animation: blink 1s infinite; vertical-align: text-bottom; }
    @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
    .completion-list { background: var(--adev-surface-2); border: 1px solid var(--adev-border); border-radius: 4px; overflow: hidden; }
    .completion-item { padding: 4px 10px; font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--adev-text); }
    .completion-item:first-child { background: rgba(240, 160, 200, 0.1); color: var(--adev-primary); }
    .limit-list { margin: 8px 0; padding-left: 20px; }
    .limit-list li { color: var(--adev-text-secondary); font-size: 13px; line-height: 1.8; }
  `],
})
export class CssIntellisenseDemoComponent {}
