import {Component, Directive, HostBinding} from '@angular/core';

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
        <h2>Style Binding Precedence Bugs</h2>
        <span class="badge prec-badge">Standalone</span>
      </div>
      <p class="demo-description">
        Live demonstrations of <strong>actual bugs and surprising behaviors</strong> in Angular's
        style binding precedence system. These affect standalone components and have no obvious workaround.
        CSS IntelliSense detects these conflicts and warns about them.
      </p>

      <!-- Bug 1: [style] map vs directive host -->
      <div class="example-section">
        <h3><span class="feat-badge">BUG</span> Template [style] Map Loses to Directive Host</h3>
        <p class="desc">Template bindings should always beat host bindings. But in standalone components,
          directive host bindings can override <code>[style]="&#123;...&#125;"</code> maps.
          Only <code>[style.prop]</code> (individual) is guaranteed to win:</p>
        <style-map-vs-host />
        <div class="anomaly-box">
          <strong>&#9888;&#65039; Bug:</strong> In module-based, <code>[style]="&#123;...&#125;"</code> (template map) correctly beats directive host.
          In standalone, directive host bindings beat the template style map. Only <code>[style.prop]</code> (individual) is
          guaranteed to have the highest priority in both modes.
        </div>
      </div>

      <!-- Bug 2: imports[] order silently changes winner -->
      <div class="example-section">
        <h3><span class="feat-badge">BUG</span> <code>imports[]</code> Order Silently Changes Style Winner</h3>
        <p class="desc">Both wrappers render the same template (<code>&lt;div dirRed dirBlue&gt;</code>), but with different <code>imports[]</code> order.
          Reordering imports silently changes which directive's styles win &mdash; with no hint in the template:</p>
        <div class="live-grid">
          <div class="live-box">
            <span class="live-label">imports: [DirRed, DirBlue] &rarr; Blue wins</span>
            <red-first-wrapper>This text shows: Blue wins</red-first-wrapper>
            <span class="live-explain">DirBlue is last in imports[] &rarr; blue wins</span>
          </div>
          <div class="live-box">
            <span class="live-label">imports: [DirBlue, DirRed] &rarr; Red wins</span>
            <blue-first-wrapper>This text shows: Red wins</blue-first-wrapper>
            <span class="live-explain">DirRed is last in imports[] &rarr; red wins</span>
          </div>
        </div>
        <div class="anomaly-box">
          <strong>&#9888;&#65039; Impact:</strong> A refactor that reorders <code>imports[]</code> (e.g., alphabetical sorting, auto-import) silently changes
          which styles win. Unlike CSS specificity, this is <em>invisible in the template</em>. CSS IntelliSense (diagnostic 99005) detects this.
        </div>
      </div>

      <!-- Bug 3: CSS property name variant order -->
      <div class="example-section">
        <h3><span class="feat-badge">BUG</span> CSS Property Name Variants: Last Variant Wins</h3>
        <p class="desc">When both <code>[style.background-color]</code> and <code>[style.backgroundColor]</code> are set on the same element,
          the <strong>last binding in template order</strong> wins:</p>
        <div class="live-grid">
          <div class="live-box">
            <span class="live-label">[style.background-color]="pink" + [style.backgroundColor]="lightblue"</span>
            <div class="live-result" [style.background-color]="'pink'" [style.backgroundColor]="'lightblue'" style="color: black; padding: 10px;">
              Which variant wins?
            </div>
            <span class="live-explain">Last variant (camelCase) wins &rarr; lightblue</span>
          </div>
          <div class="live-box">
            <span class="live-label">[style.backgroundColor]="lightblue" + [style.background-color]="pink"</span>
            <div class="live-result" [style.backgroundColor]="'lightblue'" [style.background-color]="'pink'" style="color: black; padding: 10px;">
              Which variant wins?
            </div>
            <span class="live-explain">Swapped order &rarr; winner changes to pink</span>
          </div>
        </div>
        <div class="anomaly-box">
          <strong>&#9888;&#65039; Bug:</strong> The <strong>last property variant wins</strong> (second binding overrides first).
          Kebab-case and camelCase are treated as the same CSS property but resolve based on binding order.
          A formatter or auto-sort can silently change the visual outcome.
        </div>
      </div>

      <!-- Bug 4: hostDirective vs directive host -->
      <div class="example-section">
        <h3><span class="feat-badge">BUG</span> Directive vs Its hostDirective: Priority Unclear</h3>
        <p class="desc">A directive's own <code>&#64;HostBinding</code> should beat its <code>hostDirectives</code>.
          The hostDirective slots in <em>below</em> its parent in the priority chain, but this isn't documented:</p>
        <host-directive-test />
        <div class="anomaly-box">
          <strong>&#9888;&#65039; Issue:</strong> The <code>hostDirectives</code> API doesn't document how style priority interacts
          with the parent directive's own host bindings. The behavior is correct (parent wins) but undocumented.
        </div>
      </div>

      <!-- What CSS IntelliSense Detects -->
      <div class="example-section">
        <h3>What CSS IntelliSense Detects</h3>
        <p class="desc">The Language Service uses its own precedence model to flag these conflicts:</p>
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

    /* Live Demo */
    .live-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 12px; }
    .live-box { background: var(--adev-surface-2, #0f172a); border: 1px solid var(--adev-border, #334155); border-radius: 8px; padding: 12px; }
    .live-label { display: block; font-size: 11px; color: var(--adev-text-secondary, #94a3b8); margin-bottom: 8px; font-family: 'JetBrains Mono', monospace; }
    .live-result { padding: 10px; font-size: 16px; font-weight: 600; background: rgba(255,255,255,0.03); border-radius: 6px; margin-bottom: 6px; }
    .live-explain { font-size: 11px; color: var(--adev-text-secondary, #94a3b8); font-style: italic; }

    /* Anomaly Box */
    .anomaly-box { background: rgba(251, 146, 60, 0.08); border: 1px solid rgba(251, 146, 60, 0.3); border-radius: 8px; padding: 12px 16px; margin-top: 12px; font-size: 13px; line-height: 1.6; }

    /* Detect Grid */
    .detect-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; }
    .detect-card { background: var(--adev-surface-2, #0f172a); border: 1px solid var(--adev-border, #334155); border-radius: 8px; padding: 12px; }
    .detect-code { display: inline-block; background: rgba(240, 160, 200, 0.12); color: #f0a0c8; padding: 2px 8px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700; margin-bottom: 4px; }
    .detect-card strong { display: block; font-size: 12px; margin-bottom: 4px; font-family: 'JetBrains Mono', monospace; }
    .detect-card p { font-size: 12px; color: var(--adev-text-secondary, #94a3b8); margin: 0; line-height: 1.5; }

    @media (max-width: 700px) {
      .live-grid { grid-template-columns: 1fr; }
    }
  `,
})
export class StylePrecedenceDemoComponent {}
