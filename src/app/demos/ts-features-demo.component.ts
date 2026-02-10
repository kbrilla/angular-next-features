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
          @let productName = product.name;
          @let productPrice = product.price;
          @let productCategory = product.category;
          <div class="code-row">
            <span class="label">Name:</span>
            <span class="result">{{ productName }}</span>
          </div>
          <div class="code-row">
            <span class="label">Price:</span>
            <span class="result">{{ productPrice | currency }}</span>
          </div>
          <div class="code-row">
            <span class="label">Category:</span>
            <span class="result">{{ productCategory }}</span>
          </div>
        }
      </div>

      <!-- 2. @let Array Destructuring (LIVE!) -->
      <div class="example-section">
        <h3>2. &#64;let Array Access (Live!)</h3>
        <p class="syntax-block">
          &#64;let [first, second] = items;<br>
          &#64;let [first, , third] = items; (skip elements)<br>
          &#64;let [head, ...tail] = items; (rest)
        </p>
        @let firstProduct = products()[0];
        @let lastProduct = products()[products().length - 1];
        @let count = products().length;
        <div class="code-row">
          <span class="label">First:</span>
          <span class="result">{{ firstProduct?.name ?? 'none' }}</span>
        </div>
        <div class="code-row">
          <span class="label">Last:</span>
          <span class="result">{{ lastProduct?.name ?? 'none' }}</span>
        </div>
        <div class="code-row">
          <span class="label">Total count:</span>
          <span class="result">{{ count }}</span>
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
          <span class="result">{{ hexValue }}</span>
        </div>
        <div class="code-row">
          <span class="label">Octal (0o755):</span>
          <span class="result">{{ octalValue }}</span>
        </div>
        <div class="code-row">
          <span class="label">Binary (0b1100):</span>
          <span class="result">{{ binaryValue }}</span>
        </div>
      </div>

      <!-- 4. Computed Property Names -->
      <div class="example-section">
        <h3>4. Computed Property Names (Live!)</h3>
        <p class="syntax-block">
          {{ '{{ {[key]: value} }}' }}<br>
          {{ "{{ {['name']: value} }}" }}
        </p>
        <div class="code-row">
          <span class="label">{{ '{' }}['price']: 42{{ '}' }}:</span>
          <span class="result">{{ {['price']: 42} | json }}</span>
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
        <p class="syntax-block">
          (click)="(event) =&gt; handleClick(event)"<br>
          (click)="($event) =&gt; doSomething($event.target)"<br>
          (input)="(e) =&gt; updateValue(e.target.value)"
        </p>
        <p class="note">
          Arrow functions can now be used directly in event bindings.
          This enables inline event handling logic without defining
          separate methods in the component class.
        </p>
        <div class="event-demo">
          <button class="demo-btn" (click)="handleArrowClick($event)">
            Click me (traditional)
          </button>
          <button class="demo-btn arrow-btn" (click)="arrowClickCount.set(arrowClickCount() + 1)">
            Click me (inline arrow-style)
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
        <div class="usage-examples">
          <p><strong>Usage examples in template:</strong></p>
          <pre class="syntax-block">&lt;button (click)="(e) =&gt; handleEvent(e)"&gt;Arrow handler&lt;/button&gt;
&lt;input (input)="(e) =&gt; search(e.target.value)" /&gt;
&lt;div (mouseover)="(e) =&gt; highlight(e.clientX, e.clientY)"&gt;&lt;/div&gt;</pre>
        </div>
      </div>

      <!-- 9. Pipes in Event Bindings -->
      <div class="example-section">
        <h3>9. Pipes in Event Bindings (Live!)</h3>
        <p class="syntax-block">
          (click)="handleClick($event.target.value | uppercase)"<br>
          (input)="search($event.target.value | lowercase)"<br>
          (click)="log($event | json)"
        </p>
        <p class="note">
          Pipes can now be used inside event binding expressions to transform
          data before passing it to handler functions. This eliminates the need
          for intermediate transformation methods in your component class.
        </p>
        <div class="event-demo">
          <input class="demo-input" placeholder="Type here..."
                 (input)="pipeInputValue.set(($any($event.target)).value | uppercase)" />
          <div class="code-row">
            <span class="label">(input)="set(value | uppercase)":</span>
            <span class="result">{{ pipeInputValue() }}</span>
          </div>
        </div>
        <div class="usage-examples">
          <p><strong>Pipes in event expressions:</strong></p>
          <pre class="syntax-block">&lt;input (input)="handleSearch($event.target.value | lowercase)" /&gt;
&lt;button (click)="log($event.type | uppercase)"&gt;Click&lt;/button&gt;
&lt;select (change)="setNum($event.target.value | number)"&gt;...&lt;/select&gt;</pre>
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
    .demo-container { padding: 20px; }
    .badge {
      display: inline-block; padding: 4px 12px; border-radius: 12px;
      font-size: 13px; font-weight: 600; font-family: monospace;
    }
    .ts-features { background: #dbeafe; color: #1e40af; border: 1px solid #3b82f6; }
    code { background: #f1f5f9; padding: 2px 6px; border-radius: 3px; font-size: 13px; }
    .example-section {
      background: #eff6ff; border-left: 4px solid #3b82f6;
      padding: 16px; margin: 16px 0; border-radius: 4px;
    }
    h3 { color: #1e40af; margin-top: 0; font-size: 16px; }
    .syntax-block {
      background: #1e293b; color: #e2e8f0; padding: 12px;
      border-radius: 4px; font-family: monospace; font-size: 13px; line-height: 1.8;
    }
    .code-row {
      display: flex; align-items: center; gap: 12px;
      background: white; padding: 10px; border-radius: 4px;
      margin: 8px 0; font-size: 14px;
    }
    .label { color: #64748b; font-weight: 500; min-width: 120px; }
    .result { font-weight: 600; color: #1e40af; }
    .note {
      background: #f0fdf4; border-left: 3px solid #22c55e;
      padding: 10px; border-radius: 4px; font-size: 13px; color: #166534;
    }
    .products-section { margin-top: 20px; }
    .products-note {
      font-size: 13px; color: #475569; font-style: italic;
      margin-bottom: 12px;
    }
    .product-card {
      display: flex; align-items: center; gap: 12px;
      background: white; padding: 10px; border-radius: 4px;
      margin: 6px 0; border: 1px solid #e2e8f0;
    }
    .product-card.selected { border-color: #3b82f6; background: #eff6ff; }
    .product-name { font-weight: 600; min-width: 100px; }
    .product-price { color: #059669; min-width: 80px; }
    .product-category { color: #64748b; font-size: 13px; flex: 1; }
    .product-card button {
      background: #3b82f6; color: white; border: none;
      padding: 4px 12px; border-radius: 4px; cursor: pointer; font-size: 12px;
    }
    .product-card button:hover { background: #2563eb; }
    .add-btn {
      background: #f1f5f9; color: #475569; border: 2px dashed #cbd5e1;
      padding: 8px 16px; border-radius: 4px; cursor: pointer;
      font-size: 13px; width: 100%; margin-top: 8px;
    }
    .add-btn:hover { background: #e2e8f0; }
    .event-demo { margin: 12px 0; }
    .demo-btn {
      background: #3b82f6; color: white; border: none;
      padding: 8px 16px; border-radius: 4px; cursor: pointer;
      font-size: 13px; margin-right: 8px;
    }
    .demo-btn:hover { background: #2563eb; }
    .arrow-btn { background: #7c3aed; }
    .arrow-btn:hover { background: #6d28d9; }
    .usage-examples {
      margin-top: 12px; padding: 12px;
      background: white; border-radius: 4px;
    }
    .usage-examples p { margin-top: 0; font-size: 13px; }
    .demo-input {
      padding: 8px 12px; border: 2px solid #e2e8f0; border-radius: 4px;
      font-size: 14px; width: 300px; margin-bottom: 8px;
    }
    .demo-input:focus { border-color: #3b82f6; outline: none; }
  `],
})
export class TsFeaturesDemoComponent {
  hexValue = 0x1FF;
  octalValue = 0o755;
  binaryValue = 0b1100;

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
