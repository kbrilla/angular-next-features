import {Component} from '@angular/core';

@Component({
  selector: 'app-css-intellisense-demo',
  template: `
    <div class="demo-container">
      <div class="demo-header">
        <h2>CSS / ARIA / Events IntelliSense</h2>
        <span class="badge css-badge">feat/css-intellisense-legacy</span>
        <span class="badge css-badge-alt">feat/css-intellisense</span>
      </div>
      <p class="demo-description">
        Comprehensive CSS property, unit, value, ARIA attribute, and DOM event validation for
        Angular templates. 25+ diagnostic codes across all binding contexts. Unlike the other demos,
        these are <strong>Language Service features</strong> &mdash; they light up in the editor, not in
        the template at runtime. Detects duplications and overrides coming from
        <strong>different sources</strong>: host bindings, host property of components, host property
        of directives, &#64;HostBinding decorators, and template bindings.
      </p>

      <!-- Stats -->
      <div class="stats-row">
        <div class="stat">
          <span class="stat-value">25+</span>
          <span class="stat-label">Diagnostic codes</span>
        </div>
        <div class="stat">
          <span class="stat-value">7</span>
          <span class="stat-label">Binding sources</span>
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

      <!-- Diagnostic Code Table -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> All CSS Diagnostic Codes</h3>
        <p class="desc">Every diagnostic code from <code>CssDiagnosticCode</code> enum in <code>css_diagnostics.ts</code>:</p>
        <div class="diag-table">
          <div class="diag-header">
            <span>Code</span><span>Constant</span><span>Description</span>
          </div>
          <div class="diag-row err"><span>99001</span><span>UNKNOWN_CSS_PROPERTY</span><span>Unknown CSS property in [style.prop]</span></div>
          <div class="diag-row err"><span>99002</span><span>INVALID_CSS_UNIT</span><span>Invalid CSS unit suffix in [style.prop.unit]</span></div>
          <div class="diag-row err"><span>99003</span><span>UNKNOWN_CSS_PROPERTY_IN_OBJECT</span><span>Unknown CSS property in [style]="&#123;prop: val&#125;"</span></div>
          <div class="diag-row err"><span>99004</span><span>DUPLICATE_CSS_PROPERTY</span><span>Duplicate CSS property in style object literal</span></div>
          <div class="diag-row warn"><span>99005</span><span>CONFLICTING_STYLE_BINDING</span><span>Same CSS property set via multiple binding types</span></div>
          <div class="diag-row err"><span>99006</span><span>UNKNOWN_CSS_PROPERTY_IN_HOST</span><span>Unknown CSS property in host: &#123;'[style.prop]': ...&#125;</span></div>
          <div class="diag-row err"><span>99007</span><span>INVALID_CSS_UNIT_IN_HOST</span><span>Invalid CSS unit in host binding</span></div>
          <div class="diag-row warn"><span>99008</span><span>OBSOLETE_CSS_PROPERTY</span><span>Obsolete/deprecated CSS property in [style.prop]</span></div>
          <div class="diag-row warn"><span>99009</span><span>OBSOLETE_CSS_PROPERTY_IN_HOST</span><span>Obsolete CSS property in host binding</span></div>
          <div class="diag-row warn"><span>99010</span><span>OBSOLETE_CSS_PROPERTY_IN_OBJECT</span><span>Obsolete CSS property in style object</span></div>
          <div class="diag-row err"><span>99011</span><span>INVALID_UNIT_VALUE</span><span>[style.prop.unit] expects numeric, got string/boolean</span></div>
          <div class="diag-row err"><span>99012</span><span>INVALID_UNIT_VALUE_IN_HOST</span><span>Invalid unit value in host binding</span></div>
          <div class="diag-row warn"><span>99014</span><span>SHORTHAND_OVERRIDE</span><span>CSS shorthand overrides longhand set elsewhere</span></div>
          <div class="diag-row hint"><span>99015</span><span>PREFER_NUMERIC_UNIT_VALUE</span><span>Use number instead of string for unit suffix</span></div>
          <div class="diag-row hint"><span>99017</span><span>PREFER_CLASS_OVER_NGCLASS</span><span>Migrate [ngClass] to [class]</span></div>
          <div class="diag-row hint"><span>99018</span><span>PREFER_INDIVIDUAL_STYLE_BINDINGS</span><span>Convert [style]="&#123;...&#125;" to individual [style.x]</span></div>
          <div class="diag-row hint"><span>99019</span><span>PREFER_STYLE_OBJECT_BINDING</span><span>Consolidate multiple [style.x] into [style]="&#123;...&#125;"</span></div>
          <div class="diag-row err"><span>99020</span><span>DUPLICATE_STYLE_BINDING</span><span>Duplicate CSS property across individual bindings</span></div>
          <div class="diag-row warn"><span>99411</span><span>CLASS_BINDING_SHADOWS_INPUT</span><span>[class] binding shadows &#64;Input('class')</span></div>
          <div class="diag-row warn"><span>99412</span><span>STYLE_BINDING_SHADOWS_INPUT</span><span>[style] binding shadows &#64;Input('style')</span></div>
        </div>
      </div>

      <!-- 1. CSS "Did you mean" -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> CSS Property Validation &amp; "Did you mean?"</h3>
        <p class="desc">Fuzzy-match suggestions via Levenshtein distance. Works across ALL binding contexts.</p>
        <div class="msg-table">
          <div class="msg-header"><span>Input (typo)</span><span>Exact Diagnostic Message</span></div>
          <div class="msg-row"><code>[style.wdith]="100"</code><span class="msg">Unknown CSS property 'wdith'. Did you mean 'width'?</span></div>
          <div class="msg-row"><code>[style.colro]="'red'"</code><span class="msg">Unknown CSS property 'colro'. Did you mean 'color'?</span></div>
          <div class="msg-row"><code>[style.heigth]="200"</code><span class="msg">Unknown CSS property 'heigth'. Did you mean 'height'?</span></div>
          <div class="msg-row"><code>[style.backgroundColour]="c"</code><span class="msg">Unknown CSS property 'backgroundColour'. Did you mean 'backgroundColor'?</span></div>
          <div class="msg-row"><code>[style.backgrond-color]="c"</code><span class="msg">Unknown CSS property 'backgrond-color'. Did you mean 'background-color'?</span></div>
        </div>
        <p class="note">Also works in object literals: <code>[style]="&#123;wdith: '100px', bgColor: 'red'&#125;"</code> produces <strong>2 diagnostics</strong>, each with "Did you mean" suggestions. Spread objects are validated too: <code>[style]="&#123;...baseStyles&#125;"</code> where baseStyles has typos.</p>
      </div>

      <!-- Quick Fixes -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> Quick Fixes (Code Actions)</h3>
        <p class="desc">One-click fixes for common CSS issues. "Fix All" available for bulk operations.</p>
        <div class="fix-table">
          <div class="fix-row">
            <div class="fix-trigger">
              <span class="fix-code">99001</span>
              <code>[style.backgroundColour]</code>
            </div>
            <div class="fix-action">
              <span class="fix-label">Quick Fix:</span>
              <span class="fix-desc">Change to 'backgroundColor'</span>
            </div>
          </div>
          <div class="fix-row">
            <div class="fix-trigger">
              <span class="fix-code">99001</span>
              <code>[style.backgrond-color]</code>
            </div>
            <div class="fix-action">
              <span class="fix-label">Quick Fix:</span>
              <span class="fix-desc">Change to 'background-color' (preserves kebab-case!)</span>
            </div>
          </div>
          <div class="fix-row">
            <div class="fix-trigger">
              <span class="fix-code">99001</span>
              <code>[style.colro] + [style.wdith]</code>
            </div>
            <div class="fix-action">
              <span class="fix-label">Fix All:</span>
              <span class="fix-desc">Fixes ALL unknown CSS properties in file at once (1 change set, N text changes)</span>
            </div>
          </div>
          <div class="fix-row">
            <div class="fix-trigger">
              <span class="fix-code">99014</span>
              <code>[style.background] + [style.backgroundColor]</code>
            </div>
            <div class="fix-action">
              <span class="fix-label">Quick Fix:</span>
              <span class="fix-desc">"Remove background-color" &mdash; removes the overridden longhand</span>
            </div>
          </div>
          <div class="fix-row">
            <div class="fix-trigger">
              <span class="fix-code">99011</span>
              <code>[style.width.px]="'red'"</code>
            </div>
            <div class="fix-action">
              <span class="fix-label">Quick Fix:</span>
              <span class="fix-desc">"Remove .px" &mdash; removes the unit suffix</span>
            </div>
          </div>
          <div class="fix-row">
            <div class="fix-trigger">
              <span class="fix-code">99017</span>
              <code>[ngClass]="'active'"</code>
            </div>
            <div class="fix-action">
              <span class="fix-label">Quick Fix:</span>
              <span class="fix-desc">Replace ngClass with class</span>
            </div>
          </div>
          <div class="fix-row">
            <div class="fix-trigger">
              <span class="fix-code">99018</span>
              <code>[style]="&#123;color: textColor&#125;"</code>
            </div>
            <div class="fix-action">
              <span class="fix-label">Quick Fix:</span>
              <span class="fix-desc">"Convert to individual bindings" &rarr; [style.color]="textColor"</span>
            </div>
          </div>
          <div class="fix-row">
            <div class="fix-trigger">
              <span class="fix-code">99019</span>
              <code>3+ individual [style.x] bindings</code>
            </div>
            <div class="fix-action">
              <span class="fix-label">Quick Fix:</span>
              <span class="fix-desc">"Consolidate to [style] object"</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Cross-source duplicate detection -->
      <div class="example-section highlight">
        <h3><span class="feat-badge">NEW</span> Cross-Source Duplicate/Conflict Detection</h3>
        <p class="desc">
          Detects when the <strong>same CSS property</strong> is set from different binding sources
          on the same element. This is unique &mdash; no other tool catches conflicts between host
          metadata, &#64;HostBinding decorators, directive host bindings, and template bindings!
        </p>

        <h4>Example 1: Host metadata vs &#64;HostBinding</h4>
        <div class="code-block">
          <pre><code>&#64;Component(&#123;
  host: &#123;
    '[style.width]': '"100px"',     // Source 1: host metadata
  &#125;,
&#125;)
export class AppComponent &#123;
  &#64;HostBinding('style.width') widthValue = '200px';  // Source 2: decorator
&#125;
// Result: 99005 CONFLICTING_STYLE_BINDING containing 'width'</code></pre>
        </div>

        <h4>Example 2: Directive host binding vs template binding</h4>
        <div class="code-block">
          <pre><code>&#64;Directive(&#123;
  selector: '[widthApplier]',
  host: &#123; '[style.width]': '"50px"' &#125;,
&#125;)
export class WidthApplierDirective &#123;&#125;

// Template:
&lt;div widthApplier [style.width]="'100px'"&gt;
// Result: 99005 &mdash; "[style.property]" + "directive" in message
// Template binding wins over directive host binding</code></pre>
        </div>

        <h4>Example 3: Component host + directive host + template</h4>
        <div class="code-block">
          <pre><code>&#64;Component(&#123;
  host: &#123; '[style.color]': '"blue"' &#125;,  // Component host
  template: '&lt;div colorDir [style.color]="red"&gt;'
&#125;)
// Where colorDir has: host: &#123; '[style.color]': '"green"' &#125;
// Result: Multiple conflict diagnostics showing ALL 3 sources</code></pre>
        </div>

        <h4>Full Precedence Order (7 levels)</h4>
        <div class="precedence-list">
          <div class="prec-item p1"><span class="prec-num">1</span><span class="prec-label">Template [style.property]</span><span class="prec-priority">HIGHEST</span></div>
          <div class="prec-item p2"><span class="prec-num">2</span><span class="prec-label">Template [style]="&#123;...&#125;" object</span></div>
          <div class="prec-item p3"><span class="prec-num">3</span><span class="prec-label">Template [ngStyle] directive</span></div>
          <div class="prec-item p4"><span class="prec-num">4</span><span class="prec-label">Component host individual binding</span></div>
          <div class="prec-item p5"><span class="prec-num">5</span><span class="prec-label">Component host object binding</span></div>
          <div class="prec-item p6"><span class="prec-num">6</span><span class="prec-label">Directive's own host binding</span></div>
          <div class="prec-item p7"><span class="prec-num">7</span><span class="prec-label">hostDirectives binding</span><span class="prec-priority">LOWEST</span></div>
        </div>
      </div>

      <!-- CSS Unit Validation -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> CSS Unit Validation (60+ units)</h3>
        <div class="unit-grid">
          <div class="unit-cat"><span class="unit-cat-label">Absolute</span><span class="unit-list">px cm mm Q in pc pt</span></div>
          <div class="unit-cat"><span class="unit-cat-label">Relative</span><span class="unit-list">em rem ex ch lh rlh</span></div>
          <div class="unit-cat"><span class="unit-cat-label">Viewport</span><span class="unit-list">vw vh vi vb vmin vmax svw svh dvw dvh</span></div>
          <div class="unit-cat"><span class="unit-cat-label">Container</span><span class="unit-list">cqw cqh cqi cqb cqmin cqmax</span></div>
          <div class="unit-cat"><span class="unit-cat-label">Other</span><span class="unit-list">% deg rad turn s ms Hz kHz dpi dpcm dppx fr</span></div>
        </div>
        <div class="msg-table">
          <div class="msg-row"><code>[style.width.pxs]="100"</code><span class="msg">Unknown CSS unit 'pxs'</span></div>
          <div class="msg-row"><code>[style.opacity.px]="1"</code><span class="msg warn-msg">opacity is unitless (99015)</span></div>
          <div class="msg-row"><code>[style.width.px]="'red'"</code><span class="msg">Invalid value 'red'. [style.width.px] expects a numeric value. Runtime will produce 'redpx'</span></div>
          <div class="msg-row"><code>[style.width.px]="true"</code><span class="msg">Invalid value 'true'. [style.width.px] expects a numeric value, not a boolean</span></div>
        </div>
      </div>

      <!-- Duplicate & Conflict Messages -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> Duplicates &amp; Conflict Messages</h3>
        <div class="msg-table">
          <div class="msg-header"><span>Scenario</span><span>Exact Diagnostic Message</span></div>
          <div class="msg-row"><code>[style]="&#123;width: '100px', width: '200px'&#125;"</code><span class="msg">Duplicate CSS property 'width'</span></div>
          <div class="msg-row"><code>[style]="&#123;backgroundColor: 'red', 'background-color': 'blue'&#125;"</code><span class="msg">'background-color' and 'backgroundColor' refer to the same property</span></div>
          <div class="msg-row"><code>[style.backgroundColor] + [style]="&#123;backgroundColor&#125;"</code><span class="msg">[style.property] binding takes precedence over [style]</span></div>
          <div class="msg-row"><code>[style.color] + [ngStyle]="&#123;color&#125;"</code><span class="msg">[style.property] binding takes precedence over [ngStyle]</span></div>
          <div class="msg-row"><code>[style]="&#123;width&#125;" + [ngStyle]="&#123;width&#125;"</code><span class="msg">[style] binding takes precedence over [ngStyle]</span></div>
        </div>
      </div>

      <!-- Shorthand/Longhand -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> Shorthand/Longhand Conflict (99014)</h3>
        <p class="desc">Detects when a shorthand property overrides its longhands. 30+ shorthand&rarr;longhand mappings tracked.</p>
        <div class="msg-table">
          <div class="msg-row"><code>[style.backgroundColor] + [style.background]</code><span class="msg">'background-color' will be overridden by 'background' shorthand</span></div>
          <div class="msg-row"><code>[style.marginTop] + [style.margin]</code><span class="msg">'margin-top' will be overridden by 'margin' shorthand</span></div>
          <div class="msg-row"><code>[style.paddingTop] + [style.paddingLeft] + [style.padding]</code><span class="msg">2 diagnostics: both longhands flagged</span></div>
          <div class="msg-row"><code>[style.borderColor] + [style.border]</code><span class="msg">'border-color' will be overridden by 'border' shorthand</span></div>
          <div class="msg-row"><code>[style.flexGrow] + [style.flex]</code><span class="msg">'flex-grow' will be overridden by 'flex' shorthand</span></div>
        </div>
      </div>

      <!-- Obsolete CSS -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> Obsolete CSS Property Detection</h3>
        <p class="desc">Message: <em>"CSS property 'X' is deprecated. INFO. Consider using 'Y' instead. MDN_URL"</em></p>
        <div class="obsolete-table">
          <div class="obs-row"><span class="obs-old">gridGap</span><span class="obs-arrow">&rarr;</span><span class="obs-new">gap</span><span class="obs-url">developer.mozilla.org/.../gap</span></div>
          <div class="obs-row"><span class="obs-old">gridColumnGap</span><span class="obs-arrow">&rarr;</span><span class="obs-new">columnGap</span></div>
          <div class="obs-row"><span class="obs-old">boxAlign</span><span class="obs-arrow">&rarr;</span><span class="obs-new">alignItems</span><span class="obs-url">developer.mozilla.org/.../box-align</span></div>
          <div class="obs-row"><span class="obs-old">boxPack</span><span class="obs-arrow">&rarr;</span><span class="obs-new">justifyContent</span></div>
          <div class="obs-row"><span class="obs-old">pageBreakAfter</span><span class="obs-arrow">&rarr;</span><span class="obs-new">breakAfter</span></div>
          <div class="obs-row"><span class="obs-old">wordWrap</span><span class="obs-arrow">&rarr;</span><span class="obs-new">overflowWrap</span></div>
          <div class="obs-row"><span class="obs-old">imeMode</span><span class="obs-arrow">&rarr;</span><span class="obs-new">(none)</span><span class="obs-url">No replacement available</span></div>
        </div>
        <p class="note">Works in ALL contexts: template [style.X], [style]="&#123;X: ...&#125;", [ngStyle], host metadata, &#64;HostBinding. Obsolete takes priority over unknown &mdash; no false UNKNOWN_CSS_PROPERTY for known obsolete properties.</p>
      </div>

      <!-- Host Binding Validation -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> Host Binding Validation (All 3 Sources)</h3>
        <p class="desc">Validates CSS in ALL host binding mechanisms &mdash; not just templates!</p>

        <h4>1. host property in &#64;Component / &#64;Directive</h4>
        <div class="code-block">
          <pre><code>&#64;Component(&#123;
  host: &#123;
    '[style.wdith]': '"100px"',           // 99006: Did you mean 'width'?
    '[style.width.pxs]': '100',           // 99007: Unknown CSS unit 'pxs'
    '[style.backgroud-color]': '"red"',    // 99006: Did you mean 'background-color'?
    '[style.gridGap]': '"10px"',           // 99009: Deprecated, use 'gap'
  &#125;,
&#125;)</code></pre>
        </div>

        <h4>2. &#64;HostBinding decorator</h4>
        <div class="code-block">
          <pre><code>&#64;HostBinding('style.wdith') width = '100px';    // 99006: Did you mean 'width'?
&#64;HostBinding('style.heigth') height = '200px';   // 99006: Did you mean 'height'?
&#64;HostBinding('style.boxOrient') orient = '...';   // 99009: Deprecated</code></pre>
        </div>

        <h4>3. Both sources on same class (2 diagnostics)</h4>
        <div class="code-block">
          <pre><code>&#64;Component(&#123;
  host: &#123; '[style.colr]': '"blue"' &#125;,  // 99006
&#125;)
export class AppComponent &#123;
  &#64;HostBinding('style.wdith') width = '100px';  // 99006
&#125;
// Result: 2 independent diagnostics, one per source</code></pre>
        </div>
      </div>

      <!-- Class/Style Input Shadowing -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> [class]/[style] Input Shadowing (99411 / 99412)</h3>
        <p class="desc">Detects when [class] or [style] bindings conflict with directive &#64;Input('class') / &#64;Input('style').</p>
        <div class="msg-table">
          <div class="msg-row"><code>Directive with &#64;Input('class') + [class]</code><span class="msg">[class] binding shadows &#64;Input('class') on MyDirective</span></div>
          <div class="msg-row"><code>Directive with &#64;Input('style') + [style]</code><span class="msg">[style] binding shadows &#64;Input('style') on MyDirective</span></div>
          <div class="msg-row"><code>2 directives with &#64;Input('class')</code><span class="msg">Message mentions both directive names</span></div>
          <div class="msg-row"><code>Signal: input.required&lt;string&gt;(&#123;alias: 'class'&#125;)</code><span class="msg">Works with signal-based inputs too</span></div>
        </div>
        <p class="note">Diagnostics include <code>relatedInformation</code> pointing to the &#64;Input declaration. Suppressed with <code>warnOnInputShadowing: false</code>.</p>
      </div>

      <!-- Completions -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> Completions &amp; IntelliSense</h3>
        <p class="desc">CSS property name completions in ALL style binding contexts:</p>
        <div class="completion-contexts">
          <div class="ctx-item"><span class="ctx-num">1</span>Template individual: <code>&lt;div [style.|]&gt;</code></div>
          <div class="ctx-item"><span class="ctx-num">2</span>Object literals: <code>&lt;div [style]="&#123;|: 'value'&#125;"&gt;</code></div>
          <div class="ctx-item"><span class="ctx-num">3</span>[ngStyle] objects: <code>&lt;div [ngStyle]="&#123;|: 'value'&#125;"&gt;</code></div>
          <div class="ctx-item"><span class="ctx-num">4</span>Host metadata: <code>host: &#123;'[style.|]': '...'&#125;</code></div>
          <div class="ctx-item"><span class="ctx-num">5</span>&#64;HostBinding: <code>&#64;HostBinding('style.|')</code></div>
        </div>
        <div class="completion-demo">
          <div class="completion-block">
            <span class="completion-trigger">[style.b<span class="cursor">|</span>]</span>
            <div class="completion-list">
              <div class="completion-item selected">backgroundColor</div>
              <div class="completion-item">backgroundImage</div>
              <div class="completion-item">border</div>
              <div class="completion-item">borderRadius</div>
              <div class="completion-item">boxShadow</div>
            </div>
          </div>
          <div class="completion-block">
            <span class="completion-trigger">[style.width.<span class="cursor">|</span>]</span>
            <div class="completion-list">
              <div class="completion-item selected">px</div>
              <div class="completion-item">em</div>
              <div class="completion-item">rem</div>
              <div class="completion-item">%</div>
              <div class="completion-item">vw</div>
            </div>
          </div>
        </div>
        <p class="note">Completion priority: Prefix match (highest), Substring match (medium). CSS unit completions also available after the second dot.</p>
      </div>

      <!-- False Positive Prevention -->
      <div class="example-section">
        <h3>False Positive Prevention</h3>
        <p class="desc">These patterns are intentionally <strong>NOT</strong> flagged:</p>
        <div class="false-positive-list">
          <div class="fp-item"><code>[style.--my-custom-color]</code><span>CSS custom properties (--*)</span></div>
          <div class="fp-item"><code>[style.-webkit-transform]</code><span>Vendor-prefixed (kebab)</span></div>
          <div class="fp-item"><code>[style.WebkitTransform]</code><span>Vendor-prefixed (camelCase)</span></div>
          <div class="fp-item"><code>[style]="&#123;MozAppearance: ...&#125;"</code><span>Vendor in objects</span></div>
          <div class="fp-item"><code>[style]="myStyles"</code><span>Variable references (can't validate)</span></div>
          <div class="fp-item"><code>[style]="getStyles()"</code><span>Method calls (can't validate)</span></div>
          <div class="fp-item"><code>[class.unknownClass]</code><span>Class names (not CSS properties)</span></div>
          <div class="fp-item"><code>[value]="x"</code><span>Non-style bindings</span></div>
        </div>
      </div>

      <!-- ARIA Validation -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> ARIA Attribute &amp; Role Validation</h3>
        <p class="desc">All ARIA diagnostic codes from <code>AriaDiagnosticCode</code>:</p>
        <div class="diag-table small">
          <div class="diag-row err"><span>99201</span><span>UNKNOWN_ARIA_ATTRIBUTE</span><span>"Did you mean?" suggestions</span></div>
          <div class="diag-row err"><span>99202</span><span>INVALID_ARIA_VALUE</span><span>Type-checked (boolean, tristate, token, integer)</span></div>
          <div class="diag-row err"><span>99203</span><span>UNKNOWN_ARIA_ROLE</span><span>"Did you mean?" for role values</span></div>
          <div class="diag-row warn"><span>99204</span><span>DEPRECATED_ARIA_ATTRIBUTE</span><span>aria-grabbed, aria-dropeffect</span></div>
        </div>
        <div class="msg-table">
          <div class="msg-header"><span>Input</span><span>Exact Diagnostic</span></div>
          <div class="msg-row"><code>aria-labelled="label"</code><span class="msg">Unknown ARIA attribute 'aria-labelled'. Did you mean 'aria-labelledby'?</span></div>
          <div class="msg-row"><code>aria-hidden="yes"</code><span class="msg">Invalid value 'yes' for aria-hidden. Expected: true, false</span></div>
          <div class="msg-row"><code>aria-checked="partial"</code><span class="msg">Invalid value 'partial' for aria-checked. Expected: true, false, mixed</span></div>
          <div class="msg-row"><code>aria-autocomplete="suggest"</code><span class="msg">Invalid value 'suggest'. Expected: inline, list, both, none</span></div>
          <div class="msg-row"><code>aria-live="aggressive"</code><span class="msg">Invalid value 'aggressive' for aria-live. Expected: off, polite, assertive</span></div>
          <div class="msg-row"><code>role="buton"</code><span class="msg">Unknown ARIA role 'buton'. Did you mean 'button'?</span></div>
          <div class="msg-row"><code>aria-grabbed="true"</code><span class="msg">ARIA attribute 'aria-grabbed' is deprecated</span></div>
          <div class="msg-row"><code>[attr.aria-hiddn]="isHidden"</code><span class="msg">Works on bound ARIA attributes too!</span></div>
        </div>
      </div>

      <!-- Event / DOM Validation -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> DOM Event &amp; Output Validation</h3>
        <p class="desc">All event diagnostic codes from <code>EventDiagnosticCode</code>:</p>
        <div class="diag-table small">
          <div class="diag-row err"><span>99101</span><span>UNKNOWN_DOM_EVENT</span><span>"Did you mean?" for misspelled events</span></div>
          <div class="diag-row warn"><span>99102</span><span>SHADOWED_DOM_EVENT</span><span>Directive output shadows native DOM event</span></div>
          <div class="diag-row err"><span>99103</span><span>CONFLICTING_OUTPUTS</span><span>Multiple directives, same output name</span></div>
          <div class="diag-row warn"><span>99104</span><span>OUTPUT_SHADOWS_DOM_EVENT</span><span>&#64;Output definition warning</span></div>
          <div class="diag-row err"><span>99105</span><span>CONFLICTING_INPUTS</span><span>Multiple directives, same input name</span></div>
          <div class="diag-row warn"><span>99106</span><span>HOST_DIRECTIVE_OUTPUT_SHADOWED</span><span>Own output shadows hostDirective's</span></div>
          <div class="diag-row warn"><span>99107</span><span>HOST_DIRECTIVE_INPUT_SHADOWED</span><span>Own input shadows hostDirective's</span></div>
        </div>
        <div class="msg-table">
          <div class="msg-header"><span>Scenario</span><span>Exact Diagnostic</span></div>
          <div class="msg-row"><code>(clcik)="onClick()"</code><span class="msg">Unknown DOM event 'clcik'. Did you mean 'click'?</span></div>
          <div class="msg-row"><code>Dir &#64;Output() click + (click)</code><span class="msg">Event handler for 'click' will be called 2 times: once for DOM PointerEvent, once for DirName &#64;Output</span></div>
          <div class="msg-row"><code>2 dirs with &#64;Output() click</code><span class="msg">Event handler called 3 times: DOM + 2 directive outputs</span></div>
          <div class="msg-row"><code>&#64;Output() click = new EventEmitter()</code><span class="msg">Output 'click' shadows native DOM PointerEvent event. Consider renaming.</span></div>
          <div class="msg-row"><code>DirA &#64;Input() value + DirB &#64;Input() value</code><span class="msg">Multiple directives have inputs named 'value': DirA (string), DirB (number)</span></div>
          <div class="msg-row"><code>Own &#64;Output() action + hostDirectives base</code><span class="msg">Output 'action' shadows hostDirective BaseDirective's output</span></div>
        </div>
        <p class="note">Signal-based outputs (<code>output&lt;string&gt;()</code>) and aliased outputs are also validated. Diagnostics on external .html files, not .ts.</p>
      </div>

      <!-- CSS Value Hover / Quick Info -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> CSS Value Hover/Quick Info</h3>
        <p class="desc">
          Hover over style bindings to see rich CSS property documentation including
          syntax, accepted values, browser support, and MDN links.
        </p>
        <div class="hover-demo">
          <div class="hover-trigger">[style.backgroundColor]="'red'"</div>
          <div class="hover-popup">
            <div class="hover-title">background-color</div>
            <div class="hover-body">Sets the background color of an element.</div>
            <div class="hover-meta">
              <span>Syntax: <code>&lt;color&gt;</code></span>
              <span>Initial: transparent</span>
              <span>Inherited: no</span>
            </div>
            <div class="hover-link">MDN: developer.mozilla.org/CSS/background-color</div>
          </div>
        </div>
        <p class="note">
          Available in <code>feat/css-intellisense</code> branch. Works on <code>[style.prop]</code>,
          <code>[style]="&#123;prop: val&#125;"</code>, and host binding style keys.
        </p>
      </div>

      <!-- ARIA Value Completions -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> ARIA Value Completions</h3>
        <p class="desc">Context-aware completions for ARIA attribute values, both static and bound:</p>
        <div class="completion-demo">
          <div class="completion-block">
            <span class="completion-trigger">aria-live="<span class="cursor">|</span>"</span>
            <div class="completion-list">
              <div class="completion-item selected">off</div>
              <div class="completion-item">polite</div>
              <div class="completion-item">assertive</div>
            </div>
          </div>
          <div class="completion-block">
            <span class="completion-trigger">[attr.aria-autocomplete]="'<span class="cursor">|</span>'"</span>
            <div class="completion-list">
              <div class="completion-item selected">inline</div>
              <div class="completion-item">list</div>
              <div class="completion-item">both</div>
              <div class="completion-item">none</div>
            </div>
          </div>
        </div>
        <p class="note">
          Completions are type-aware: boolean ARIA attrs show true/false, token ARIA attrs
          show their allowed enum values, tristate attrs show true/false/mixed.
          Available in <code>feat/css-intellisense</code> branch.
        </p>
      </div>

      <!-- Element Inspector -->
      <div class="example-section highlight">
        <h3><span class="feat-badge">NEW</span> Element Inspector (Phases 1&ndash;4 Implemented)</h3>
        <p class="desc">
          A comprehensive aggregated view of ALL bindings on an element. Collects from 3 binding
          origins and presents them in a unified, navigable view. Implementation in
          <code>feat/css-intellisense</code> branch (packages/language-service/src/element_inspector/).
        </p>
        <div class="inspector-demo">
          <div class="inspector-header">&lt;button mat-button widthApplier&gt;</div>
          <div class="inspector-section">
            <div class="inspector-label">Applied Directives</div>
            <div class="inspector-item">&mdash; MatButton [mat-button] (component)</div>
            <div class="inspector-item">&mdash; WidthApplier [widthApplier] (directive)</div>
          </div>
          <div class="inspector-section">
            <div class="inspector-label">Bindings by Origin</div>
            <div class="inspector-origin">Template</div>
            <div class="inspector-item">  [disabled]="!isValid" &rarr; HTMLButtonElement.disabled</div>
            <div class="inspector-item">  (click)="save()" &rarr; DOM PointerEvent</div>
            <div class="inspector-origin">Host Metadata (MatButton)</div>
            <div class="inspector-item">  [style.color] &rarr; 'primary'</div>
            <div class="inspector-origin">&#64;HostBinding (WidthApplier)</div>
            <div class="inspector-item">  [style.width] &rarr; '200px'</div>
          </div>
          <div class="inspector-section warn">
            <div class="inspector-label">Issues (2)</div>
            <div class="inspector-item">&bull; 99005: [style.width] conflict (template vs directive)</div>
            <div class="inspector-item">&bull; 99102: (click) shadows PointerEvent</div>
          </div>
        </div>
        <div class="phase-list">
          <div class="phase done"><span class="phase-num">1</span><strong>Element Hover Enhancement</strong> &mdash; Rich hover info showing all directives, bindings, and origins for a template element</div>
          <div class="phase done"><span class="phase-num">2</span><strong>Binding Info Service</strong> &mdash; <code>BindingCollector</code> gathers bindings from template, host metadata, &#64;HostBinding decorators, and object literal analysis</div>
          <div class="phase done"><span class="phase-num">3</span><strong>Conflict Detection</strong> &mdash; Cross-origin conflict analysis: finds same-property conflicts between component host, directive host, hostDirectives, and template</div>
          <div class="phase done"><span class="phase-num">4</span><strong>Code Lens Annotations</strong> &mdash; Inline annotations above elements showing binding count and conflict warnings</div>
          <div class="phase pending"><span class="phase-num">5</span><strong>Semantic Tokens</strong> &mdash; Color-coded tokens for different binding origins (planned)</div>
        </div>
        <p class="note">
          See <code>ELEMENT_INSPECTOR_PLAN.md</code> for the full design document.
          Implementation: <code>element_inspector/binding_collector.ts</code>,
          <code>element_inspector/object_binding_analyzer.ts</code>,
          <code>element_inspector/types.ts</code>.
        </p>
      </div>

      <!-- Standalone Precedence -->
      <div class="example-section">
        <h3>Standalone vs Module Precedence (Investigation)</h3>
        <p class="desc">
          Standalone components show <strong>different</strong> styling precedence than module-based.
          Key findings from <code>STANDALONE_PRECEDENCE_INVESTIGATION.md</code>:
        </p>
        <div class="finding-list">
          <div class="finding bad"><strong>Module-based:</strong> Last declared in declarations[] wins</div>
          <div class="finding bad"><strong>Standalone:</strong> First directive in template order wins (opposite!)</div>
          <div class="finding bad"><strong>Standalone:</strong> Directive host [style] BEATS template [style] object</div>
          <div class="finding good"><strong>Both:</strong> Template [style.prop] (individual) always highest priority</div>
          <div class="finding bad"><strong>Property variants:</strong> LAST variant wins (kebab vs camelCase)</div>
        </div>
        <p class="note">CSS IntelliSense accounts for these differences in its conflict detection.</p>
      </div>

      <!-- Scope Limitations -->
      <div class="example-section dim">
        <h3>Scope Limitations</h3>
        <ul class="limit-list">
          <li><strong>Class name validation</strong> &mdash; too noisy (global styles, SCSS, CDN)</li>
          <li><strong>data-* attributes</strong> &mdash; user-defined by W3C spec</li>
          <li><strong>General template errors</strong> &mdash; handled by Angular compiler (8001&ndash;8118)</li>
          <li><strong>CSS value validation</strong> &mdash; planned (see CSS_VALUE_VALIDATION_DESIGN.md)</li>
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
    .css-badge-alt { background: rgba(34, 211, 238, 0.12); color: #22d3ee; border: 1px solid rgba(34, 211, 238, 0.25); }
    .feat-badge { display: inline-block; font-size: 9px; font-weight: 700; letter-spacing: 0.5px; background: linear-gradient(135deg, var(--adev-gradient-start), var(--adev-gradient-end)); color: #0f0f11; padding: 2px 6px; border-radius: 4px; vertical-align: middle; margin-right: 4px; }
    code { background: var(--adev-code-bg); border: 1px solid var(--adev-code-border); padding: 2px 6px; border-radius: 4px; font-size: 12px; color: var(--adev-primary); font-family: 'JetBrains Mono', monospace; }
    .stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
    .stat { background: var(--adev-surface); border: 1px solid var(--adev-border); border-radius: 8px; padding: 16px; text-align: center; }
    .stat-value { display: block; font-size: 28px; font-weight: 700; color: var(--adev-primary); }
    .stat-label { display: block; font-size: 12px; color: var(--adev-text-tertiary); margin-top: 4px; }
    .example-section { background: var(--adev-surface); border: 1px solid var(--adev-border); border-left: 3px solid var(--adev-info); padding: 20px; margin: 20px 0; border-radius: 8px; }
    .example-section.highlight { border-left-color: var(--adev-warning); background: rgba(251, 191, 36, 0.03); }
    .example-section.dim { border-left-color: var(--adev-text-tertiary); opacity: 0.8; }
    h3 { color: var(--adev-text); margin-top: 0; font-size: 16px; font-weight: 600; }
    h4 { color: var(--adev-text); font-size: 14px; font-weight: 600; margin: 16px 0 8px; }
    .desc { color: var(--adev-text-secondary); font-size: 14px; margin: 8px 0 12px; }
    .note { background: rgba(74, 222, 128, 0.08); border-left: 3px solid var(--adev-success); padding: 10px 14px; border-radius: 6px; font-size: 13px; color: var(--adev-text-secondary); margin-top: 12px; }
    .diag-table { display: flex; flex-direction: column; gap: 2px; font-size: 12px; margin: 12px 0; }
    .diag-table.small .diag-row span { font-size: 11px; }
    .diag-header { display: grid; grid-template-columns: 60px 220px 1fr; gap: 8px; padding: 6px 10px; font-weight: 700; color: var(--adev-text-secondary); font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; }
    .diag-row { display: grid; grid-template-columns: 60px 220px 1fr; gap: 8px; padding: 5px 10px; border-radius: 4px; align-items: center; }
    .diag-row.err { background: rgba(248, 113, 113, 0.06); }
    .diag-row.warn { background: rgba(251, 191, 36, 0.06); }
    .diag-row.hint { background: rgba(96, 165, 250, 0.06); }
    .diag-row span:first-child { font-weight: 700; font-family: 'JetBrains Mono', monospace; }
    .diag-row span:nth-child(2) { font-family: 'JetBrains Mono', monospace; color: var(--adev-text-secondary); font-size: 10px; }
    .diag-row.err span:first-child { color: var(--adev-error); }
    .diag-row.warn span:first-child { color: var(--adev-warning); }
    .diag-row.hint span:first-child { color: var(--adev-info); }
    .msg-table { display: flex; flex-direction: column; gap: 4px; margin: 12px 0; }
    .msg-header { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 6px 10px; font-weight: 700; color: var(--adev-text-secondary); font-size: 11px; text-transform: uppercase; }
    .msg-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; padding: 8px 10px; border-radius: 6px; background: var(--adev-surface-2); align-items: center; font-size: 13px; }
    .msg { color: var(--adev-error); font-style: italic; font-size: 12px; }
    .msg.warn-msg { color: var(--adev-warning); }
    .fix-table { display: flex; flex-direction: column; gap: 6px; margin: 12px 0; }
    .fix-row { display: flex; gap: 12px; align-items: center; padding: 10px 12px; background: var(--adev-surface-2); border-radius: 6px; border-left: 3px solid var(--adev-success); flex-wrap: wrap; }
    .fix-trigger { display: flex; align-items: center; gap: 8px; min-width: 260px; }
    .fix-code { font-size: 10px; font-weight: 700; font-family: 'JetBrains Mono', monospace; color: var(--adev-error); background: rgba(248, 113, 113, 0.1); padding: 2px 6px; border-radius: 3px; }
    .fix-action { font-size: 13px; }
    .fix-label { font-weight: 600; color: var(--adev-success); margin-right: 4px; }
    .fix-desc { color: var(--adev-text-secondary); }
    .precedence-list { display: flex; flex-direction: column; gap: 4px; margin: 12px 0; }
    .prec-item { display: flex; align-items: center; gap: 10px; padding: 8px 12px; border-radius: 6px; font-size: 13px; background: var(--adev-surface-2); }
    .prec-num { width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: 700; font-size: 12px; color: white; }
    .p1 .prec-num { background: #ef4444; }
    .p2 .prec-num { background: #f97316; }
    .p3 .prec-num { background: #eab308; }
    .p4 .prec-num { background: #22c55e; }
    .p5 .prec-num { background: #06b6d4; }
    .p6 .prec-num { background: #8b5cf6; }
    .p7 .prec-num { background: #6b7280; }
    .prec-label { flex: 1; color: var(--adev-text); }
    .prec-priority { font-size: 10px; font-weight: 700; color: var(--adev-text-tertiary); text-transform: uppercase; }
    .code-block { background: var(--adev-code-bg); border: 1px solid var(--adev-code-border); border-radius: 8px; padding: 14px; margin: 8px 0; overflow-x: auto; }
    .code-block pre { margin: 0; }
    .code-block code { background: none; border: none; padding: 0; font-size: 12px; color: var(--adev-code-text); line-height: 1.6; }
    .unit-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 8px; margin: 12px 0; }
    .unit-cat { background: var(--adev-surface-2); padding: 10px 12px; border-radius: 6px; }
    .unit-cat-label { display: block; font-size: 11px; font-weight: 700; color: var(--adev-text-tertiary); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
    .unit-list { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--adev-primary); word-spacing: 6px; }
    .obsolete-table { display: flex; flex-direction: column; gap: 6px; margin: 12px 0; }
    .obs-row { display: flex; align-items: center; gap: 12px; background: var(--adev-surface-2); padding: 8px 12px; border-radius: 6px; font-size: 13px; }
    .obs-old { color: var(--adev-error); text-decoration: line-through; font-family: 'JetBrains Mono', monospace; min-width: 130px; }
    .obs-arrow { color: var(--adev-text-tertiary); }
    .obs-new { color: var(--adev-success); font-family: 'JetBrains Mono', monospace; font-weight: 600; min-width: 120px; }
    .obs-url { font-size: 11px; color: var(--adev-text-tertiary); }
    .completion-contexts { display: flex; flex-direction: column; gap: 4px; margin: 12px 0; }
    .ctx-item { display: flex; align-items: center; gap: 8px; padding: 6px 10px; background: var(--adev-surface-2); border-radius: 4px; font-size: 13px; color: var(--adev-text-secondary); }
    .ctx-num { width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: var(--adev-primary); color: #0f0f11; font-size: 11px; font-weight: 700; flex-shrink: 0; }
    .completion-demo { display: flex; gap: 16px; flex-wrap: wrap; margin: 12px 0; }
    .completion-block { background: var(--adev-code-bg); border: 1px solid var(--adev-code-border); border-radius: 8px; padding: 12px; min-width: 200px; flex: 1; }
    .completion-trigger { font-family: 'JetBrains Mono', monospace; font-size: 14px; color: var(--adev-code-text); display: block; margin-bottom: 8px; }
    .cursor { display: inline-block; width: 2px; height: 16px; background: var(--adev-primary); animation: blink 1s infinite; vertical-align: text-bottom; }
    @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
    .completion-list { background: var(--adev-surface-2); border: 1px solid var(--adev-border); border-radius: 4px; overflow: hidden; }
    .completion-item { padding: 4px 10px; font-family: 'JetBrains Mono', monospace; font-size: 12px; color: var(--adev-text); }
    .completion-item.selected { background: rgba(240, 160, 200, 0.1); color: var(--adev-primary); }
    .false-positive-list { display: flex; flex-direction: column; gap: 4px; }
    .fp-item { display: flex; align-items: center; gap: 12px; padding: 6px 10px; background: rgba(74, 222, 128, 0.04); border-radius: 4px; font-size: 13px; }
    .fp-item span { color: var(--adev-text-secondary); font-size: 12px; }
    .inspector-demo { background: var(--adev-code-bg); border: 1px solid var(--adev-code-border); border-radius: 8px; padding: 16px; font-family: 'JetBrains Mono', monospace; font-size: 12px; line-height: 1.6; color: var(--adev-code-text); }
    .inspector-header { font-weight: 700; color: #f472b6; margin-bottom: 8px; font-size: 14px; }
    .inspector-section { margin: 8px 0; padding: 8px 0; border-top: 1px solid var(--adev-code-border); }
    .inspector-section.warn { background: rgba(248, 113, 113, 0.06); margin: 8px -16px -16px; padding: 12px 16px; border-radius: 0 0 8px 8px; }
    .inspector-label { font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--adev-text-tertiary); margin-bottom: 4px; }
    .inspector-item { padding: 2px 0; color: var(--adev-code-text); }
    .inspector-origin { color: #60a5fa; font-weight: 600; margin-top: 6px; }
    .finding-list { display: flex; flex-direction: column; gap: 6px; margin: 12px 0; }
    .finding { padding: 8px 12px; border-radius: 6px; font-size: 13px; }
    .finding.bad { background: rgba(248, 113, 113, 0.06); border-left: 3px solid var(--adev-error); }
    .finding.good { background: rgba(74, 222, 128, 0.06); border-left: 3px solid var(--adev-success); }
    .limit-list { margin: 8px 0; padding-left: 20px; }
    .limit-list li { color: var(--adev-text-secondary); font-size: 13px; line-height: 1.8; }
    .hover-demo { margin: 12px 0; }
    .hover-trigger { background: var(--adev-code-bg); border: 1px solid var(--adev-code-border); border-radius: 6px; padding: 10px 14px; font-family: 'JetBrains Mono', monospace; font-size: 13px; color: var(--adev-code-text); margin-bottom: 4px; }
    .hover-popup { background: var(--adev-surface-2); border: 1px solid var(--adev-border); border-radius: 6px; padding: 12px 14px; margin-left: 20px; position: relative; }
    .hover-popup::before { content: ''; position: absolute; left: 20px; top: -6px; width: 10px; height: 10px; background: var(--adev-surface-2); border-left: 1px solid var(--adev-border); border-top: 1px solid var(--adev-border); transform: rotate(45deg); }
    .hover-title { font-weight: 700; font-size: 14px; color: var(--adev-primary); margin-bottom: 4px; }
    .hover-body { font-size: 13px; color: var(--adev-text-secondary); margin-bottom: 8px; }
    .hover-meta { display: flex; gap: 16px; font-size: 11px; color: var(--adev-text-tertiary); flex-wrap: wrap; }
    .hover-link { font-size: 11px; color: var(--adev-info); margin-top: 6px; }
    .phase-list { display: flex; flex-direction: column; gap: 6px; margin: 12px 0; }
    .phase { display: flex; align-items: flex-start; gap: 10px; padding: 8px 12px; border-radius: 6px; font-size: 13px; color: var(--adev-text-secondary); }
    .phase.done { background: rgba(74, 222, 128, 0.06); border-left: 3px solid var(--adev-success); }
    .phase.pending { background: rgba(251, 191, 36, 0.06); border-left: 3px solid var(--adev-warning); opacity: 0.7; }
    .phase-num { width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: 700; font-size: 11px; color: white; background: var(--adev-success); flex-shrink: 0; }
    .phase.pending .phase-num { background: var(--adev-warning); }
  `],
})
export class CssIntellisenseDemoComponent {}
