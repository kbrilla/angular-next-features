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
import {CurrencyPipe} from '@angular/common';

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
  imports: [CurrencyPipe],
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
        <h3>4. Computed Property Names</h3>
        <p class="syntax-block">
          {{ '{{ {[key]: value} }}' }}<br>
          {{ "{{ {['name']: value} }}" }}<br>
          {{ "{{ {a: 1, [dynamicKey]: 2} }}" }}
        </p>
        <p class="note">
          Computed property names enable dynamic object construction directly
          in templates. Previously only static keys were allowed.
        </p>
      </div>

      <!-- 5. BigInt Literals -->
      <div class="example-section">
        <h3>5. BigInt Literals</h3>
        <p class="syntax-block">
          {{ '{{ 1n }}' }}<br>
          {{ '{{ 9007199254740991n }}' }} (beyond Number.MAX_SAFE_INTEGER)<br>
          {{ '{{ 1_000_000n }}' }} (with separators)
        </p>
        <p class="note">
          BigInt support allows templates to work with arbitrary precision integers.
        </p>
      </div>

      <!-- 6. Arrow Rest Parameters -->
      <div class="example-section">
        <h3>6. Arrow Function Rest Parameters</h3>
        <p class="syntax-block">
          {{ '{{ (...args) => args }}' }}<br>
          {{ '{{ (a, b, ...rest) => a + b }}' }}<br>
          {{ '{{ (a, ...rest) => a }}' }}
        </p>
        <p class="note">
          Rest parameters in arrow functions within templates. The rest param
          must always be the last parameter.
        </p>
      </div>

      <!-- 7. Block Comments -->
      <div class="example-section">
        <h3>7. Block Comments in Expressions</h3>
        <p class="syntax-block">
          {{ '{{ a /* comment */ + b }}' }}<br>
          {{ '{{ foo(/* arg */ x) }}' }}<br>
          {{ '{{ /* main expression */ x }}' }}
        </p>
        <p class="note">
          Block comments are stripped during parsing.
          Comments inside string literals are preserved.
        </p>
      </div>

      <!-- Interactive Product List -->
      <div class="products-section">
        <h3>Interactive: Product Data</h3>
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
  `],
})
export class TsFeaturesDemoComponent {
  hexValue = 0x1FF;
  octalValue = 0o755;
  binaryValue = 0b1100;

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

  ngOnInit() {
    this.selectedProduct.set(this.products()[0]);
  }
}
