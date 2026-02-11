import {Component} from '@angular/core';

@Component({
  selector: 'app-host-element-demo',
  template: `
    <div class="demo-container">
      <div class="demo-header">
        <h2>HostElement AST &amp; Host Binding Type Safety</h2>
        <span class="badge he-badge">v21+</span>
        <span class="badge cap-badge">14 capabilities</span>
      </div>
      <p class="demo-description">
        The <code>HostElement</code> AST node (PR #60267, default in v21+ via #63654) brings Angular's
        host bindings into the same type-checking and language service pipeline as templates. Previously,
        <code>host: &#123;&#125;</code>, <code>&#64;HostBinding</code>, and <code>&#64;HostListener</code> were
        opaque strings with no type checking, no pipe tracking, and no language service support.
      </p>

      <!-- Architecture -->
      <div class="example-section">
        <h3>Architecture: HostElement Pipeline</h3>
        <p class="desc">Host bindings now flow through the same compiler pipeline as template expressions:</p>
        <div class="pipeline">
          <div class="pipe-step">
            <span class="pipe-label">1. Parse</span>
            <code>host: {{'{'}} '[attr.x]': 'expr' {{'}'}}</code>
            <span class="pipe-file">host_bindings.ts</span>
          </div>
          <div class="pipe-arrow">&darr;</div>
          <div class="pipe-step">
            <span class="pipe-label">2. Synthesize</span>
            <code>createHostElement()</code>
            <span class="pipe-detail">Parses into TmplAstBoundAttribute[] + TmplAstBoundEvent[]</span>
          </div>
          <div class="pipe-arrow">&darr;</div>
          <div class="pipe-step">
            <span class="pipe-label">3. AST</span>
            <code>HostElement</code> node
            <span class="pipe-detail">tagNames, bindings, listeners, sourceSpan</span>
          </div>
          <div class="pipe-arrow">&darr;</div>
          <div class="pipe-step">
            <span class="pipe-label">4. Bind</span>
            <code>R3TargetBinder.bind()</code>
            <span class="pipe-detail">TemplateBinder.ingest() — nesting=0, visits bindings/listeners</span>
          </div>
          <div class="pipe-arrow">&darr;</div>
          <div class="pipe-step">
            <span class="pipe-label">5. TCB</span>
            <code>TcbHostElementOp</code>
            <span class="pipe-detail">Type Check Block generation — DOM element variable, directive matching</span>
          </div>
          <div class="pipe-arrow">&darr;</div>
          <div class="pipe-step highlight-step">
            <span class="pipe-label">6. Language Service</span>
            <code>Inlay hints, CSS validation, navigation, selection range, completions</code>
          </div>
        </div>
      </div>

      <!-- Capability 1: Type Checking -->
      <div class="example-section">
        <h3><span class="cap-num">1</span> Type Checking of Host Property/Attribute/Style/Class Bindings</h3>
        <div class="code-block"><pre><code>&#64;Component({{'{'}}{{'}'}}
  host: {{'{'}}{{'}'}}
    '[attr.id]': 'exists + doesNotExist',  <span class="err">// ERROR: 'doesNotExist' does not exist</span>
    '[style.width.px]': 'width',           <span class="ok">// &#10003; type-checked</span>
    '[class.active]': 'isActive',          <span class="ok">// &#10003; type-checked</span>
    '[@fade]': 'animState',                <span class="ok">// &#10003; animation binding</span>
  {{'}'}},
{{'}'}})
</code></pre></div>
        <div class="before-after">
          <span class="before-tag">Before:</span> Silent, no errors.
          <span class="after-tag">Now:</span> Full type checking for all host binding types.
        </div>
      </div>

      <!-- Capability 2: Event Listener Type Checking -->
      <div class="example-section">
        <h3><span class="cap-num">2</span> Host Event Listeners Against Element Type</h3>
        <div class="code-block"><pre><code>&#64;Component({{'{'}}{{'}'}}
  selector: 'button[foo]',
  host: {{'{'}}'(click)': 'handleEvent($event)'{{'}'}},
  <span class="err">// ERROR if handleEvent expects KeyboardEvent</span>
  <span class="err">// — (click) on &lt;button&gt; gives PointerEvent</span>
{{'}'}})
</code></pre></div>
      </div>

      <!-- Capability 3: Tag Name Inference -->
      <div class="example-section">
        <h3><span class="cap-num">3</span> Tag Name Inference from Selector</h3>
        <p class="desc">The type checker infers element types from component selectors for DOM schema validation:</p>
        <div class="comparison-grid">
          <div class="comp-card ok-card">
            <div class="comp-label">Single selector — valid</div>
            <div class="code-block"><pre><code>&#64;Component({{'{'}}{{'}'}}
  selector: 'input[foo]',
  host: {{'{'}}'[value]': '123'{{'}'}},
  <span class="ok">// &#10003; Valid — &lt;input&gt; has value</span>
{{'}'}})
</code></pre></div>
          </div>
          <div class="comp-card err-card">
            <div class="comp-label">Multi-selector — error</div>
            <div class="code-block"><pre><code>&#64;Component({{'{'}}{{'}'}}
  selector: 'input[foo], div[foo]',
  host: {{'{'}}'[value]': '123'{{'}'}},
  <span class="err">// ERROR — &lt;div&gt; doesn't have value</span>
{{'}'}})
</code></pre></div>
          </div>
        </div>
      </div>

      <!-- Capability 4: @HostBinding Type Checking -->
      <div class="example-section">
        <h3><span class="cap-num">4</span> &#64;HostBinding Decorator Type Checking</h3>
        <div class="code-block"><pre><code>&#64;HostBinding() foo = 'foo';       <span class="err">// ERROR: 'foo' isn't known property</span>
&#64;HostBinding('foo') id = 'foo';   <span class="err">// ERROR: 'foo' isn't known property</span>
</code></pre></div>
      </div>

      <!-- Capability 5: @HostListener Argument Validation -->
      <div class="example-section">
        <h3><span class="cap-num">5</span> &#64;HostListener Argument Count &amp; Type Validation</h3>
        <div class="code-block"><pre><code><span class="err">// Missing $event arg:</span>
&#64;HostListener('click') handleClick(event: MouseEvent) {{'{'}}{{'}'}}
<span class="err">// ERROR: Expected 1 arguments, but got 0</span>

<span class="err">// Extra $event arg:</span>
&#64;HostListener('click', ['$event']) handleClick() {{'{'}}{{'}'}}
<span class="err">// ERROR: Expected 0 arguments, but got 1</span>

<span class="err">// Wrong $event type:</span>
&#64;HostListener('click', ['$event']) handleClick(v: string) {{'{'}}{{'}'}}
<span class="err">// ERROR: PointerEvent not assignable to string</span>
</code></pre></div>
      </div>

      <!-- Capability 6: Global Target Events -->
      <div class="example-section">
        <h3><span class="cap-num">6</span> &#64;HostListener with Document/Window/Body Targets</h3>
        <div class="code-block"><pre><code>&#64;HostListener('document:click', ['$event'])
handleEvent(event: KeyboardEvent) {{'{'}}{{'}'}}
<span class="err">// ERROR: PointerEvent not assignable to KeyboardEvent</span>

&#64;HostListener('window:resize', ['$event.target.innerWidth'])
onResize(w: number) {{'{'}}{{'}'}}
<span class="ok">// &#10003; Global target + property access</span>
</code></pre></div>
      </div>

      <!-- Capability 7: Animation Events -->
      <div class="example-section">
        <h3><span class="cap-num">7</span> Host Animation Event Listener Type Checking</h3>
        <div class="code-block"><pre><code>host: {{'{'}}'(&#64;someAnimation.done)': 'handleEvent()'{{'}'}},
<span class="err">// ERROR: Expected 1 argument but got 0</span>
<span class="err">// (handler expects AnimationEvent param)</span>
</code></pre></div>
      </div>

      <!-- Capability 8: Pipe Recording -->
      <div class="example-section highlight">
        <h3><span class="cap-num">8</span> Pipe Recording in Host Bindings</h3>
        <p class="desc">
          <strong>Critical fix:</strong> Without HostElement, pipes used in host binding expressions were
          <strong>never discovered</strong> during the binding phase, causing them to be silently ignored.
        </p>
        <div class="code-block"><pre><code>&#64;Component({{'{'}}{{'}'}}
  imports: [DatePipe],
  host: {{'{'}}{{'}'}}
    '[attr.data-time]': 'time | date:"short"',
    <span class="ok">// &#10003; Pipe 'date' is now tracked/resolved</span>

    '(click)': 'something($event | pipe)',
    <span class="ok">// &#10003; Pipe in event listener tracked</span>
  {{'}'}},
{{'}'}})
</code></pre></div>
        <div class="note-box">
          The <code>TemplateBinder</code> now visits host element bindings and listeners to record pipes
          in <code>usedPipes</code>/<code>eagerPipes</code>. Without this, pipes in host expressions
          would be silently ignored or produce incorrect type check blocks.
        </div>
      </div>

      <!-- Capability 9: Scope Isolation -->
      <div class="example-section">
        <h3><span class="cap-num">9</span> Scope Isolation — Template Locals Don't Leak</h3>
        <div class="code-block"><pre><code>&#64;Component({{'{'}}{{'}'}}
  host: {{'{'}}'[attr.id]': 'foo + bar'{{'}'}},
  <span class="err">// ERROR: 'bar' doesn't exist on component</span>

  template: \`&#64;let bar = 'bar'; {{'{{bar}}'}}\`
  <span class="ok">// 'bar' is template-local — doesn't leak to host</span>
{{'}'}})
</code></pre></div>
        <p class="desc">Template <code>#references</code> also don't leak into host scope.</p>
      </div>

      <!-- Capability 10: HostDirective Output Checking -->
      <div class="example-section">
        <h3><span class="cap-num">10</span> Host Listeners vs HostDirective Outputs</h3>
        <div class="code-block"><pre><code>&#64;Component({{'{'}}{{'}'}}
  host: {{'{'}}'(customEvent)': 'expectsNumber($event)'{{'}'}},
  hostDirectives: [{{'{'}}{{'}'}}
    directive: HostDir,
    outputs: ['customEvent: alias']
  {{'}'}},{{'}'}}]
{{'}'}})
<span class="err">// ERROR: $event type from HostDir output (string)</span>
<span class="err">// not assignable to number</span>
</code></pre></div>
      </div>

      <!-- Capability 11: Private Member Access -->
      <div class="example-section">
        <h3><span class="cap-num">11</span> Private Member Access Checking</h3>
        <div class="code-block"><pre><code>&#64;HostBinding() private id = '123';
<span class="err">// ERROR: 'id' is private</span>

&#64;HostListener('click') private handleClick() {{'{'}}{{'}'}}
<span class="err">// ERROR: 'handleClick' is private</span>
</code></pre></div>
      </div>

      <!-- Capability 12: Generic Components -->
      <div class="example-section">
        <h3><span class="cap-num">12</span> Generic Component Type Checking in Host Context</h3>
        <div class="code-block"><pre><code>&#64;Component({{'{'}}{{'}'}}host: {{'{'}}'(customEvent)': 'doesNotExist()'{{'}'}}{{'}'}}{{'}'}})
export class App&lt;T&gt; {{'{'}} ... {{'}'}}
<span class="err">// ERROR: Property 'doesNotExist' does not exist on type 'App&lt;T&gt;'</span>
</code></pre></div>
      </div>

      <!-- Capability 13: Language Service Features -->
      <div class="example-section highlight">
        <h3><span class="cap-num">13</span> Language Service Features for Host Bindings</h3>
        <p class="desc">Now that host bindings are part of the AST pipeline, all these features work:</p>
        <div class="feature-table">
          <div class="ft-row"><span class="ft-icon">&#128161;</span><strong>Inlay hints</strong><span>Type hints for host binding expressions</span></div>
          <div class="ft-row"><span class="ft-icon">&#127912;</span><strong>CSS validation</strong><span>CSS property/value validation for [style.x]</span></div>
          <div class="ft-row"><span class="ft-icon">&#9888;&#65039;</span><strong>Attribute conflict</strong><span>Conflict detection between host &amp; template bindings</span></div>
          <div class="ft-row"><span class="ft-icon">&#128269;</span><strong>Navigation</strong><span>Go-to-definition in host binding expressions</span></div>
          <div class="ft-row"><span class="ft-icon">&#9999;&#65039;</span><strong>Selection range</strong><span>Smart expand selection in host binding strings</span></div>
          <div class="ft-row"><span class="ft-icon">&#128295;</span><strong>Completions</strong><span>Auto-complete in host binding expressions</span></div>
        </div>
      </div>

      <!-- Capability 14: Signal Forms -->
      <div class="example-section">
        <h3><span class="cap-num">14</span> Signal Input/Output Form Checking</h3>
        <p class="desc">
          <code>signal_forms.ts</code> handles HostElement specially, using <code>node.bindings</code>
          instead of <code>node.inputs</code> for signal-based inputs on host elements.
        </p>
      </div>

      <!-- @HostListener Full Syntax Catalog -->
      <div class="example-section catalog">
        <h3>&#64;HostListener — Complete Syntax Catalog</h3>

        <h4>Simple DOM Events</h4>
        <div class="syntax-grid">
          <code>&#64;HostListener('click')</code>
          <code>&#64;HostListener('mousedown')</code>
          <code>&#64;HostListener('input')</code>
          <code>&#64;HostListener('scroll')</code>
        </div>

        <h4>With $event and Access Expressions</h4>
        <div class="syntax-grid">
          <code>&#64;HostListener('click', ['$event'])</code>
          <code>&#64;HostListener('click', ['$event.target'])</code>
          <code>&#64;HostListener('input', ['$event.target.value'])</code>
        </div>

        <h4>Global Target Events</h4>
        <div class="syntax-grid">
          <code>&#64;HostListener('window:keydown', ['$event'])</code>
          <code>&#64;HostListener('document:click', ['$event'])</code>
          <code>&#64;HostListener('body:click', ['$event'])</code>
          <code>&#64;HostListener('window:scroll')</code>
        </div>

        <h4>Keyboard Modifiers (KeyEventsPlugin)</h4>
        <p class="desc">Supported modifiers: <code>alt</code>, <code>control</code>, <code>meta</code>, <code>shift</code></p>
        <div class="syntax-grid">
          <code>&#64;HostListener('keydown.enter', ['$event'])</code>
          <code>&#64;HostListener('keydown.shift.enter', ['$event'])</code>
          <code>&#64;HostListener('keydown.control.shift.a', ['$event'])</code>
          <code>&#64;HostListener('keyup.escape', ['$event'])</code>
          <code>&#64;HostListener('window:keydown.enter', ['$event'])</code>
        </div>

        <h4>Animation Events</h4>
        <div class="syntax-grid">
          <code>&#64;HostListener('&#64;someAnimation.done', ['$event'])</code>
          <code>host: {{'{'}} '(&#64;someAnimation.done)': 'handleEvent()' {{'}'}}</code>
        </div>
      </div>

      <!-- @HostBinding Full Syntax Catalog -->
      <div class="example-section catalog">
        <h3>&#64;HostBinding — Complete Prefix Patterns</h3>

        <h4>Property Bindings</h4>
        <div class="code-block"><pre><code>&#64;HostBinding('id') elementId = 'my-id';
&#64;HostBinding('value') inputValue = '';
&#64;HostBinding() id = 'default-name';  <span class="dim">// Uses property name if no argument</span>
</code></pre></div>

        <h4>Attribute Bindings (<code>attr.</code> prefix)</h4>
        <div class="code-block"><pre><code>&#64;HostBinding('attr.aria-label') ariaLabel = 'description';
&#64;HostBinding('attr.data-id') dataId = '123';
&#64;HostBinding('attr.role') role = 'button';
</code></pre></div>

        <h4>Class Bindings (<code>class.</code> prefix)</h4>
        <div class="code-block"><pre><code>&#64;HostBinding('class.active') isActive = false;
&#64;HostBinding('class.disabled') isDisabled = false;
</code></pre></div>

        <h4>Style Bindings (<code>style.</code> prefix)</h4>
        <div class="code-block"><pre><code>&#64;HostBinding('style.width.px') width = 100;
&#64;HostBinding('style.color') textColor = 'red';
&#64;HostBinding('style.display') display = 'block';
&#64;HostBinding('style.background-color') bgColor = 'blue';
</code></pre></div>

        <h4>Animation Bindings (<code>&#64;</code> or <code>animate.</code> prefix)</h4>
        <div class="code-block"><pre><code>&#64;HostBinding('&#64;fadeAnimation') animationState = 'active';
host: {{'{'}} '[&#64;someAnimation]': 'animationState' {{'}'}}
</code></pre></div>
      </div>

      <!-- $event Type Inference Map -->
      <div class="example-section">
        <h3>$event Type Inference Map</h3>
        <p class="desc">
          The TCB generates <code>addEventListener</code> calls so TypeScript infers $event from
          <code>HTMLElementEventMap</code>:
        </p>
        <div class="type-map">
          <div class="tm-row"><code>'click'</code><span class="tm-arrow">&rarr;</span><code class="tm-type">PointerEvent</code></div>
          <div class="tm-row"><code>'keydown'</code><span class="tm-arrow">&rarr;</span><code class="tm-type">KeyboardEvent</code></div>
          <div class="tm-row"><code>'input'</code><span class="tm-arrow">&rarr;</span><code class="tm-type">InputEvent</code></div>
          <div class="tm-row"><code>'focus'</code><span class="tm-arrow">&rarr;</span><code class="tm-type">FocusEvent</code></div>
          <div class="tm-row"><code>'scroll'</code><span class="tm-arrow">&rarr;</span><code class="tm-type">Event</code></div>
          <div class="tm-row"><code>'mousedown'</code><span class="tm-arrow">&rarr;</span><code class="tm-type">MouseEvent</code></div>
          <div class="tm-row dim-row"><code>(unknown event)</code><span class="tm-arrow">&rarr;</span><code class="tm-type">Event</code></div>
        </div>
      </div>

      <!-- Configuration Flags -->
      <div class="example-section">
        <h3>Type-Checking Configuration Flags</h3>
        <div class="flag-list">
          <div class="flag-item"><code>checkTypeOfDomEvents</code><span>Infer $event type from HTMLElementEventMap</span></div>
          <div class="flag-item"><code>checkTypeOfOutputEvents</code><span>Validate directive/component output event types</span></div>
          <div class="flag-item"><code>checkTypeOfAnimationEvents</code><span>Validate animation event types (AnimationEvent)</span></div>
        </div>
      </div>

      <!-- Before/After Summary -->
      <div class="example-section highlight">
        <h3>What Was NOT Previously Possible</h3>
        <p class="desc">Before HostElement, <strong>all</strong> of the above were impossible:</p>
        <div class="impact-list">
          <div class="impact-item bad"><span class="impact-icon">&#10060;</span>No error detection — <code>host: {{'{'}}'[nonExistent]': 'expr'{{'}'}}</code> compiled silently</div>
          <div class="impact-item bad"><span class="impact-icon">&#10060;</span>No pipe tracking — pipes in host bindings never discovered</div>
          <div class="impact-item bad"><span class="impact-icon">&#10060;</span>No language service — no hover, go-to-def, completions, inlay hints for host</div>
          <div class="impact-item bad"><span class="impact-icon">&#10060;</span>No type narrowing — $event type unknown in host listeners</div>
          <div class="impact-item bad"><span class="impact-icon">&#10060;</span>No scope isolation — template variables appeared to work in host</div>
          <div class="impact-item bad"><span class="impact-icon">&#10060;</span>No selector-based schema — couldn't validate against actual element type</div>
          <div class="impact-item bad"><span class="impact-icon">&#10060;</span>No private member detection — private members usable in host without error</div>
          <div class="impact-item bad"><span class="impact-icon">&#10060;</span>No signal form checking — signal inputs/outputs in host not validated</div>
        </div>
        <div class="note-box">
          This is one of the most significant Angular compiler features — it brings host bindings to
          <strong>full type-safety parity</strong> with templates.
        </div>
      </div>

      <!-- Test Coverage -->
      <div class="example-section dim">
        <h3>Test Coverage</h3>
        <div class="test-list">
          <div class="test-item"><code>host_bindings_type_check_spec.ts</code><span>38 test cases — primary test file</span></div>
          <div class="test-item"><code>ngtsc_spec.ts#L5526</code><span>Pipes in host listener arguments</span></div>
          <div class="test-item"><code>integration_spec.ts#L935</code><span>Runtime error: pipes in host</span></div>
          <div class="test-item"><code>parser_spec.ts#L1903</code><span>Parser rejection of pipes in host (11 tests)</span></div>
          <div class="test-item"><code>host_binding_spec.ts</code><span>Runtime host binding acceptance tests</span></div>
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
    .he-badge { background: rgba(96, 165, 250, 0.12); color: #60a5fa; border: 1px solid rgba(96, 165, 250, 0.25); }
    .cap-badge { background: rgba(74, 222, 128, 0.12); color: #22c55e; border: 1px solid rgba(74, 222, 128, 0.25); }
    code { background: var(--adev-code-bg); border: 1px solid var(--adev-code-border); padding: 2px 6px; border-radius: 4px; font-size: 12px; color: var(--adev-primary); font-family: 'JetBrains Mono', monospace; }
    .example-section { background: var(--adev-surface); border: 1px solid var(--adev-border); border-left: 3px solid var(--adev-info); padding: 20px; margin: 20px 0; border-radius: 8px; }
    .example-section.highlight { border-left-color: var(--adev-warning); background: rgba(251, 191, 36, 0.03); }
    .example-section.catalog { border-left-color: var(--adev-primary); }
    .example-section.dim { border-left-color: var(--adev-text-tertiary); opacity: 0.8; }
    h3 { color: var(--adev-text); margin-top: 0; font-size: 16px; font-weight: 600; }
    h4 { color: var(--adev-text); font-size: 14px; font-weight: 600; margin: 16px 0 8px; }
    .desc { color: var(--adev-text-secondary); font-size: 14px; margin: 8px 0 12px; }
    .cap-num { display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 50%; font-weight: 700; font-size: 11px; color: white; background: var(--adev-primary); margin-right: 6px; }
    .code-block { background: var(--adev-code-bg); border: 1px solid var(--adev-code-border); border-radius: 8px; padding: 14px; margin: 8px 0; overflow-x: auto; }
    .code-block pre { margin: 0; }
    .code-block code { background: none; border: none; padding: 0; font-size: 12px; color: var(--adev-code-text); line-height: 1.6; }
    .err { color: #f87171; }
    .ok { color: #4ade80; }
    .dim { color: #64748b; }
    .before-after { font-size: 13px; color: var(--adev-text-secondary); margin-top: 8px; }
    .before-tag { font-weight: 600; color: #f87171; }
    .after-tag { font-weight: 600; color: #4ade80; margin-left: 12px; }
    .comparison-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .comp-card { border-radius: 8px; }
    .comp-label { font-size: 12px; font-weight: 600; color: var(--adev-text-secondary); margin-bottom: 6px; }
    .ok-card .comp-label { color: #4ade80; }
    .err-card .comp-label { color: #f87171; }
    .note-box { background: var(--adev-surface); border: 1px solid var(--adev-border); border-left: 3px solid var(--adev-info); border-radius: 8px; padding: 14px 16px; font-size: 14px; color: var(--adev-text-secondary); line-height: 1.6; margin-top: 12px; }
    .pipeline { display: flex; flex-direction: column; align-items: center; gap: 4px; margin: 16px 0; }
    .pipe-step { background: var(--adev-surface-2); border: 1px solid var(--adev-border); border-radius: 8px; padding: 10px 16px; width: 100%; display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
    .pipe-step.highlight-step { border-color: var(--adev-primary); background: rgba(240, 160, 200, 0.06); }
    .pipe-label { font-size: 11px; font-weight: 700; color: var(--adev-text-tertiary); text-transform: uppercase; letter-spacing: 0.5px; min-width: 80px; }
    .pipe-file { font-size: 11px; color: var(--adev-text-tertiary); margin-left: auto; }
    .pipe-detail { font-size: 11px; color: var(--adev-text-tertiary); }
    .pipe-arrow { color: var(--adev-text-tertiary); font-size: 16px; }
    .feature-table { display: flex; flex-direction: column; gap: 6px; margin: 12px 0; }
    .ft-row { display: flex; align-items: center; gap: 10px; padding: 8px 12px; background: var(--adev-surface-2); border-radius: 6px; font-size: 13px; }
    .ft-icon { font-size: 16px; }
    .ft-row span:last-child { color: var(--adev-text-secondary); margin-left: auto; font-size: 12px; }
    .syntax-grid { display: flex; flex-wrap: wrap; gap: 8px; margin: 8px 0; }
    .syntax-grid code { font-size: 11px; }
    .type-map { display: flex; flex-direction: column; gap: 4px; margin: 12px 0; }
    .tm-row { display: flex; align-items: center; gap: 10px; padding: 6px 12px; background: var(--adev-surface-2); border-radius: 6px; font-size: 13px; }
    .tm-row.dim-row { opacity: 0.6; }
    .tm-arrow { color: var(--adev-text-tertiary); }
    .tm-type { color: #60a5fa; font-weight: 600; }
    .flag-list { display: flex; flex-direction: column; gap: 6px; }
    .flag-item { display: flex; align-items: center; gap: 12px; padding: 8px 12px; background: var(--adev-surface-2); border-radius: 6px; font-size: 13px; }
    .flag-item span { color: var(--adev-text-secondary); font-size: 12px; }
    .impact-list { display: flex; flex-direction: column; gap: 6px; margin: 12px 0; }
    .impact-item { display: flex; align-items: flex-start; gap: 8px; padding: 8px 12px; border-radius: 6px; font-size: 13px; color: var(--adev-text-secondary); }
    .impact-item.bad { background: rgba(248, 113, 113, 0.06); }
    .impact-icon { flex-shrink: 0; }
    .test-list { display: flex; flex-direction: column; gap: 6px; }
    .test-item { display: flex; align-items: center; gap: 12px; padding: 6px 10px; background: var(--adev-surface-2); border-radius: 4px; font-size: 12px; }
    .test-item span { color: var(--adev-text-secondary); font-size: 12px; }
    @media (max-width: 768px) { .comparison-grid { grid-template-columns: 1fr; } }
  `],
})
export class HostElementDemoComponent {}
