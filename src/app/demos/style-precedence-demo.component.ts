import {Component, Directive, HostBinding, Input, signal} from '@angular/core';

// === Directive 1: Sets color to RED ===
@Directive({
  selector: '[dirRed]',
  host: {'[style.color]': '"red"', '[style.font-weight]': '"bold"'},
})
export class DirRedDirective {}

// === Directive 2: Sets color to BLUE ===
@Directive({
  selector: '[dirBlue]',
  host: {'[style.color]': '"blue"', '[style.font-style]': '"italic"'},
})
export class DirBlueDirective {}

// === Directive using @HostBinding ===
@Directive({
  selector: '[dirGreen]',
})
export class DirGreenDirective {
  @HostBinding('style.color') color = 'green';
  @HostBinding('style.text-decoration') decoration = 'underline';
}

// === Component with host styles ===
@Component({
  selector: 'styled-box',
  host: {
    '[style.color]': '"purple"',
    '[style.border]': '"2px solid purple"',
    '[style.padding]': '"8px 12px"',
    '[style.display]': '"inline-block"',
    '[style.border-radius]': '"4px"',
  },
  template: `<ng-content />`,
})
export class StyledBoxComponent {}

@Component({
  selector: 'app-style-precedence-demo',
  imports: [DirRedDirective, DirBlueDirective, DirGreenDirective, StyledBoxComponent],
  template: `
    <div class="demo-container">
      <div class="demo-header">
        <h2>Style Binding Precedence</h2>
        <span class="badge prec-badge">Standalone</span>
      </div>
      <p class="demo-description">
        Angular resolves conflicting style bindings using a <strong>priority linked list</strong>.
        Template bindings always beat host bindings, but the order among host bindings depends
        on how directives are registered &mdash; which differs between
        <strong>standalone</strong> and <strong>module-based</strong> components.
        CSS IntelliSense detects these conflicts and warns about them.
      </p>

      <!-- Priority Table -->
      <div class="example-section">
        <h3>Universal Priority Order</h3>
        <p class="desc">This is the style binding resolution order used by Angular's runtime (<code>insertTStylingBinding</code>):</p>
        <div class="priority-table">
          <div class="prio-header"><span>#</span><span>Source</span><span>Instruction</span><span>Priority</span></div>
          <div class="prio-row highest"><span>1</span><span>Template</span><span><code>[style.prop]</code> individual</span><span class="prio-tag high-tag">HIGHEST</span></div>
          <div class="prio-row high"><span>2</span><span>Template</span><span><code>[style]="&#123;...&#125;"</code> map</span><span class="prio-tag high-tag">High</span></div>
          <div class="prio-row mid"><span>3</span><span>Last directive host</span><span><code>ɵɵstyleProp</code></span><span class="prio-tag mid-tag">Medium</span></div>
          <div class="prio-row mid"><span>4</span><span>Last directive host</span><span><code>ɵɵstyleMap</code></span><span class="prio-tag mid-tag">Medium</span></div>
          <div class="prio-row mid"><span>5</span><span>Earlier directive host</span><span><code>ɵɵstyleProp</code></span><span class="prio-tag mid-tag">Medium</span></div>
          <div class="prio-row mid"><span>6</span><span>Earlier directive host</span><span><code>ɵɵstyleMap</code></span><span class="prio-tag mid-tag">Medium</span></div>
          <div class="prio-row low"><span>7</span><span>Component host</span><span><code>ɵɵstyleProp</code></span><span class="prio-tag low-tag">Low</span></div>
          <div class="prio-row lowest"><span>8</span><span>Component host</span><span><code>ɵɵstyleMap</code></span><span class="prio-tag low-tag">LOWEST</span></div>
        </div>
      </div>

      <!-- Standalone vs Module Comparison -->
      <div class="example-section">
        <h3><span class="feat-badge">KEY</span> Standalone vs Module: Who is "Last Directive"?</h3>
        <p class="desc">The priority order above is the same for both. But <strong>who counts as "last directive"</strong> differs:</p>
        <div class="comparison-grid">
          <div class="compare-card module-card">
            <div class="compare-header">
              <span class="compare-icon">&#128230;</span>
              <strong>Module-based (<code>standalone: false</code>)</strong>
            </div>
            <div class="compare-body">
              <p><strong>Last declared in <code>declarations[]</code> wins.</strong></p>
              <div class="code-block">
                <pre>declarations: [
  DirRed,    // Lower priority
  DirBlue,   // Higher priority (WINS)
  MyCmp,     // Component = LOWEST
]</pre>
              </div>
              <p class="result">Result: <span class="color-blue">DirBlue wins</span> because it's declared last.</p>
              <p class="note">Template order doesn't matter. Only <code>declarations[]</code> array order.</p>
            </div>
          </div>
          <div class="compare-card standalone-card">
            <div class="compare-header">
              <span class="compare-icon">&#9889;</span>
              <strong>Standalone (<code>standalone: true</code>)</strong>
            </div>
            <div class="compare-body">
              <p><strong>First directive in template order wins.</strong></p>
              <div class="code-block">
                <pre>&lt;!-- DirRed first in template --&gt;
&lt;div dirRed dirBlue&gt;Text&lt;/div&gt;</pre>
              </div>
              <p class="result">Result: <span class="color-red">DirRed wins</span> because it appears first in the template.</p>
              <p class="note">Directive order comes from <code>Set</code> iteration in scope resolution, not <code>imports[]</code>.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Live Demo: Directive vs Directive -->
      <div class="example-section">
        <h3><span class="feat-badge">LIVE</span> Test 1: Two Directives Competing for <code>color</code></h3>
        <p class="desc">Both <code>DirRed</code> and <code>DirBlue</code> set <code>[style.color]</code> via host bindings. Which wins?</p>
        <div class="live-grid">
          <div class="live-box">
            <span class="live-label">dirRed first, dirBlue second</span>
            <div class="live-result" dirRed dirBlue>This text shows the winning color</div>
            <span class="live-explain">Standalone: DirRed wins (first in template)</span>
          </div>
          <div class="live-box">
            <span class="live-label">dirBlue first, dirRed second</span>
            <div class="live-result" dirBlue dirRed>This text shows the winning color</div>
            <span class="live-explain">Standalone: DirBlue wins (first in template)</span>
          </div>
        </div>
        <p class="note">In module-based, both would show the color of whichever directive is declared LAST in <code>declarations[]</code>.</p>
      </div>

      <!-- Live Demo: Template vs Directive Host -->
      <div class="example-section">
        <h3><span class="feat-badge">LIVE</span> Test 2: Template Binding vs Directive Host</h3>
        <p class="desc">Template <code>[style.color]</code> always beats directive host <code>[style.color]</code>:</p>
        <div class="live-grid">
          <div class="live-box">
            <span class="live-label">Template [style.color]="'orange'" + dirRed + dirBlue</span>
            <div class="live-result" [style.color]="'orange'" dirRed dirBlue>Template always wins: orange</div>
            <span class="live-explain">Template [style.prop] = HIGHEST priority (both standalone & module)</span>
          </div>
          <div class="live-box">
            <span class="live-label">Template [style]="&#123;color: 'orange'&#125;" + dirRed + dirBlue</span>
            <div class="live-result" [style]="templateStyleMap()" dirRed dirBlue>Style map vs directives: check the color!</div>
            <span class="live-explain">Standalone anomaly: Directive host can beat template [style] map!</span>
          </div>
        </div>
        <div class="anomaly-box">
          <strong>&#9888;&#65039; Standalone Anomaly:</strong> In module-based, <code>[style]="&#123;...&#125;"</code> (template map) beats directive host.
          In standalone, directive host bindings can beat the template style map. This is because the linked list insertion
          order differs &mdash; standalone uses <code>Set</code>-based scope resolution.
        </div>
      </div>

      <!-- Live Demo: Component Host vs Directive Host -->
      <div class="example-section">
        <h3><span class="feat-badge">LIVE</span> Test 3: Component Host vs Directive Host</h3>
        <p class="desc"><code>StyledBoxComponent</code> has host <code>[style.color]="purple"</code>. Directives override it:</p>
        <div class="live-grid">
          <div class="live-box">
            <span class="live-label">styled-box alone (component host = purple)</span>
            <styled-box>Component host: purple</styled-box>
            <span class="live-explain">Component host bindings = LOWEST among all host bindings</span>
          </div>
          <div class="live-box">
            <span class="live-label">styled-box + dirRed</span>
            <styled-box dirRed>Directive beats component host</styled-box>
            <span class="live-explain">Directive host ALWAYS overrides component host</span>
          </div>
          <div class="live-box">
            <span class="live-label">styled-box + dirGreen (&#64;HostBinding)</span>
            <styled-box dirGreen>&#64;HostBinding also beats component host</styled-box>
            <span class="live-explain">&#64;HostBinding works identically to host metadata</span>
          </div>
        </div>
      </div>

      <!-- Live Demo: @HostBinding vs host metadata -->
      <div class="example-section">
        <h3><span class="feat-badge">LIVE</span> Test 4: &#64;HostBinding vs host: &#123;&#125; Metadata</h3>
        <p class="desc">Both are equivalent &mdash; they produce the same <code>ɵɵstyleProp</code> instructions:</p>
        <div class="live-grid">
          <div class="live-box">
            <span class="live-label">dirRed (host metadata) + dirGreen (&#64;HostBinding)</span>
            <div class="live-result" dirRed dirGreen>First in template wins for standalone</div>
            <span class="live-explain">dirRed is first &rarr; red wins in standalone</span>
          </div>
          <div class="live-box">
            <span class="live-label">dirGreen (&#64;HostBinding) + dirRed (host metadata)</span>
            <div class="live-result" dirGreen dirRed>First in template wins for standalone</div>
            <span class="live-explain">dirGreen is first &rarr; green wins in standalone</span>
          </div>
        </div>
      </div>

      <!-- Live Demo: Individual prop vs Style Map -->
      <div class="example-section">
        <h3><span class="feat-badge">LIVE</span> Test 5: [style.color] vs [style]="&#123;color: ...&#125;"</h3>
        <p class="desc">Individual property binding ALWAYS wins over style map, regardless of order:</p>
        <div class="live-grid">
          <div class="live-box">
            <span class="live-label">Both set color, individual = 'crimson', map = &#123;color: 'teal'&#125;</span>
            <div class="live-result" [style.color]="'crimson'" [style]="{'color': 'teal', 'font-size': '18px'}">Individual property always wins: crimson</div>
            <span class="live-explain">[style.color] (individual) beats [style]="&#123;color&#125;" (map) &mdash; ALWAYS</span>
          </div>
          <div class="live-box">
            <span class="live-label">Map also sets font-size (no conflict)</span>
            <div class="live-result" [style]="{'color': 'teal', 'font-size': '18px'}">Non-conflicting map properties still apply: font-size 18px</div>
            <span class="live-explain">Non-conflicting properties from the map are still applied</span>
          </div>
        </div>
      </div>

      <!-- Interactive Demo -->
      <div class="example-section">
        <h3><span class="feat-badge">INTERACTIVE</span> Try It: Who Wins?</h3>
        <p class="desc">Toggle sources on/off to see which style wins:</p>
        <div class="toggle-grid">
          <label class="toggle-item">
            <input type="checkbox" [checked]="enableTemplateProp()" (change)="enableTemplateProp.set(!enableTemplateProp())">
            <span class="toggle-label">[style.color]="'darkorange'" <span class="prio-tag high-tag">P1</span></span>
          </label>
          <label class="toggle-item">
            <input type="checkbox" [checked]="enableTemplateMap()" (change)="enableTemplateMap.set(!enableTemplateMap())">
            <span class="toggle-label">[style]="&#123;color: 'teal'&#125;" <span class="prio-tag high-tag">P2</span></span>
          </label>
          <label class="toggle-item">
            <input type="checkbox" [checked]="enableDirRed()" (change)="enableDirRed.set(!enableDirRed())">
            <span class="toggle-label">DirRed host (red) <span class="prio-tag mid-tag">P3-6</span></span>
          </label>
          <label class="toggle-item">
            <input type="checkbox" [checked]="enableDirBlue()" (change)="enableDirBlue.set(!enableDirBlue())">
            <span class="toggle-label">DirBlue host (blue) <span class="prio-tag mid-tag">P3-6</span></span>
          </label>
        </div>
        <div class="interactive-result">
          <div
            class="interactive-text"
            [style.color]="enableTemplateProp() ? 'darkorange' : null"
            [style]="enableTemplateMap() ? interactiveStyleMap() : null"
          >
            @if (enableDirRed() && enableDirBlue()) {
              <span [style.color]="enableTemplateProp() ? 'darkorange' : null" [style]="enableTemplateMap() ? interactiveStyleMap() : null" dirRed dirBlue>
                The winning color shows here!
              </span>
            } @else if (enableDirRed()) {
              <span [style.color]="enableTemplateProp() ? 'darkorange' : null" [style]="enableTemplateMap() ? interactiveStyleMap() : null" dirRed>
                The winning color shows here!
              </span>
            } @else if (enableDirBlue()) {
              <span [style.color]="enableTemplateProp() ? 'darkorange' : null" [style]="enableTemplateMap() ? interactiveStyleMap() : null" dirBlue>
                The winning color shows here!
              </span>
            } @else {
              <span [style.color]="enableTemplateProp() ? 'darkorange' : null" [style]="enableTemplateMap() ? interactiveStyleMap() : null">
                The winning color shows here!
              </span>
            }
          </div>
          <div class="active-sources">
            Active sources:
            @if (enableTemplateProp()) { <span class="src-tag">[style.color]</span> }
            @if (enableTemplateMap()) { <span class="src-tag">[style] map</span> }
            @if (enableDirRed()) { <span class="src-tag">DirRed</span> }
            @if (enableDirBlue()) { <span class="src-tag">DirBlue</span> }
            @if (!enableTemplateProp() && !enableTemplateMap() && !enableDirRed() && !enableDirBlue()) {
              <span class="src-tag none">None (inherited)</span>
            }
          </div>
        </div>
      </div>

      <!-- How It Works -->
      <div class="example-section">
        <h3>How Angular Resolves Style Conflicts</h3>
        <p class="desc">The runtime uses a <strong>doubly-linked list</strong> per property per element (in <code>TNode.residualStyles</code>).
        Higher priority bindings are later in the list:</p>
        <div class="code-block dark">
          <pre>Execution Order:            Priority Order (linked list):
─────────────────           ──────────────────────────────
Template:                   Component host:
  ɵɵstyleMap(&#123;color&#125;) #001    ɵɵstyleMap(&#123;color&#125;) #003  ← LOWEST
  ɵɵstyleProp(color) #002    ɵɵstyleProp(color) #004
Component:                  Directive1 host:
  ɵɵstyleMap(&#123;color&#125;) #003    ɵɵstyleMap(&#123;color&#125;) #005
  ɵɵstyleProp(color) #004    ɵɵstyleProp(color) #006
Directive1:                 Directive2 host:
  ɵɵstyleMap(&#123;color&#125;) #005    ɵɵstyleMap(&#123;color&#125;) #007
  ɵɵstyleProp(color) #006    ɵɵstyleProp(color) #008
Directive2:                 Template:
  ɵɵstyleMap(&#123;color&#125;) #007    ɵɵstyleMap(&#123;color&#125;) #001
  ɵɵstyleProp(color) #008    ɵɵstyleProp(color) #002  ← HIGHEST</pre>
        </div>
        <p class="note">
          <strong>Key insight:</strong> Host bindings prepend to the list head (lower priority).
          Template bindings append to the tail (higher priority).
          The <code>directiveRegistry</code> order (which directive is "Directive1" vs "Directive2") differs
          between standalone (<code>Set</code> iteration) and module (<code>declarations[]</code> order).
        </p>
      </div>

      <!-- What CSS IntelliSense Does -->
      <div class="example-section">
        <h3>What CSS IntelliSense Detects</h3>
        <p class="desc">The Language Service uses its own precedence model to flag conflicts:</p>
        <div class="detect-grid">
          <div class="detect-card">
            <span class="detect-code">99005</span>
            <strong>CONFLICTING_STYLE_BINDING</strong>
            <p>Same CSS property set via multiple binding types (e.g., template + directive host)</p>
          </div>
          <div class="detect-card">
            <span class="detect-code">99020</span>
            <strong>DUPLICATE_STYLE_BINDING</strong>
            <p>Same property set multiple times via same binding type (e.g., two [style.color])</p>
          </div>
          <div class="detect-card">
            <span class="detect-code">99014</span>
            <strong>SHORTHAND_OVERRIDE</strong>
            <p>Shorthand (e.g., [style.background]) overrides longhand (e.g., [style.background-color])</p>
          </div>
          <div class="detect-card">
            <span class="detect-code">99411/99412</span>
            <strong>SHADOWS_INPUT</strong>
            <p>[class] or [style] binding shadows a directive &#64;Input('class') or &#64;Input('style')</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    .demo-container { max-width: 960px; margin: 0 auto; padding: 24px; }
    .demo-header { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; flex-wrap: wrap; }
    .demo-header h2 { font-size: 26px; font-weight: 700; margin: 0; }
    .badge { padding: 4px 10px; border-radius: 6px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
    .prec-badge { background: rgba(251, 146, 60, 0.12); color: #fb923c; border: 1px solid rgba(251, 146, 60, 0.25); }
    .demo-description { color: var(--adev-text-secondary, #94a3b8); font-size: 14px; line-height: 1.7; margin-bottom: 20px; }
    .example-section { background: var(--adev-surface, #1e293b); border: 1px solid var(--adev-border, #334155); border-radius: 12px; padding: 20px; margin-bottom: 16px; }
    .example-section h3 { font-size: 16px; font-weight: 600; margin: 0 0 8px 0; display: flex; align-items: center; gap: 8px; }
    .desc { color: var(--adev-text-secondary, #94a3b8); font-size: 13px; margin: 0 0 12px 0; line-height: 1.6; }
    .note { font-size: 12px; color: var(--adev-text-secondary, #94a3b8); margin-top: 10px; line-height: 1.6; }
    .feat-badge { background: rgba(240, 160, 200, 0.15); color: #f0a0c8; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: 700; }
    code { background: rgba(240, 160, 200, 0.08); color: #f0a0c8; padding: 1px 5px; border-radius: 3px; font-family: 'JetBrains Mono', monospace; font-size: 12px; }

    /* Priority Table */
    .priority-table { border: 1px solid var(--adev-border, #334155); border-radius: 8px; overflow: hidden; font-size: 13px; }
    .prio-header { display: grid; grid-template-columns: 36px 1fr 1.5fr 80px; padding: 8px 12px; background: var(--adev-surface-2, #0f172a); font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
    .prio-row { display: grid; grid-template-columns: 36px 1fr 1.5fr 80px; padding: 6px 12px; border-top: 1px solid var(--adev-border, #334155); align-items: center; }
    .prio-row.highest { background: rgba(34, 197, 94, 0.06); }
    .prio-row.high { background: rgba(34, 197, 94, 0.03); }
    .prio-row.mid { background: rgba(251, 191, 36, 0.03); }
    .prio-row.low { background: rgba(239, 68, 68, 0.03); }
    .prio-row.lowest { background: rgba(239, 68, 68, 0.06); }
    .prio-tag { display: inline-block; padding: 2px 6px; border-radius: 3px; font-size: 10px; font-weight: 700; text-transform: uppercase; }
    .high-tag { background: rgba(34, 197, 94, 0.15); color: #22c55e; }
    .mid-tag { background: rgba(251, 191, 36, 0.15); color: #fbbf24; }
    .low-tag { background: rgba(239, 68, 68, 0.15); color: #ef4444; }

    /* Comparison Grid */
    .comparison-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .compare-card { border-radius: 10px; padding: 16px; }
    .compare-header { display: flex; align-items: center; gap: 8px; margin-bottom: 10px; font-size: 14px; }
    .compare-icon { font-size: 20px; }
    .compare-body p { font-size: 13px; line-height: 1.6; margin: 6px 0; }
    .module-card { background: rgba(168, 85, 247, 0.06); border: 1px solid rgba(168, 85, 247, 0.2); }
    .standalone-card { background: rgba(251, 146, 60, 0.06); border: 1px solid rgba(251, 146, 60, 0.2); }
    .result { font-weight: 600; }
    .color-red { color: #ef4444; }
    .color-blue { color: #3b82f6; }

    /* Code Block */
    .code-block { background: var(--adev-code-bg, #0f172a); border: 1px solid var(--adev-code-border, #1e293b); border-radius: 6px; padding: 12px; overflow-x: auto; }
    .code-block pre { margin: 0; font-family: 'JetBrains Mono', monospace; font-size: 12px; line-height: 1.6; white-space: pre; }
    .code-block.dark { background: #0a0f1e; }

    /* Live Demo */
    .live-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 12px; }
    .live-box { background: var(--adev-surface-2, #0f172a); border: 1px solid var(--adev-border, #334155); border-radius: 8px; padding: 12px; }
    .live-label { display: block; font-size: 11px; color: var(--adev-text-secondary, #94a3b8); margin-bottom: 8px; font-family: 'JetBrains Mono', monospace; }
    .live-result { padding: 10px; font-size: 16px; font-weight: 600; background: rgba(255,255,255,0.03); border-radius: 6px; margin-bottom: 6px; }
    .live-explain { font-size: 11px; color: var(--adev-text-secondary, #94a3b8); font-style: italic; }

    /* Anomaly Box */
    .anomaly-box { background: rgba(251, 146, 60, 0.08); border: 1px solid rgba(251, 146, 60, 0.3); border-radius: 8px; padding: 12px 16px; margin-top: 12px; font-size: 13px; line-height: 1.6; }

    /* Toggle Grid */
    .toggle-grid { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 16px; }
    .toggle-item { display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 13px; padding: 6px 10px; background: var(--adev-surface-2, #0f172a); border: 1px solid var(--adev-border, #334155); border-radius: 6px; }
    .toggle-item input { cursor: pointer; accent-color: #f0a0c8; }
    .toggle-label { display: flex; align-items: center; gap: 6px; }
    .interactive-result { background: var(--adev-surface-2, #0f172a); border: 1px solid var(--adev-border, #334155); border-radius: 8px; padding: 16px; }
    .interactive-text { font-size: 24px; font-weight: 700; margin-bottom: 10px; min-height: 40px; }
    .active-sources { font-size: 12px; color: var(--adev-text-secondary, #94a3b8); display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
    .src-tag { background: rgba(240, 160, 200, 0.12); color: #f0a0c8; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; }
    .src-tag.none { background: rgba(148, 163, 184, 0.12); color: #94a3b8; }

    /* Detect Grid */
    .detect-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; }
    .detect-card { background: var(--adev-surface-2, #0f172a); border: 1px solid var(--adev-border, #334155); border-radius: 8px; padding: 12px; }
    .detect-code { display: inline-block; background: rgba(240, 160, 200, 0.12); color: #f0a0c8; padding: 2px 8px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; margin-bottom: 4px; }
    .detect-card strong { display: block; font-size: 12px; margin-bottom: 4px; font-family: 'JetBrains Mono', monospace; }
    .detect-card p { font-size: 12px; color: var(--adev-text-secondary, #94a3b8); margin: 0; line-height: 1.5; }

    @media (max-width: 700px) {
      .comparison-grid { grid-template-columns: 1fr; }
      .live-grid { grid-template-columns: 1fr; }
    }
  `,
})
export class StylePrecedenceDemoComponent {
  enableTemplateProp = signal(true);
  enableTemplateMap = signal(false);
  enableDirRed = signal(true);
  enableDirBlue = signal(true);

  templateStyleMap = signal({'color': 'orange'});
  interactiveStyleMap = signal({'color': 'teal'});
}
