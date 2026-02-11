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

// === Directive setting backgroundColor via host ===
@Directive({
  selector: '[dirPurpleBg]',
  host: {'[style.backgroundColor]': '"rgb(230, 200, 255)"', '[style.color]': '"rgb(100, 0, 200)"'},
})
export class DirPurpleBgDirective {}

// === HostDirective: applied via hostDirectives, NOT template ===
@Directive({selector: '[colorHostDir]', standalone: true})
export class ColorHostDirective {
  @HostBinding('style.backgroundColor') color = 'rgb(255, 200, 200)'; // Light red
}

// === Directive WITH a hostDirective ===
@Directive({
  selector: '[dirWithHost]',
  hostDirectives: [ColorHostDirective],
})
export class DirWithHostDirective {
  @HostBinding('style.backgroundColor') ownColor = 'rgb(200, 255, 200)'; // Light green
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

// === Wrapper: imports Red FIRST, Blue SECOND → Blue wins (last in imports) ===
@Component({
  selector: 'red-first-wrapper',
  imports: [DirRedDirective, DirBlueDirective],
  template: `<div dirRed dirBlue class="live-result"><ng-content /></div>`,
  styles: `.live-result { padding: 10px; font-size: 16px; font-weight: 600; background: rgba(255,255,255,0.03); border-radius: 6px; margin-bottom: 6px; }`,
})
export class RedFirstWrapperComponent {}

// === Wrapper: imports Blue FIRST, Red SECOND → Red wins (last in imports) ===
@Component({
  selector: 'blue-first-wrapper',
  imports: [DirBlueDirective, DirRedDirective],
  template: `<div dirRed dirBlue class="live-result"><ng-content /></div>`,
  styles: `.live-result { padding: 10px; font-size: 16px; font-weight: 600; background: rgba(255,255,255,0.03); border-radius: 6px; margin-bottom: 6px; }`,
})
export class BlueFirstWrapperComponent {}

// === Anomaly Test: [style] map vs directive host ===
@Component({
  selector: 'style-map-vs-host',
  imports: [DirPurpleBgDirective],
  template: `
    <div class="anomaly-grid">
      <div class="anomaly-item">
        <span class="anomaly-label">[style] map only (no directive)</span>
        <div class="anomaly-result" [style]="{'backgroundColor': 'rgb(0, 200, 200)', 'color': 'rgb(200, 0, 200)'}">Cyan bg, Magenta text</div>
      </div>
      <div class="anomaly-item">
        <span class="anomaly-label">dirPurpleBg + [style] map</span>
        <div class="anomaly-result" dirPurpleBg [style]="{'backgroundColor': 'rgb(0, 200, 200)', 'color': 'rgb(200, 0, 200)'}">
          Who wins? Check background!
        </div>
        <span class="anomaly-expected">Module: Cyan wins. Standalone: ???</span>
      </div>
      <div class="anomaly-item">
        <span class="anomaly-label">dirPurpleBg + [style.backgroundColor] individual</span>
        <div class="anomaly-result" dirPurpleBg [style.backgroundColor]="'rgb(0, 200, 200)'" [style.color]="'rgb(200, 0, 200)'">
          Individual always wins!
        </div>
        <span class="anomaly-expected">Both: Cyan wins (individual always highest)</span>
      </div>
    </div>
  `,
  styles: `
    .anomaly-grid { display: grid; gap: 10px; }
    .anomaly-item { background: var(--adev-surface-2, #0f172a); border: 1px solid var(--adev-border, #334155); border-radius: 8px; padding: 12px; }
    .anomaly-label { display: block; font-size: 11px; color: var(--adev-text-secondary, #94a3b8); margin-bottom: 8px; font-family: 'JetBrains Mono', monospace; }
    .anomaly-result { padding: 12px; font-size: 15px; font-weight: 600; border-radius: 6px; margin-bottom: 4px; }
    .anomaly-expected { font-size: 11px; color: var(--adev-text-secondary, #94a3b8); font-style: italic; }
  `,
})
export class StyleMapVsHostComponent {}

// === Anomaly Test: hostDirective vs directive host ===
@Component({
  selector: 'host-directive-test',
  imports: [DirWithHostDirective],
  template: `
    <div class="anomaly-grid">
      <div class="anomaly-item">
        <span class="anomaly-label">dirWithHost — directive sets green bg, its hostDirective sets red bg</span>
        <div class="anomaly-result" dirWithHost style="padding: 12px; color: black; font-weight: 600;">
          Which background wins? Green (directive) or Red (hostDirective)?
        </div>
        <span class="anomaly-expected">Expected: Green (directive beats its own hostDirective)</span>
      </div>
    </div>
  `,
  styles: `
    .anomaly-grid { display: grid; gap: 10px; }
    .anomaly-item { background: var(--adev-surface-2, #0f172a); border: 1px solid var(--adev-border, #334155); border-radius: 8px; padding: 12px; }
    .anomaly-label { display: block; font-size: 11px; color: var(--adev-text-secondary, #94a3b8); margin-bottom: 8px; font-family: 'JetBrains Mono', monospace; }
    .anomaly-result { padding: 12px; font-size: 15px; font-weight: 600; border-radius: 6px; margin-bottom: 4px; }
    .anomaly-expected { font-size: 11px; color: var(--adev-text-secondary, #94a3b8); font-style: italic; }
  `,
})
export class HostDirectiveTestComponent {}

@Component({
  selector: 'app-style-precedence-demo',
  imports: [DirRedDirective, DirBlueDirective, DirGreenDirective, DirPurpleBgDirective, StyledBoxComponent, RedFirstWrapperComponent, BlueFirstWrapperComponent, StyleMapVsHostComponent, HostDirectiveTestComponent],
  template: `
    <div class="demo-container">
      <div class="demo-header">
        <h2>Style Binding Precedence</h2>
        <span class="badge prec-badge">Standalone</span>
      </div>
      <p class="demo-description">
        Angular resolves conflicting style bindings using a <strong>priority linked list</strong>.
        Template bindings always beat host bindings, but the order among directive host bindings
        depends on the <strong>directive registry order</strong> &mdash; determined by the
        <code>imports[]</code> array (standalone) or <code>declarations[]</code> array (module-based).
        <strong>Template attribute order does NOT matter.</strong>
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
        <h3><span class="feat-badge">KEY</span> What Determines "Last Directive"?</h3>
        <p class="desc">The priority table above is the same for both standalone and module-based. But <strong>who counts as "last directive"</strong> depends on the registration array:</p>
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
              <p class="note">Template attribute order is irrelevant.</p>
            </div>
          </div>
          <div class="compare-card standalone-card">
            <div class="compare-header">
              <span class="compare-icon">&#9889;</span>
              <strong>Standalone (<code>standalone: true</code>)</strong>
            </div>
            <div class="compare-body">
              <p><strong>Last in <code>imports[]</code> wins.</strong></p>
              <div class="code-block">
                <pre>&#64;Component(&#123;
  imports: [
    DirRed,   // Lower priority
    DirBlue,  // Higher priority (WINS)
  ],
&#125;)</pre>
              </div>
              <p class="result">Result: <span class="color-blue">DirBlue wins</span> because it's imported last.</p>
              <p class="note">Template attribute order is irrelevant. <code>imports[]</code> feeds a <code>Set</code> that preserves insertion order.</p>
            </div>
          </div>
        </div>
        <div class="anomaly-box">
          <strong>&#9888;&#65039; This means:</strong> Reordering <code>imports[]</code> can silently change which directive's styles win.
          Unlike CSS specificity, this is <em>not visible in the template</em> &mdash; it's hidden in metadata.
          This is exactly what CSS IntelliSense (diagnostic 99005) warns about.
        </div>
      </div>

      <!-- Live Demo: Directive vs Directive -->
      <div class="example-section">
        <h3><span class="feat-badge">LIVE</span> Test 1: <code>imports[]</code> Order Changes the Winner</h3>
        <p class="desc">Both wrappers render the same template (<code>&lt;div dirRed dirBlue&gt;</code>), but with different <code>imports[]</code> order. The last imported directive wins:</p>
        <div class="live-grid">
          <div class="live-box">
            <span class="live-label">imports: [DirRed, DirBlue] &rarr; Blue wins (last)</span>
            <red-first-wrapper>This text shows: Blue wins</red-first-wrapper>
            <span class="live-explain">DirBlue is last in imports[] &rarr; blue wins</span>
          </div>
          <div class="live-box">
            <span class="live-label">imports: [DirBlue, DirRed] &rarr; Red wins (last)</span>
            <blue-first-wrapper>This text shows: Red wins</blue-first-wrapper>
            <span class="live-explain">DirRed is last in imports[] &rarr; red wins</span>
          </div>
        </div>
        <p class="note">Both wrappers have identical templates. Only the <code>imports[]</code> array order differs. Template attribute order (<code>dirRed dirBlue</code>) is the same in both and does not affect the outcome.</p>
      </div>

      <!-- Live Demo: Template vs Directive Host -->
      <div class="example-section">
        <h3><span class="feat-badge">LIVE</span> Test 2: Template Binding vs Directive Host</h3>
        <p class="desc">Template <code>[style.color]</code> always beats directive host <code>[style.color]</code>. Template <code>[style]</code> map also beats directive host:</p>
        <div class="live-grid">
          <div class="live-box">
            <span class="live-label">Template [style.color]="'orange'" + dirRed + dirBlue</span>
            <div class="live-result" [style.color]="'orange'" dirRed dirBlue>Template always wins: orange</div>
            <span class="live-explain">Template [style.prop] = HIGHEST priority (both standalone & module)</span>
          </div>
          <div class="live-box">
            <span class="live-label">Template [style]="&#123;color: 'orange'&#125;" + dirRed + dirBlue</span>
            <div class="live-result" [style]="templateStyleMap()" dirRed dirBlue>Style map vs directives: check the color!</div>
            <span class="live-explain">Template [style] map also beats all directive host bindings</span>
          </div>
        </div>
        <p class="note">Template bindings append to the <strong>tail</strong> of the styling linked list, giving them the highest priority. Both <code>[style.prop]</code> and <code>[style]="&#123;...&#125;"</code> template bindings beat all host bindings.</p>
      </div>

      <!-- Nuclear Test: [style] map vs directive host -->
      <div class="example-section">
        <h3><span class="feat-badge">ANOMALY</span> Test 2b: [style] Map vs Directive Host (Nuclear Test Finding)</h3>
        <p class="desc">The nuclear test (<code>test-nuclear-all-style-precedence.ts</code>) found that in standalone,
          directive host bindings can override <code>[style]="&#123;...&#125;"</code> maps.
          This contradicts the expected "template beats everything" rule &mdash; only <code>[style.prop]</code> (individual) is guaranteed to win:</p>
        <style-map-vs-host />
        <div class="anomaly-box">
          <strong>&#9888;&#65039; Finding:</strong> In module-based, <code>[style]="&#123;...&#125;"</code> (template map) beats directive host.
          In standalone, directive host bindings may beat the template style map. Only <code>[style.prop]</code> (individual) is
          guaranteed to have the highest priority in both modes.
        </div>
      </div>

      <!-- Nuclear Test: hostDirective precedence -->
      <div class="example-section">
        <h3><span class="feat-badge">ANOMALY</span> Test 2c: Directive vs Its hostDirective</h3>
        <p class="desc">A directive's own <code>&#64;HostBinding</code> should beat its <code>hostDirectives</code>.
          The hostDirective slots in <em>below</em> its parent in the priority chain:</p>
        <host-directive-test />
      </div>

      <!-- Nuclear Test: Property variant order -->
      <div class="example-section">
        <h3><span class="feat-badge">ANOMALY</span> Test 2d: CSS Property Name Variants (kebab vs camelCase)</h3>
        <p class="desc">When both <code>[style.background-color]</code> and <code>[style.backgroundColor]</code> are set on the same element:</p>
        <div class="live-grid">
          <div class="live-box">
            <span class="live-label">[style.background-color]="pink" + [style.backgroundColor]="lightblue"</span>
            <div class="live-result" [style.background-color]="'pink'" [style.backgroundColor]="'lightblue'" style="color: black; padding: 10px;">
              Which variant wins?
            </div>
            <span class="live-explain">Nuclear test: LAST variant wins in standalone</span>
          </div>
          <div class="live-box">
            <span class="live-label">[style.backgroundColor]="lightblue" + [style.background-color]="pink"</span>
            <div class="live-result" [style.backgroundColor]="'lightblue'" [style.background-color]="'pink'" style="color: black; padding: 10px;">
              Which variant wins?
            </div>
            <span class="live-explain">Swap order — does winner change?</span>
          </div>
        </div>
        <p class="note">The nuclear test found that the <strong>last property variant wins</strong> (second binding overrides the first).
          This applies to kebab-case vs camelCase for the same CSS property.</p>
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
        <p class="desc">Both <code>&#64;HostBinding</code> and <code>host: &#123;&#125;</code> produce the same <code>ɵɵstyleProp</code> instructions. The winner is determined by <code>imports[]</code> order, not the decorator type:</p>
        <div class="live-grid">
          <div class="live-box">
            <span class="live-label">dirRed (host) + dirGreen (&#64;HostBinding) &mdash; same element</span>
            <div class="live-result" dirRed dirGreen>DirGreen wins (later in imports[])</div>
            <span class="live-explain">imports: [DirRed, DirBlue, DirGreen, ...] &rarr; DirGreen is last</span>
          </div>
          <div class="live-box">
            <span class="live-label">Swapped attribute order: dirGreen + dirRed</span>
            <div class="live-result" dirGreen dirRed>Still same winner! Attribute order irrelevant</div>
            <span class="live-explain">Same imports[] order &rarr; same result regardless of attribute order</span>
          </div>
        </div>
        <p class="note">This proves that template attribute order (<code>dirRed dirGreen</code> vs <code>dirGreen dirRed</code>) does NOT affect the outcome. Only the position in <code>imports[]</code> matters.</p>
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
          The <code>directiveRegistry</code> order (which directive is "Directive1" vs "Directive2") comes from
          <code>imports[]</code> (standalone) or <code>declarations[]</code> (module). Template attribute order has no effect.
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
