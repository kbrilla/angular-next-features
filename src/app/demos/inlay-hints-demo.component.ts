import {Component} from '@angular/core';

@Component({
  selector: 'app-inlay-hints-demo',
  template: `
    <div class="demo-page">
      <div class="demo-header">
        <h2>Angular-Specific Inlay Hints</h2>
        <span class="badge">LSP 3.17</span>
        <span class="badge test-badge">118 Test Cases</span>
      </div>
      <p class="demo-description">
        Rich, configurable inlay hints for Angular templates &mdash; showing types for control flow
        variables, event parameters, pipe outputs, input bindings, host bindings, and more. Fully
        aligned with TypeScript's inlay hints configuration. All examples below are derived from the
        actual spec (<code>inlay_hints_spec.ts</code>) with 118 test scenarios.
      </p>

      <!-- FULL CONFIGURATION REFERENCE -->
      <section class="example-section config-section">
        <h3>Complete Configuration Reference</h3>
        <p class="desc">
          All options configurable via VS Code settings or Angular language service plugin config.
          Options mirror TypeScript's where applicable.
        </p>
        <div class="code-block wide">
          <pre>// VS Code settings.json
{{ '{' }}
  <span class="hl-comment">// Variable Type Hints</span>
  "angular.inlayHints.forLoopVariableTypes": true,
  "angular.inlayHints.ifAliasTypes": "complex",
  "angular.inlayHints.letDeclarationTypes": true,
  "angular.inlayHints.referenceVariableTypes": true,
  "angular.inlayHints.switchExpressionTypes": true,
  "angular.inlayHints.deferTriggerTypes": true,

  <span class="hl-comment">// Event Parameter Hints</span>
  "angular.inlayHints.eventParameterTypes": true,
  "angular.inlayHints.hostListenerArgumentTypes": true,

  <span class="hl-comment">// Property Binding Hints</span>
  "angular.inlayHints.propertyBindingTypes": true,
  "angular.inlayHints.requiredInputIndicator": "none",

  <span class="hl-comment">// Pipe Hints</span>
  "angular.inlayHints.pipeOutputTypes": true,

  <span class="hl-comment">// Parameter Name Hints</span>
  "angular.inlayHints.parameterNameHints": "all",
  "angular.inlayHints.parameterNameHintsWhenArgumentMatchesName": false,

  <span class="hl-comment">// Arrow Function Hints</span>
  "angular.inlayHints.arrowFunctionParameterTypes": true,
  "angular.inlayHints.arrowFunctionReturnTypes": true,

  <span class="hl-comment">// Behavior Modifiers</span>
  "angular.inlayHints.variableTypeHintsWhenTypeMatchesName": true,
  "angular.inlayHints.interactiveInlayHints": false
{{ '}' }}</pre>
        </div>
      </section>

      <!-- 1. VARIABLE TYPE HINTS -->
      <section class="example-section">
        <h3>1. Variable Type Hints</h3>
        <p class="desc">
          Inline type annotations for template-declared variables. Covers &#64;for, &#64;if, &#64;let,
          template refs, &#64;switch, &#64;defer, ng-template, and legacy structural directives.
        </p>
        <div class="hint-grid">
          <div class="hint-example">
            <div class="hint-label">&#64;for loop variable</div>
            <div class="code-block"><pre>&#64;for (<span class="hl-var">user</span><span class="hl-hint">: User</span> of users; track user.id) {{ '{' }}
  {{ '{{ user.name }}' }}
{{ '}' }}</pre></div>
            <div class="config-tag">forLoopVariableTypes: true</div>
            <div class="test-ref">Spec #1</div>
          </div>

          <div class="hint-example">
            <div class="hint-label">&#64;for context variables</div>
            <div class="code-block"><pre>&#64;for (<span class="hl-var">item</span><span class="hl-hint">: string</span> of items; track $index;
  let <span class="hl-var">i</span><span class="hl-hint">: number</span> = $index,
      <span class="hl-var">c</span><span class="hl-hint">: number</span> = $count,
      <span class="hl-var">f</span><span class="hl-hint">: boolean</span> = $first,
      <span class="hl-var">l</span><span class="hl-hint">: boolean</span> = $last)</pre></div>
            <div class="config-tag">forLoopVariableTypes: true</div>
            <div class="test-ref">Spec #2, #113 &mdash; no duplicate hints</div>
          </div>

          <div class="hint-example">
            <div class="hint-label">&#64;if alias (simple)</div>
            <div class="code-block"><pre>&#64;if (currentUser; as <span class="hl-var">u</span><span class="hl-hint">: User</span>) {{ '{' }}
  {{ '{{ u.name }}' }}
{{ '}' }}</pre></div>
            <div class="config-tag">ifAliasTypes: true</div>
            <div class="test-ref">Spec #3 &mdash; type narrowing applied</div>
          </div>

          <div class="hint-example">
            <div class="hint-label">&#64;if alias (complex mode)</div>
            <div class="code-block"><pre><span class="hl-comment">// ifAliasTypes: 'complex' &mdash; hides simple reads</span>
&#64;if (currentUser; as u)     <span class="hl-dim">// NO hint (simple)</span>
&#64;if (user?.name; as <span class="hl-var">n</span><span class="hl-hint">: string</span>)
&#64;if (items.length &gt; 0; as <span class="hl-var">ok</span><span class="hl-hint">: boolean</span>)</pre></div>
            <div class="config-tag">ifAliasTypes: 'complex'</div>
            <div class="test-ref">Spec #79-81 &mdash; smart filtering</div>
          </div>

          <div class="hint-example">
            <div class="hint-label">&#64;let declarations</div>
            <div class="code-block"><pre>&#64;let <span class="hl-var">count</span><span class="hl-hint">: number</span> = items.length;
&#64;let <span class="hl-var">doubled</span><span class="hl-hint">: number</span> = count * 2;</pre></div>
            <div class="config-tag">letDeclarationTypes: true</div>
            <div class="test-ref">Spec #5</div>
          </div>

          <div class="hint-example">
            <div class="hint-label">Template references</div>
            <div class="code-block"><pre>&lt;input <span class="hl-var">#nameInput</span><span class="hl-hint">: HTMLInputElement</span> /&gt;
&lt;div tooltip <span class="hl-var">#tip</span><span class="hl-hint">: TooltipDirective</span>="tooltip"&gt;</pre></div>
            <div class="config-tag">referenceVariableTypes: true</div>
            <div class="test-ref">Spec #13-14</div>
          </div>

          <div class="hint-example">
            <div class="hint-label">&#64;switch expressions</div>
            <div class="code-block"><pre>&#64;switch (<span class="hl-var">status</span><span class="hl-hint">: Status</span>) {{ '{' }}
  &#64;case (Status.Active) {{ '{' }} Active {{ '}' }}
{{ '}' }}
&#64;switch (<span class="hl-var">user?.id</span><span class="hl-hint">: number | undefined</span>) {{ '{' }}
  &#64;case (1) {{ '{' }} First {{ '}' }}
{{ '}' }}</pre></div>
            <div class="config-tag">switchExpressionTypes: true</div>
            <div class="test-ref">Spec #43-46</div>
          </div>

          <div class="hint-example">
            <div class="hint-label">&#64;defer trigger &amp; ng-template</div>
            <div class="code-block"><pre>&#64;defer (when <span class="hl-var">isVisible</span><span class="hl-hint">: boolean</span>) {{ '{' }}
  &lt;heavy-component /&gt;
{{ '}' }}

&lt;ng-template let-<span class="hl-var">user</span><span class="hl-hint">: User</span>
  let-<span class="hl-var">extra</span><span class="hl-hint">: string</span>="extra"&gt;</pre></div>
            <div class="test-ref">Spec #47-49</div>
          </div>

          <div class="hint-example">
            <div class="hint-label">*ngFor / *ngIf (legacy)</div>
            <div class="code-block"><pre>&lt;li *ngFor="let <span class="hl-var">item</span><span class="hl-hint">: string</span> of items;
  let <span class="hl-var">idx</span><span class="hl-hint">: number</span> = index"&gt;
&lt;div *ngIf="data as <span class="hl-var">result</span><span class="hl-hint">: Data</span>"&gt;</pre></div>
            <div class="test-ref">Spec #15, #50</div>
          </div>

          <div class="hint-example">
            <div class="hint-label">&#64;if fine-grained &amp; &#64;else if</div>
            <div class="code-block"><pre>ifAliasTypes: {{ '{' }}
  simpleExpressions: false,
  complexExpressions: true
{{ '}' }}

&#64;if (cond1; as <span class="hl-var">a</span><span class="hl-hint">: string</span>) {{ '{' }} ...
{{ '}' }} &#64;else if (cond2; as <span class="hl-var">b</span><span class="hl-hint">: number</span>) {{ '{' }} ...
{{ '}' }}</pre></div>
            <div class="test-ref">Spec #4, #82</div>
          </div>
        </div>
      </section>

      <!-- 2. EVENT PARAMETER HINTS -->
      <section class="example-section">
        <h3>2. Event Parameter Type Hints</h3>
        <p class="desc">
          Shows the inferred type of <code>$event</code>. Configurable per source:
          native DOM events, component outputs, animation events. 16 tested DOM event types.
        </p>
        <div class="hint-grid">
          <div class="hint-example">
            <div class="hint-label">Native DOM events</div>
            <div class="code-block"><pre>&lt;button (<span class="hl-event">click</span><span class="hl-hint">: MouseEvent</span>)="onClick($event)"&gt;
&lt;input (<span class="hl-event">keydown</span><span class="hl-hint">: KeyboardEvent</span>)="onKey($event)"&gt;
&lt;input (<span class="hl-event">keydown.enter</span><span class="hl-hint">: KeyboardEvent</span>)="enter()"&gt;
&lt;input (<span class="hl-event">focus</span><span class="hl-hint">: FocusEvent</span>)="onFocus($event)"&gt;
&lt;input (<span class="hl-event">input</span><span class="hl-hint">: Event</span>)="onInput($event)"&gt;
&lt;div (<span class="hl-event">dragover</span><span class="hl-hint">: DragEvent</span>)="onDrag($event)"&gt;</pre></div>
            <div class="config-tag">eventParameterTypes: true</div>
            <div class="test-ref">Spec #70-77</div>
          </div>

          <div class="hint-example">
            <div class="hint-label">Component output / model()</div>
            <div class="code-block"><pre><span class="hl-comment">// EventEmitter&lt;string&gt;</span>
&lt;app (<span class="hl-event">queryChange</span><span class="hl-hint">: string</span>)="onSearch($event)"&gt;
<span class="hl-comment">// output&lt;number&gt;()</span>
&lt;app (<span class="hl-event">changed</span><span class="hl-hint">: number</span>)="onChange($event)"&gt;
<span class="hl-comment">// model() change</span>
&lt;app ((<span class="hl-event">valueChange</span><span class="hl-hint">: string</span>))="val = $event"&gt;</pre></div>
            <div class="test-ref">Spec #52-54</div>
          </div>

          <div class="hint-example">
            <div class="hint-label">Animation events</div>
            <div class="code-block"><pre>&lt;div [&#64;anim]="state"
  (&#64;anim.done<span class="hl-hint">: AnimationEvent</span>)="onDone($event)"
  (&#64;anim.start<span class="hl-hint">: AnimationEvent</span>)="onStart($event)"&gt;</pre></div>
            <div class="test-ref">Spec #55</div>
          </div>

          <div class="hint-example">
            <div class="hint-label">Fine-grained event config</div>
            <div class="code-block"><pre>eventParameterTypes: {{ '{' }}
  componentEvents: false,
  nativeEvents: true,
  animationEvents: true
{{ '}' }}</pre></div>
            <div class="test-ref">Spec #68-69</div>
          </div>
        </div>
      </section>

      <!-- 3. HOST BINDINGS -->
      <section class="example-section">
        <h3>3. Host Binding &amp; &#64;HostListener Hints</h3>
        <p class="desc">
          Hints work in host bindings and &#64;HostListener decorators &mdash; $event property access,
          window/document events, keyboard modifiers, method calls, arithmetic expressions.
          <strong>15 distinct test cases.</strong>
        </p>
        <div class="hint-grid">
          <div class="hint-example">
            <div class="hint-label">&#64;HostListener $event properties</div>
            <div class="code-block"><pre>&#64;HostListener('click', [
  '<span class="hl-var">$event.target</span><span class="hl-hint">: EventTarget</span>',
  '<span class="hl-var">$event.clientX</span><span class="hl-hint">: number</span>',
  '<span class="hl-var">$event.clientY</span><span class="hl-hint">: number</span>'
])</pre></div>
            <div class="test-ref">Spec #18, #41</div>
          </div>

          <div class="hint-example">
            <div class="hint-label">Window/Document events</div>
            <div class="code-block"><pre>&#64;HostListener('<span class="hl-event">window:resize</span>',
  ['$event.target.innerWidth'])
&#64;HostListener('<span class="hl-event">document:keydown</span>',
  ['$event.key', '$event.ctrlKey'])
&#64;HostListener('click',
  ['$event.target<span class="hl-event">?.</span>nodeName'])</pre></div>
            <div class="test-ref">Spec #22-24</div>
          </div>

          <div class="hint-example">
            <div class="hint-label">Host metadata (mixed)</div>
            <div class="code-block"><pre>host: {{ '{' }}
  '(<span class="hl-event">click</span>)': 'onClick($event)',
  '(<span class="hl-event">keydown.enter</span>)': 'onEnter($event)',
  '(<span class="hl-event">keydown.shift.enter</span>)': 'onShift()',
  '[disabled]': 'isDisabled',
  '[class.active]': 'isActive',
  '[style.width.px]': 'width',
  '[attr.aria-label]': 'label'
{{ '}' }}</pre></div>
            <div class="test-ref">Spec #35-42</div>
          </div>

          <div class="hint-example">
            <div class="hint-label">&#64;HostBinding types &amp; animation</div>
            <div class="code-block"><pre>&#64;HostBinding('disabled') isDisabled = false;
&#64;HostBinding('class.active') isActive = true;
&#64;HostBinding('style.width.px') width = 100;
&#64;HostBinding('attr.aria-label') ariaLabel;

host: {{ '{' }}
  '[&#64;fade]': 'state',
  '(&#64;fade.done)': 'onDone($event)'
{{ '}' }}</pre></div>
            <div class="test-ref">Spec #30-35, #42</div>
          </div>
        </div>
      </section>

      <!-- 4. PIPE HINTS -->
      <section class="example-section">
        <h3>4. Pipe Output &amp; Parameter Hints</h3>
        <div class="hint-grid">
          <div class="hint-example">
            <div class="hint-label">Return type &amp; parameter names</div>
            <div class="code-block"><pre>{{ '{{ name | upper' }}<span class="hl-hint">: string</span> {{ '}}' }}
{{ '{{ data$ | async' }}<span class="hl-hint">: Data | null</span> {{ '}}' }}
{{ '{{ name | format : ' }}<span class="hl-hint">prefix:</span> '[' : <span class="hl-hint">suffix:</span> ']'<span class="hl-hint">: string</span> {{ '}}' }}
{{ '{{ today | date : ' }}<span class="hl-hint">format:</span> 'short'<span class="hl-hint">: string | null</span> {{ '}}' }}</pre></div>
            <div class="test-ref">Spec #8-12</div>
          </div>

          <div class="hint-example">
            <div class="hint-label">Overloaded &amp; chained</div>
            <div class="code-block"><pre><span class="hl-comment">// Overloaded: resolves by input type</span>
{{ '{{ name | nullable' }}<span class="hl-hint">: string | null</span> {{ '}}' }}
<span class="hl-comment">// Chained: each gets own type hint</span>
{{ '{{ name | prefix : ' }}'['<span class="hl-hint">: string</span>
  | suffix : ']'<span class="hl-hint">: string</span> {{ '}}' }}</pre></div>
            <div class="test-ref">Spec #11, #105</div>
          </div>
        </div>
      </section>

      <!-- 5. PROPERTY BINDING HINTS -->
      <section class="example-section">
        <h3>5. Property Binding &amp; Input Hints</h3>
        <div class="hint-grid">
          <div class="hint-example">
            <div class="hint-label">Input types &amp; required indicators</div>
            <div class="code-block"><pre>&lt;div [<span class="hl-var">user</span><span class="hl-hint">: User</span>]="currentUser"&gt;
<span class="hl-comment">// requiredInputIndicator: 'asterisk'</span>
&lt;app [<span class="hl-var">config</span><span class="hl-hint">: FormConfig*</span>]="cfg"&gt;
<span class="hl-comment">// requiredInputIndicator: 'exclamation'</span>
&lt;app [<span class="hl-var">config</span><span class="hl-hint">: FormConfig!</span>]="cfg"&gt;</pre></div>
            <div class="test-ref">Spec #51, #86-89</div>
          </div>

          <div class="hint-example">
            <div class="hint-label">Text attrs &amp; fine-grained config</div>
            <div class="code-block"><pre>&lt;div textInput
  <span class="hl-var">text</span><span class="hl-hint">: string!</span>="hello"&gt;
<span class="hl-comment">// NOT shown for regular HTML attrs</span>

propertyBindingTypes: {{ '{' }}
  componentInputs: true,
  nativeProperties: false
{{ '}' }}</pre></div>
            <div class="test-ref">Spec #84-85, #90-92</div>
          </div>
        </div>
      </section>

      <!-- 6. PARAMETER NAME HINTS -->
      <section class="example-section">
        <h3>6. Parameter Name Hints</h3>
        <div class="hint-grid">
          <div class="hint-example">
            <div class="hint-label">All mode &amp; literals only</div>
            <div class="code-block"><pre>(click)="moveTo(<span class="hl-hint">x:</span> 100, <span class="hl-hint">y:</span> 200)"

<span class="hl-comment">// 'literals' mode: only for non-variable args</span>
{{ '{{ formatValue(' }}<span class="hl-hint">num:</span> 42, name{{ ') }}' }}
(click)="log(<span class="hl-hint">msg:</span> &#96;hello&#96;)"
(click)="setItems(<span class="hl-hint">items:</span> [1,2,3])"</pre></div>
            <div class="test-ref">Spec #58, #60, #95-99</div>
          </div>

          <div class="hint-example">
            <div class="hint-label">Rest params &amp; overloads</div>
            <div class="code-block"><pre>(click)="log(<span class="hl-hint">prefix:</span> 'msg',
  <span class="hl-hint">...items:</span> 'a', 'b', 'c')"

<span class="hl-comment">// Suppressed when arg matches param name:</span>
(click)="handleClick(event)" <span class="hl-dim">// NO hint</span>

{{ '{{ format(' }}<span class="hl-hint">value:</span> 'hello', <span class="hl-hint">count:</span> 42{{ ') }}' }}</pre></div>
            <div class="test-ref">Spec #61-64, #101-102</div>
          </div>
        </div>
      </section>

      <!-- 7. ARROW FUNCTIONS & EDGE CASES -->
      <section class="example-section">
        <h3>7. Arrow Functions, Generics &amp; Edge Cases</h3>
        <div class="hint-grid">
          <div class="hint-example">
            <div class="hint-label">Arrow function types</div>
            <div class="code-block"><pre>{{ '{{ items.filter((' }}<span class="hl-var">item</span><span class="hl-hint">: Item</span>) =&gt; item.active{{ ') }}' }}
{{ '{{ items.reduce((a, b)' }}<span class="hl-hint">: number</span> =&gt; a + b{{ ') }}' }}</pre></div>
            <div class="test-ref">Spec #93</div>
          </div>

          <div class="hint-example">
            <div class="hint-label">Generic inference</div>
            <div class="code-block"><pre>&#64;let <span class="hl-var">result</span><span class="hl-hint">: string</span> = identity('hello');
&#64;let <span class="hl-var">box</span><span class="hl-hint">: Box&lt;number&gt;</span> = makeBox(123);</pre></div>
            <div class="test-ref">Spec #107-108</div>
          </div>

          <div class="hint-example">
            <div class="hint-label">Type-matches-name suppression</div>
            <div class="code-block"><pre><span class="hl-comment">// variableTypeHintsWhenTypeMatchesName: false</span>
&#64;for (user of users; ...) <span class="hl-dim">// hide ": User"</span>
&#64;for (item of people; ...) <span class="hl-var">item</span><span class="hl-hint">: Person</span>
<span class="hl-comment">// Case-insensitive, generic-aware</span></pre></div>
            <div class="test-ref">Spec #56-57, #117-118</div>
          </div>

          <div class="hint-example">
            <div class="hint-label">Interactive &amp; graceful fallback</div>
            <div class="code-block"><pre><span class="hl-comment">// interactiveInlayHints: true</span>
<span class="hl-comment">// Click ": User" to navigate to definition</span>

<span class="hl-comment">// No crash on:</span>
(click)="doSomething()"  <span class="hl-comment">// 0 args</span>
obj?.method?.(42)         <span class="hl-comment">// safe call</span>
{{ '{{ name | invalid }}' }}      <span class="hl-comment">// no transform</span></pre></div>
            <div class="test-ref">Spec #103, #106, #111-115</div>
          </div>
        </div>
      </section>

      <!-- TS vs ANGULAR INLAY HINTS COMPARISON -->
      <section class="example-section">
        <h3>TypeScript vs Angular Inlay Hints</h3>
        <p class="desc">
          Angular's inlay hints mirror TypeScript's configuration model but add template-specific hints
          that have no TS equivalent:
        </p>
        <div class="hint-grid">
          <div class="hint-example">
            <div class="hint-label">TypeScript Options &rarr; Angular Equivalents</div>
            <div class="code-block"><pre><span class="hl-comment">// TS: includeInlayVariableTypeHints</span>
<span class="hl-event">Angular: variableTypes</span> <span class="hl-good">&#10003;</span>

<span class="hl-comment">// TS: includeInlayFunctionParameterTypeHints</span>
<span class="hl-event">Angular: eventParameterTypes</span> <span class="hl-good">&#10003;</span>

<span class="hl-comment">// TS: includeInlayParameterNameHints</span>
<span class="hl-event">Angular: parameterNameHints</span> <span class="hl-good">&#10003;</span>

<span class="hl-comment">// TS: includeInlayFunctionLikeReturnTypeHints</span>
<span class="hl-event">Angular: pipeReturnTypes</span> <span class="hl-good">&#10003;</span></pre></div>
          </div>
          <div class="hint-example">
            <div class="hint-label">Angular-Only (No TS Equivalent)</div>
            <div class="code-block"><pre><span class="hl-var">forLoopVariableTypes</span>       <span class="hl-hint">&#64;for loop vars</span>
<span class="hl-var">letDeclarationTypes</span>        <span class="hl-hint">&#64;let decls</span>
<span class="hl-var">templateReferenceTypes</span>     <span class="hl-hint">#ref types</span>
<span class="hl-var">twoWayBindingSignalTypes</span>   <span class="hl-hint">[(model)]</span>
<span class="hl-var">structuralDirectiveVars</span>    <span class="hl-hint">*ngFor/*ngIf</span>
<span class="hl-var">requiredInputIndicator</span>     <span class="hl-hint">! marker</span>
<span class="hl-var">propertyBindingTypes</span>       <span class="hl-hint">[prop] types</span></pre></div>
          </div>
        </div>

        <h4 style="margin-top: 16px;">Fine-Grained Event Parameter Config</h4>
        <div class="code-block wide"><pre><span class="hl-comment">// Show only component event hints, hide native HTML event hints</span>
{{'{'}}
  eventParameterTypes: {{'{'}}
    nativeEvents: false,      <span class="hl-dim">// Hide: (click): PointerEvent</span>
    componentEvents: true,    <span class="hl-dim">// Show: (customEvent): string</span>
    animationEvents: true,    <span class="hl-dim">// Show: (&#64;fade.done): AnimationEvent</span>
  {{'}'}}
{{'}'}}</pre></div>

        <h4>Fine-Grained Property Binding Config</h4>
        <div class="code-block wide"><pre><span class="hl-comment">// Show only component input hints, hide native property hints</span>
{{'{'}}
  propertyBindingTypes: {{'{'}}
    nativeProperties: false,   <span class="hl-dim">// Hide: [disabled]: boolean</span>
    componentInputs: true,     <span class="hl-dim">// Show: [user]: User</span>
  {{'}'}}
{{'}'}}</pre></div>
      </section>

      <!-- INLAY HINTS + OPTIONAL CHAINING -->
      <section class="example-section highlight-section">
        <h3>Inlay Hints + Optional Chaining</h3>
        <p class="desc">
          With <strong>native optional chaining</strong>, inlay hints make the
          <code>null</code> vs <code>undefined</code> difference visible in the editor:
        </p>
        <div class="hint-grid">
          <div class="hint-example legacy-example">
            <div class="hint-label">Legacy &mdash; returns null</div>
            <div class="code-block"><pre>{{ '{{ user?.name }}' }}<span class="hl-hint">: string | <span class="hl-warn">null</span></span>
&#64;if (user?.addr; as <span class="hl-var">a</span><span class="hl-hint">: Addr | <span class="hl-warn">null</span></span>)</pre></div>
          </div>
          <div class="hint-example native-example">
            <div class="hint-label">Native &mdash; returns undefined</div>
            <div class="code-block"><pre>{{ '{{ user?.name }}' }}<span class="hl-hint">: string | <span class="hl-good">undefined</span></span>
&#64;if (user?.addr; as <span class="hl-var">a</span><span class="hl-hint">: Addr | <span class="hl-good">undefined</span></span>)</pre></div>
          </div>
        </div>
        <div class="note-box">
          <strong>At a glance</strong> see whether <code>?.</code> returns
          <code>null</code> or <code>undefined</code>. The inlay hint type
          immediately reveals which semantics are active per component.
        </div>
      </section>
    </div>
  `,
  styles: [`
    .demo-page { max-width: 960px; margin: 0 auto; padding: 32px 32px 64px; }
    .demo-header { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; flex-wrap: wrap; }
    .demo-header h2 { font-size: 28px; font-weight: 700; margin: 0; }
    .badge { font-size: 11px; font-weight: 600; font-family: 'JetBrains Mono', monospace; background: rgba(240, 160, 200, 0.12);
      color: var(--adev-primary, #f0a0c8); border: 1px solid rgba(240, 160, 200, 0.25); padding: 3px 10px; border-radius: 6px; }
    .test-badge { background: rgba(34, 197, 94, 0.12); color: #22c55e; border-color: rgba(34, 197, 94, 0.25); }
    .demo-description { color: var(--adev-text-secondary, #94a3b8); font-size: 15px; line-height: 1.7; margin-bottom: 32px; }
    .example-section { margin-bottom: 32px; }
    .example-section h3 { font-size: 18px; font-weight: 600; margin: 0 0 8px; padding-bottom: 8px; border-bottom: 1px solid var(--adev-border, #334155); }
    .desc { font-size: 14px; color: var(--adev-text-secondary, #94a3b8); line-height: 1.6; margin: 0 0 16px; }
    .hint-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
    .hint-example { background: var(--adev-surface, #1e293b); border: 1px solid var(--adev-border, #334155); border-radius: 8px; padding: 16px; }
    .hint-label { font-size: 12px; font-weight: 600; color: var(--adev-text-secondary, #94a3b8); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
    .code-block { background: var(--adev-code-bg, #0f172a); border: 1px solid var(--adev-code-border, #1e293b); border-radius: 6px; overflow-x: auto; }
    .code-block pre { margin: 0; padding: 12px 14px; font-size: 13px; line-height: 1.6; border: none; background: none; }
    .code-block.wide pre { padding: 16px; }
    .config-tag { margin-top: 10px; font-size: 11px; font-family: 'JetBrains Mono', monospace; color: var(--adev-text-tertiary, #64748b); }
    .config-section .code-block { background: var(--adev-surface, #1e293b); border-color: var(--adev-border, #334155); }
    .test-ref { margin-top: 4px; font-size: 10px; font-family: 'JetBrains Mono', monospace; color: #22c55e; opacity: 0.7; }
    .hl-var { color: #7dd3fc; } .hl-hint { color: var(--adev-primary, #f0a0c8); opacity: 0.7; font-style: italic; }
    .hl-event { color: #fbbf24; } .hl-comment { color: #64748b; font-style: italic; } .hl-dim { color: #475569; }
    .hl-warn { color: #fb923c; font-weight: 600; } .hl-good { color: #22c55e; font-weight: 600; }
    .note-box { background: var(--adev-surface, #1e293b); border: 1px solid var(--adev-border, #334155); border-left: 3px solid var(--adev-info, #3b82f6);
      border-radius: 8px; padding: 14px 16px; font-size: 14px; color: var(--adev-text-secondary, #94a3b8); line-height: 1.6; margin-top: 12px; }
    .highlight-section { background: linear-gradient(135deg, rgba(240, 160, 200, 0.04), rgba(56, 189, 248, 0.04));
      border: 1px solid rgba(240, 160, 200, 0.15); border-radius: 12px; padding: 20px; }
    .legacy-example { border-left: 3px solid #fb923c; } .native-example { border-left: 3px solid #22c55e; }
    @media (max-width: 768px) { .hint-grid { grid-template-columns: 1fr; } .demo-page { padding: 20px 16px; } }
  `],
})
export class InlayHintsDemoComponent {}
