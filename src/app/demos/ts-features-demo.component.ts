/**
 * PR 2: TypeScript Features in Angular Templates Demo
 *
 * Demonstrates features from kbrilla/angular copilot/implement-ts-features-in-angular-templates:
 *
 * - @let destructuring (object and array)
 * - Hex, octal, binary number literals
 * - Computed property names in object literals
 * - BigInt literal support
 * - Arrow function rest parameters
 * - Block comments in expressions
 * - Braced Unicode escapes (\u{XXXXX})
 *
 * This component uses ACTUAL new template syntax from our custom Angular build!
 */
import {Component, signal} from '@angular/core';
import {CurrencyPipe, JsonPipe, UpperCasePipe} from '@angular/common';

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
  imports: [CurrencyPipe, JsonPipe, UpperCasePipe],
  template: `
    <div class="demo-container">
      <h2>TypeScript Features in Angular Templates</h2>
      <span class="badge ts-features">PR 2: copilot/implement-ts-features-in-angular-templates</span>

      <!-- 1. @let Object Destructuring (LIVE!) -->
      <div class="example-section">
        <h3>1. &#64;let Object Destructuring (Live!)</h3>
        <p class="syntax-block">
          &#64;let {{ '{' }} name, price, category {{ '}' }} = product;
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

      <!-- 2. @let Array Destructuring (LIVE!) -->
      <div class="example-section">
        <h3>2. &#64;let Array Destructuring (Live!)</h3>
        <p class="syntax-block">
          &#64;let [first, second] = items;<br>
          &#64;let [first, , third] = items; (skip elements)<br>
          &#64;let [head, ...tail] = items; (rest)
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

      <!-- 2b. Nested Destructuring (LIVE!) -->
      <div class="example-section">
        <h3>2b. Nested Destructuring (Live!)</h3>
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

      <!-- 3. Number Literals (LIVE!) -->
      <div class="example-section">
        <h3>3. Hex, Octal, Binary Number Literals (Live!)</h3>
        <p class="syntax-block">
          {{ '{{ 0xFF }}' }} &rarr; 255 (hex)<br>
          {{ '{{ 0o77 }}' }} &rarr; 63 (octal)<br>
          {{ '{{ 0b1010 }}' }} &rarr; 10 (binary)<br>
          {{ '{{ 0xFF_FF }}' }} &rarr; 65535 (with separators)
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
      </div>

      <!-- 4. Computed Property Names -->
      <div class="example-section">
        <h3>4. Computed Property Names (Live!)</h3>
        <p class="syntax-block">
          {{ '{{ {[key]: value} }}' }}<br>
          {{ "{{ {['name']: value} }}" }}<br>
          {{ '{{ {[someVariable]: value} }}' }} (truly dynamic!)
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
          <span class="label">{{ '{' }}['a']: 1, ['b']: 2{{ '}' }}:</span>
          <span class="result">{{ {['a']: 1, ['b']: 2} | json }}</span>
        </div>
      </div>

      <!-- 5. BigInt Literals -->
      <div class="example-section">
        <h3>5. BigInt Literals (Live!)</h3>
        <p class="syntax-block">
          {{ '{{ 1n }}' }}<br>
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
      </div>

      <!-- 6. Arrow Rest Parameters -->
      <div class="example-section">
        <h3>6. Arrow Function Rest Parameters (Live!)</h3>
        <p class="syntax-block">
          {{ '{{ items.reduce((...args) => args[0] + args[1]) }}' }}
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
      </div>

      <!-- 7. Block Comments -->
      <div class="example-section">
        <h3>7. Block Comments in Expressions (Live!)</h3>
        <p class="syntax-block">
          {{ '{{ a /* comment */ + b }}' }} &rarr; comment stripped, math works
        </p>
        <div class="code-row">
          <span class="label">5 /* ignored */ + 3:</span>
          <span class="result">{{ 5 /* this comment is stripped! */ + 3 }}</span>
        </div>
        <div class="code-row">
          <span class="label">'hello' /* mid */ + ' world':</span>
          <span class="result">{{ 'hello' /* this is stripped */ + ' world' }}</span>
        </div>
        <div class="code-row">
          <span class="label">100 /* divisor */ / 4:</span>
          <span class="result">{{ 100 /* divisor */ / 4 }}</span>
        </div>
      </div>

      <!-- 8. Arrow Functions in Event Bindings -->
      <div class="example-section">
        <h3>8. Arrow Functions in Event Bindings (Live!)</h3>

        <div class="warning-box">
          <strong>⚠️ Important:</strong> Top-level arrow functions in event bindings are <strong>NO-OPs</strong>!<br>
          <code>(click)="(event) =&gt; handleClick(event)"</code> creates a function but <strong>never invokes it</strong>.<br>
          Angular produces a diagnostic: <em>"Arrow function will not be invoked in this event listener."</em>
        </div>

        <p class="note">
          <strong>Correct usage:</strong> Arrow functions work as <strong>callbacks</strong> to methods
          like <code>signal.update(prev =&gt; prev + 1)</code>, array methods, etc.
        </p>

        <h4 style="color: var(--adev-error); margin-top: 16px;">❌ Anti-patterns (NO-OP — never invoked)</h4>
        <pre class="syntax-block" style="border-left: 3px solid var(--adev-error);">&lt;button (click)="(event) =&gt; handleClick(event)"&gt;  ← Creates function, discards it
&lt;button (click)="() =&gt; doSomething()"&gt;             ← Same problem
&lt;button (click)="(e) =&gt; e.preventDefault()"&gt;       ← Never runs</pre>

        <h4 style="color: var(--adev-success); margin-top: 16px;">✅ Correct patterns (arrow as callback)</h4>
        <pre class="syntax-block" style="border-left: 3px solid var(--adev-success);">&lt;button (click)="count.update(prev =&gt; prev + 1)"&gt;         ← Signal update
&lt;button (click)="count.update(prev =&gt; $event.type + prev)"&gt; ← $event available!
&lt;button (click)="items().filter(x =&gt; x.active)"&gt;           ← Array callback
&lt;button (click)="list.reduce((...args) =&gt; args[0] + args[1])"&gt; ← Rest params</pre>

        <div class="event-demo">
          <p style="font-weight: 600; margin-bottom: 8px;">Live demo — signal.update with arrow callback:</p>
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
            <span class="label">Last event type (via $event):</span>
            <span class="result">{{ lastEventType() }}</span>
          </div>
        </div>

        <div class="warning-box" style="background: rgba(251, 191, 36, 0.08); border-left-color: var(--adev-warning); margin-top: 12px;">
          <strong>Destructuring not supported:</strong>
          <code>({{ '{' }}target{{ '}' }}) =&gt; handle(target)</code> won't parse.
          The expression parser only accepts identifiers, <code>...rest</code>, and commas in arrow params.
          Use <code>$event.target</code> directly instead.
        </div>
      </div>

      <!-- 9. Pipes in Event Bindings -->
      <div class="example-section">
        <h3>9. Pipes in Event Bindings</h3>
        <p class="syntax-block">
          (click)="handleClick($event.target.value | uppercase)"<br>
          (input)="search($event.target.value | lowercase)"<br>
          (click)="log($event | json)"
        </p>
        <p class="note">
          Pipes now work in event handler expressions! The compiler accepts pipe syntax
          in event bindings, the runtime pipe infrastructure supports pipes in listener contexts,
          and the type checker validates them correctly. Use pipes inside standalone expressions
          in handlers, e.g. <code>(click)="handle($event | json)"</code>.
        </p>
        <div class="event-demo">
          <input class="demo-input" placeholder="Type here..."
                 (input)="pipeInputValue.set(($any($event.target)).value.toUpperCase())" />
          <div class="code-row">
            <span class="label">Workaround with .toUpperCase():</span>
            <span class="result">{{ pipeInputValue() }}</span>
          </div>
        </div>
      </div>

      <!-- Interactive Product List: Select a product to see features in action -->
      <div class="products-section">
        <h3>Select a Product (used by demos above)</h3>
        <p class="products-note">
          Click a product to see &#64;let destructuring and array access demos update above.
          This data drives the live examples for sections 1 and 2.
        </p>
        @for (product of products(); track product.id) {
          <div class="product-card" [class.selected]="product.id === selectedProduct()?.id">
            <span class="product-name">{{ product.name }}</span>
            <span class="product-price">{{ product.price | currency }}</span>
            <span class="product-category">{{ product.category }}</span>
            <button (click)="selectProduct(product)">Select</button>
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
    h2 {
      font-size: 28px; font-weight: 700; color: var(--adev-text); margin: 0 0 8px;
    }
    .badge {
      display: inline-block; padding: 3px 10px; border-radius: 6px;
      font-size: 11px; font-weight: 600; font-family: 'JetBrains Mono', monospace;
    }
    .ts-features {
      background: rgba(96, 165, 250, 0.12); color: #60a5fa;
      border: 1px solid rgba(96, 165, 250, 0.25);
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

  products = signal<Product[]>([
    {id: 1, name: 'Laptop', price: 999, category: 'Electronics', tags: ['tech', 'work'], inventory: {stock: 5, warehouse: 'NYC'}},
    {id: 2, name: 'Keyboard', price: 75, category: 'Accessories', tags: ['input', 'ergonomic'], inventory: {stock: 20, warehouse: 'LA'}},
    {id: 3, name: 'Monitor', price: 299, category: 'Electronics', tags: ['display'], inventory: {stock: 8}},
  ]);

  selectedProduct = signal<Product | null>(null);

  selectProduct(product: Product) {
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
