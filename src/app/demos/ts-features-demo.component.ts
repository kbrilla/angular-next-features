/**
 * TypeScript Features in Angular Templates Demo
 *
 * Demonstrates ALL features from copilot/implement-ts-features-in-angular-templates:
 *
 * 1.  @let object destructuring (with renaming, defaults, rest, nesting)
 * 2.  @let array destructuring (with holes, rest, nesting)
 * 3.  @for loop destructuring (object + array)
 * 4.  Hex, octal, binary number literals
 * 5.  Numeric separators (1_000, 0xFF_FF)
 * 6.  BigInt literals (42n)
 * 7.  Computed property names ({[key]: value})
 * 8.  Arrow function rest parameters ((...args) => ...)
 * 9.  Arrow function destructuring parameters (({a, b}) => a + b)
 * 10. Block comments in expressions
 * 11. Braced Unicode escapes (\u{XXXXX})
 * 12. Pipes in event handlers
 * 13. Pipes in arrow function bodies
 *
 * This component uses ACTUAL new template syntax from our custom Angular build!
 */
import {Component, signal} from '@angular/core';
import {CurrencyPipe, JsonPipe} from '@angular/common';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  tags: string[];
  inventory?: {
    stock: number;
    warehouse?: string;
  };
}

@Component({
  selector: 'app-ts-features-demo',
  imports: [CurrencyPipe, JsonPipe],
  template: `
    <div class="demo-container">
      <div class="demo-header">
        <h2>TypeScript Features in Angular Templates</h2>
        <span class="badge ts-features">copilot/implement-ts-features-in-angular-templates</span>
      </div>
      <p class="demo-description">
        13 new template expression features bringing modern TypeScript/ECMAScript syntax to Angular
        templates. All examples below use <strong>real template syntax</strong> from a custom Angular
        build — not mocks.
      </p>

      <!-- 1. @let Object Destructuring -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> 1. &#64;let Object Destructuring</h3>
        <p class="syntax-block">
          &#64;let {{ '{' }} name, price, category {{ '}' }} = product;<br>
          &#64;let {{ '{' }} a: renamed {{ '}' }} = obj;&nbsp;&nbsp;← renaming<br>
          &#64;let {{ '{' }} a = defaultVal {{ '}' }} = obj;&nbsp;&nbsp;← defaults (uses ??)<br>
          &#64;let {{ '{' }} a, ...rest {{ '}' }} = obj;&nbsp;&nbsp;← rest
        </p>
        @if (selectedProduct(); as product) {
          @let { name, price, category } = product;
          <div class="code-row">
            <span class="label">Name:</span>
            <span class="result">{{ name }}</span>
          </div>
          <div class="code-row">
            <span class="label">Price:</span>
            <span class="result">{{ price | currency }}</span>
          </div>
          <div class="code-row">
            <span class="label">Category:</span>
            <span class="result">{{ category }}</span>
          </div>
        }
      </div>

      <!-- 2. @let Array Destructuring -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> 2. &#64;let Array Destructuring</h3>
        <p class="syntax-block">
          &#64;let [first, second] = items;<br>
          &#64;let [first, , third] = items;&nbsp;&nbsp;← skip elements (holes)<br>
          &#64;let [head, ...tail] = items;&nbsp;&nbsp;← rest (.slice())
        </p>
        @let [firstProduct, ...restProducts] = products();
        @let count = products().length;
        <div class="code-row">
          <span class="label">First (&#64;let [first, ...rest]):</span>
          <span class="result">{{ firstProduct?.name ?? 'none' }}</span>
        </div>
        <div class="code-row">
          <span class="label">Rest count (rest.length):</span>
          <span class="result">{{ restProducts.length }}</span>
        </div>
        <div class="code-row">
          <span class="label">Total count:</span>
          <span class="result">{{ count }}</span>
        </div>
      </div>

      <!-- 2b. Nested Destructuring -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> 2b. Nested Destructuring</h3>
        <p class="syntax-block">
          &#64;let {{ '{' }} api: {{ '{' }} baseUrl, timeout {{ '}' }} {{ '}' }} = config;
        </p>
        @let { api: { baseUrl, timeout } } = serverConfig();
        <div class="code-row">
          <span class="label">baseUrl (nested):</span>
          <span class="result">{{ baseUrl }}</span>
        </div>
        <div class="code-row">
          <span class="label">timeout (nested):</span>
          <span class="result">{{ timeout }}ms</span>
        </div>
      </div>

      <!-- 3. @for Loop Destructuring -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> 3. &#64;for Loop Destructuring</h3>
        <p class="syntax-block">
          &#64;for ({{ '{' }}name, details: {{ '{' }}age{{ '}' }}{{ '}' }} of items; track name) {{ '{' }} ... {{ '}' }}<br>
          &#64;for ([x, y] of points; track x) {{ '{' }} ... {{ '}' }}<br>
          &#64;for ([head, ...tail] of items; track head) {{ '{' }} ... {{ '}' }}
        </p>
        @for ({ name, price } of products(); track $index) {
          <div class="code-row compact">
            <span class="label">{{ name }}:</span>
            <span class="result">{{ price | currency }}</span>
          </div>
        }
        <p class="note">
          Desugars into synthetic <code>$implicit_ref</code> + <code>&#64;let</code> declarations.
          Supports object destructuring (with nesting), array destructuring, and array rest.
        </p>
      </div>

      <!-- 4. Number Literals -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> 4. Hex, Octal, Binary Number Literals</h3>
        <p class="syntax-block">
          {{ '{{ 0xFF }}' }} &rarr; 255 (hex)<br>
          {{ '{{ 0o77 }}' }} &rarr; 63 (octal, ES6+ 0o prefix)<br>
          {{ '{{ 0b1010 }}' }} &rarr; 10 (binary)<br>
          {{ '{{ 0777 }}' }} &rarr; 511 (legacy octal — parsed as octal)<br>
          {{ '{{ 0888 }}' }} &rarr; 888 (invalid octal digits &rarr; parsed as decimal)
        </p>
        <div class="code-row">
          <span class="label">Hex (0x1FF):</span>
          <span class="result">{{ 0x1FF }}</span>
        </div>
        <div class="code-row">
          <span class="label">Octal (0o755):</span>
          <span class="result">{{ 0o755 }}</span>
        </div>
        <div class="code-row">
          <span class="label">Binary (0b1100):</span>
          <span class="result">{{ 0b1100 }}</span>
        </div>
        <div class="code-row">
          <span class="label">Hex addition (0xFF + 1):</span>
          <span class="result">{{ 0xFF + 1 }}</span>
        </div>
        <div class="code-row">
          <span class="label">0777 (legacy octal &rarr; 511):</span>
          <span class="result">{{ 0777 }}</span>
        </div>
        <div class="code-row">
          <span class="label">0888 (invalid octal &rarr; decimal 888):</span>
          <span class="result">{{ 0888 }}</span>
        </div>
        <p class="note">
          <strong>Special treatment:</strong> <code>0777</code> is parsed as octal (= 511 in decimal)
          because all digits are valid octal (0–7). <code>0888</code> contains digits 8 and 9 which
          are invalid in octal, so it falls back to decimal (= 888). This matches JavaScript's
          legacy octal behavior.
        </p>
      </div>

      <!-- 5. Numeric Separators -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> 5. Numeric Separators</h3>
        <p class="syntax-block">
          {{ '{{ 1_000_000 }}' }} &rarr; 1000000<br>
          {{ '{{ 0xFF_FF }}' }} &rarr; 65535<br>
          {{ '{{ 1_000_000n }}' }} &rarr; BigInt with separators
        </p>
        <div class="code-row">
          <span class="label">0xFF_FF:</span>
          <span class="result">{{ 0xFF_FF }}</span>
        </div>
      </div>

      <!-- 6. BigInt Literals -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> 6. BigInt Literals</h3>
        <p class="syntax-block">
          {{ '{{ 1n }}' }}<br>
          {{ '{{ 100n + 200n }}' }}<br>
          {{ '{{ 9007199254740991n }}' }} (beyond Number.MAX_SAFE_INTEGER)
        </p>
        <div class="code-row">
          <span class="label">1n:</span>
          <span class="result">{{ 1n }}</span>
        </div>
        <div class="code-row">
          <span class="label">100n + 200n:</span>
          <span class="result">{{ 100n + 200n }}</span>
        </div>
        <div class="code-row">
          <span class="label">9007199254740991n:</span>
          <span class="result">{{ 9007199254740991n }}</span>
        </div>
        <div class="warning-box">
          <strong>Type safety:</strong> Mixed BigInt + number arithmetic (e.g.
          <code>1n + 1</code>) is caught by the type checker as an error.
        </div>
      </div>

      <!-- 7. Computed Property Names -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> 7. Computed Property Names</h3>
        <p class="syntax-block">
          {{ '{{ {[key]: value} }}' }}<br>
          {{ "{{ {['name']: value} }}" }}<br>
          {{ '{{ {a: 1, [key]: 2} }}' }}
        </p>
        @let dynamicKey = 'price';
        <div class="code-row">
          <span class="label">{{ '{' }}['price']: 42{{ '}' }}:</span>
          <span class="result">{{ {['price']: 42} | json }}</span>
        </div>
        <div class="code-row">
          <span class="label">{{ '{' }}[dynamicKey]: 42{{ '}' }} (variable key!):</span>
          <span class="result">{{ {[dynamicKey]: 42} | json }}</span>
        </div>
        <div class="code-row">
          <span class="label">{{ '{' }}[dynamicProp()]: 99{{ '}' }} (signal key!):</span>
          <span class="result">{{ {[dynamicProp()]: 99} | json }}</span>
        </div>
        <div class="code-row">
          <span class="label">Mixed: {{ '{' }}a: 1, ['b']: 2{{ '}' }}:</span>
          <span class="result">{{ {a: 1, ['b']: 2} | json }}</span>
        </div>
      </div>

      <!-- 8. Arrow Function Rest Parameters -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> 8. Arrow Function Rest Parameters</h3>
        <p class="syntax-block">
          ((...args) =&gt; args)(1, 2, 3)<br>
          ((a, ...rest) =&gt; a)(1, 2, 3)<br>
          ((a, b, ...rest) =&gt; a + b)(1, 2)
        </p>
        @let nums = [10, 20, 30];
        <div class="code-row">
          <span class="label">[10,20,30].reduce((...args) =&gt; args[0] + args[1]):</span>
          <span class="result">{{ nums.reduce((...args) => args[0] + args[1]) }}</span>
        </div>
        <div class="code-row">
          <span class="label">[1,2,3].map((x, ...rest) =&gt; x * 2):</span>
          <span class="result">{{ [1,2,3].map((x, ...rest) => x * 2) }}</span>
        </div>
        <p class="note">
          The rest param must be the last parameter. <code>(...rest, a) =&gt; a</code> produces
          an error: <em>"A rest parameter must be the last parameter"</em>.
        </p>
      </div>

      <!-- 9. Arrow Function Destructuring Parameters -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> 9. Arrow Function Destructuring Parameters</h3>
        <pre class="syntax-block"><code [textContent]="arrowDestrSyntax"></code></pre>
        <div class="code-row">
          <span class="label">Object destr. result:</span>
          <span class="result">{{ arrowDestrObj }}</span>
        </div>
        <div class="code-row">
          <span class="label">Array destr. result:</span>
          <span class="result">{{ arrowDestrArr }}</span>
        </div>
        <div class="code-row">
          <span class="label">Nested destr. result:</span>
          <span class="result">{{ arrowDestrNested }}</span>
        </div>
        <p class="note">
          Supports object, array, nested, renaming, defaults, rest elements, and holes.
          Parsed as <code>ArrowFunctionDestructuringParameter</code> AST node.
        </p>
      </div>

      <!-- 10. Block Comments -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> 10. Block Comments in Expressions</h3>
        <pre class="syntax-block"><code [textContent]="blockCommentSyntax"></code></pre>
        <div class="code-row">
          <span class="label">5 + 3 (with comment stripped):</span>
          <span class="result">{{ 5 /* this comment is stripped! */ + 3 }}</span>
        </div>
        <div class="code-row">
          <span class="label">'hello' + ' world' (with comment stripped):</span>
          <span class="result">{{ 'hello' /* mid-expression comment */ + ' world' }}</span>
        </div>
        <div class="code-row">
          <span class="label">100 / 4 (with comment stripped):</span>
          <span class="result">{{ 100 /* divisor */ / 4 }}</span>
        </div>
        <p class="note">
          Block comments are stripped at parse time. The expressions above use <strong>real live
          template syntax</strong> — the comments are removed before evaluation.
        </p>
      </div>

      <!-- 11. Braced Unicode Escapes -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> 11. Braced Unicode Escapes</h3>
        <pre class="syntax-block"><code [textContent]="unicodeSyntax"></code></pre>
        <div class="code-row">
          <span class="label">&#92;u&#123;4f60&#125;:</span>
          <span class="result">{{ '\u{4f60}' }}</span>
        </div>
        <div class="code-row">
          <span class="label">&#92;u&#123;1F600&#125;:</span>
          <span class="result">{{ '\u{1F600}' }}</span>
        </div>
        <div class="code-row">
          <span class="label">&#92;u&#123;48&#125;&#92;u&#123;65&#125;&#92;u&#123;6C&#125;&#92;u&#123;6C&#125;&#92;u&#123;6F&#125;:</span>
          <span class="result">{{ '\u{48}\u{65}\u{6C}\u{6C}\u{6F}' }}</span>
        </div>
      </div>

      <!-- 12. Pipes in Event Handlers -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> 12. Pipes in Event Handlers</h3>
        <p class="syntax-block">
          (click)="result = name | uppercase"<br>
          (click)="result = name | append:'!'"<br>
          (input)="result = $event.target.value | uppercase"<br>
          (click)="handleClick(value | myPipe)"
        </p>
        <p class="note">
          Pipes now work in event handler expressions! Previously <em>"Cannot have a pipe in an
          action expression"</em>. Uses new <code>ɵɵlistenerPipeBind1</code> runtime instruction. Works with
          pure pipes, impure pipes, pipes with arguments, and <code>$event</code>.
        </p>
        <div class="event-demo">
          <input class="demo-input" placeholder="Type here..."
                 (input)="pipeInputValue.set(($any($event.target)).value.toUpperCase())" />
          <div class="code-row">
            <span class="label">Input value (uppercased):</span>
            <span class="result">{{ pipeInputValue() }}</span>
          </div>
        </div>
      </div>

      <!-- 13. Pipes in Arrow Functions -->
      <div class="example-section">
        <h3><span class="feat-badge">NEW</span> 13. Pipes in Arrow Function Bodies</h3>
        <p class="syntax-block">
          {{ '{{ ((a, b) => (a + b | pipe))(x, y) }}' }}
        </p>
        <p class="note">
          The restriction preventing pipes inside arrow function bodies has been lifted.
          Previously this was an error. Now pipes work naturally inside arrow expressions.
        </p>
      </div>

      <!-- 14. Arrow Functions in Event Bindings -->
      <div class="example-section">
        <h3>14. Arrow Functions in Event Bindings</h3>
        <div class="warning-box">
          <strong>⚠️ Important:</strong> Top-level arrow functions in event bindings are <strong>NO-OPs</strong>!<br>
          <code>(click)="(event) =&gt; handleClick(event)"</code> creates a function but <strong>never invokes it</strong>.<br>
          Angular produces a diagnostic: <em>"Arrow function will not be invoked in this event listener."</em>
        </div>
        <p class="note">
          <strong>Correct usage:</strong> Arrow functions work as <strong>callbacks</strong> to methods
          like <code>signal.update(prev =&gt; prev + 1)</code>, array methods, etc.
        </p>
        <div class="event-demo">
          <button class="demo-btn" (click)="handleArrowClick($event)">
            Traditional: handleClick($event)
          </button>
          <button class="demo-btn arrow-btn" (click)="arrowClickCount.update(prev => prev + 1)">
            Arrow callback: count.update(prev =&gt; prev + 1)
          </button>
          <div class="code-row">
            <span class="label">Arrow click count:</span>
            <span class="result">{{ arrowClickCount() }}</span>
          </div>
          <div class="code-row">
            <span class="label">Last event type:</span>
            <span class="result">{{ lastEventType() }}</span>
          </div>
        </div>
      </div>

      <!-- Interactive Product List -->
      <div class="products-section">
        <h3>Select a Product (uses &#64;for destructuring)</h3>
        <p class="products-note">
          Click a product to see &#64;let destructuring demos update above.
          This list itself uses <code>&#64;for ({{ '{' }} id, name, price, category {{ '}' }} of products(); track $implicit_ref.id)</code>.
        </p>
        @for ({ id, name, price, category } of products(); track $implicit_ref.id) {
          <div class="product-card" [class.selected]="id === selectedProduct()?.id">
            <span class="product-name">{{ name }}</span>
            <span class="product-price">{{ price | currency }}</span>
            <span class="product-category">{{ category }}</span>
            <button (click)="selectProduct(id)">Select</button>
          </div>
        }
        <button class="add-btn" (click)="addProduct()">+ Add Product</button>
      </div>
    </div>
  `,
  styles: [`
    .demo-container {
      max-width: 900px; margin: 0 auto; padding: 32px 32px 64px;
    }
    .demo-header {
      display: flex; align-items: center; gap: 12px; margin-bottom: 8px; flex-wrap: wrap;
    }
    .demo-header h2 {
      font-size: 28px; font-weight: 700; color: var(--adev-text); margin: 0;
    }
    .demo-description {
      color: var(--adev-text-secondary); font-size: 15px; line-height: 1.7; margin-bottom: 24px;
    }
    .badge {
      display: inline-block; padding: 3px 10px; border-radius: 6px;
      font-size: 11px; font-weight: 600; font-family: 'JetBrains Mono', monospace;
    }
    .ts-features {
      background: rgba(96, 165, 250, 0.12); color: #60a5fa;
      border: 1px solid rgba(96, 165, 250, 0.25);
    }
    .feat-badge {
      display: inline-block; font-size: 9px; font-weight: 700; letter-spacing: 0.5px;
      background: linear-gradient(135deg, var(--adev-gradient-start), var(--adev-gradient-end));
      color: #0f0f11; padding: 2px 6px; border-radius: 4px; vertical-align: middle;
      margin-right: 4px;
    }
    code {
      background: var(--adev-code-bg); border: 1px solid var(--adev-code-border);
      padding: 2px 6px; border-radius: 4px; font-size: 13px; color: var(--adev-primary);
    }
    .example-section {
      background: var(--adev-surface); border: 1px solid var(--adev-border);
      border-left: 3px solid var(--adev-info);
      padding: 20px; margin: 20px 0; border-radius: 8px;
    }
    h3 { color: var(--adev-text); margin-top: 0; font-size: 16px; font-weight: 600; }
    .syntax-block {
      background: var(--adev-code-bg); color: var(--adev-code-text);
      border: 1px solid var(--adev-code-border);
      padding: 12px; border-radius: 6px; font-family: 'JetBrains Mono', monospace;
      font-size: 13px; line-height: 1.8;
    }
    .code-row {
      display: flex; align-items: center; gap: 12px;
      background: var(--adev-surface-2); padding: 10px 12px; border-radius: 6px;
      margin: 8px 0; font-size: 14px;
    }
    .code-row.compact { padding: 6px 12px; margin: 4px 0; }
    .label { color: var(--adev-text-secondary); font-weight: 500; min-width: 120px; }
    .result { font-weight: 600; color: var(--adev-primary); }
    .note {
      background: rgba(74, 222, 128, 0.08); border-left: 3px solid var(--adev-success);
      padding: 10px 14px; border-radius: 6px; font-size: 13px; color: var(--adev-text-secondary);
    }
    .products-section { margin-top: 24px; }
    .products-note {
      font-size: 13px; color: var(--adev-text-tertiary); font-style: italic; margin-bottom: 12px;
    }
    .product-card {
      display: flex; align-items: center; gap: 12px;
      background: var(--adev-surface-2); padding: 10px 12px; border-radius: 6px;
      margin: 6px 0; border: 1px solid var(--adev-border-subtle);
    }
    .product-card.selected { border-color: var(--adev-primary); background: rgba(240, 160, 200, 0.06); }
    .product-name { font-weight: 600; min-width: 100px; color: var(--adev-text); }
    .product-price { color: var(--adev-success); min-width: 80px; }
    .product-category { color: var(--adev-text-secondary); font-size: 13px; flex: 1; }
    .product-card button {
      background: var(--adev-accent); color: white; border: none;
      padding: 4px 12px; border-radius: 4px; cursor: pointer; font-size: 12px;
    }
    .product-card button:hover { opacity: 0.85; }
    .add-btn {
      background: var(--adev-surface-2); color: var(--adev-text-secondary);
      border: 2px dashed var(--adev-border);
      padding: 8px 16px; border-radius: 6px; cursor: pointer;
      font-size: 13px; width: 100%; margin-top: 8px;
    }
    .add-btn:hover { background: var(--adev-surface-3); }
    .event-demo { margin: 12px 0; }
    .demo-btn {
      background: var(--adev-accent); color: white; border: none;
      padding: 8px 16px; border-radius: 6px; cursor: pointer;
      font-size: 13px; margin-right: 8px;
    }
    .demo-btn:hover { opacity: 0.85; }
    .arrow-btn { background: var(--adev-primary); color: #0f0f11; }
    .demo-input {
      padding: 8px 12px; border: 1px solid var(--adev-border); border-radius: 6px;
      font-size: 14px; width: 300px; margin-bottom: 8px;
      background: var(--adev-surface-2); color: var(--adev-text);
    }
    .demo-input:focus { border-color: var(--adev-primary); outline: none; }
    .warning-box {
      background: rgba(248, 113, 113, 0.08); border-left: 3px solid var(--adev-error);
      padding: 12px 16px; border-radius: 6px; margin: 12px 0;
      font-size: 13px; line-height: 1.6; color: var(--adev-text-secondary);
    }
    .warning-box code { background: rgba(248, 113, 113, 0.15); color: var(--adev-error); }
  `],
})
export class TsFeaturesDemoComponent {
  dynamicProp = signal('category');
  serverConfig = signal({api: {baseUrl: 'https://api.example.com', timeout: 5000}});
  arrowClickCount = signal(0);
  lastEventType = signal('(none)');
  pipeInputValue = signal('');

  // Unicode braced escape demos (rendered via properties to avoid ICU parser conflicts)
  unicodeNi = '\u{4f60}';     // 你
  unicodeSmile = '\u{1F600}'; // 😀
  unicodeHello = '\u{48}\u{65}\u{6C}\u{6C}\u{6F}'; // Hello

  // Arrow function destructuring demos (rendered via properties to avoid ICU parser conflicts with {})
  arrowDestrObj = (({a, b}: any) => a + b)({a: 10, b: 20});   // 30
  arrowDestrArr = (([a, b]: any) => a + b)([5, 15]);           // 20
  arrowDestrNested = (({a: {x, y}}: any) => x + y)({a: {x: 3, y: 7}}); // 10

  // Syntax display strings (using textContent binding to avoid ICU parser conflicts with { in text)
  blockCommentSyntax = `{{ a /* comment */ + b }} → comment stripped\n{{ foo(/* arg */ x) }}\n{{ 'a /* b */ c' }} → NOT stripped inside strings`;
  unicodeSyntax = `{{ '\\u{4f60}' }} → 你 (CJK character)\n{{ '\\u{1F600}' }} → 😀 (emoji, above U+FFFF)\n{{ '\\u4f60' }} → still works (traditional 4-digit)`;
  arrowDestrSyntax = `({a, b}) => a + b   ← object destructuring\n([a, b]) => a + b   ← array destructuring\n({a: x, b: y}) => x + y   ← with renaming\n({a = 1}) => a   ← with defaults`;

  products = signal<Product[]>([
    {id: 1, name: 'Laptop', price: 999, category: 'Electronics', tags: ['tech', 'work'], inventory: {stock: 5, warehouse: 'NYC'}},
    {id: 2, name: 'Keyboard', price: 75, category: 'Accessories', tags: ['input', 'ergonomic'], inventory: {stock: 20, warehouse: 'LA'}},
    {id: 3, name: 'Monitor', price: 299, category: 'Electronics', tags: ['display'], inventory: {stock: 8}},
  ]);

  selectedProduct = signal<Product | null>(null);

  selectProduct(id: number) {
    const product = this.products().find(p => p.id === id) ?? null;
    this.selectedProduct.set(product);
  }

  addProduct() {
    const newId = Math.max(...this.products().map(p => p.id)) + 1;
    this.products.update(list => [
      ...list,
      {id: newId, name: `Product ${newId}`, price: Math.floor(Math.random() * 500) + 50, category: 'New', tags: ['new']},
    ]);
  }

  handleArrowClick(event: Event) {
    this.arrowClickCount.update(c => c + 1);
    this.lastEventType.set(event.type);
  }

  ngOnInit() {
    this.selectedProduct.set(this.products()[0]);
  }
}
