import {Component, signal, OnInit, OnDestroy, inject} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {DOCUMENT} from '@angular/common';
import {OptionalChainingLegacyDemoComponent} from './demos/optional-chaining-demo.component';
import {TsFeaturesDemoComponent} from './demos/ts-features-demo.component';
import {MixedChainingDemoComponent} from './demos/mixed-chaining-demo.component';
import {InlayHintsDemoComponent} from './demos/inlay-hints-demo.component';
import {CssIntellisenseDemoComponent} from './demos/css-intellisense-demo.component';
import {TemplateDebugDemoComponent} from './demos/template-debug-demo.component';
import {SelectionRangeDemoComponent} from './demos/selection-range-demo.component';
import {DocumentSymbolsDemoComponent} from './demos/document-symbols-demo.component';
import {StylePrecedenceDemoComponent} from './demos/style-precedence-demo.component';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  badge?: string;
}

@Component({
  selector: 'app-root',
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    OptionalChainingLegacyDemoComponent,
    TsFeaturesDemoComponent,
    MixedChainingDemoComponent,
    InlayHintsDemoComponent,
    CssIntellisenseDemoComponent,
    TemplateDebugDemoComponent,
    SelectionRangeDemoComponent,
    DocumentSymbolsDemoComponent,
    StylePrecedenceDemoComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, OnDestroy {
  private doc = inject(DOCUMENT);
  activeSection = signal('overview');
  sidenavOpened = signal(true);
  private hashListener = () => this.syncFromHash();

  private readonly validSections = new Set([
    'overview', 'ts-features', 'optional-chaining', 'mix-match',
    'inlay-hints', 'css-intellisense', 'template-debug',
    'selection-range', 'document-symbols', 'style-precedence',
  ]);

  navItems: NavItem[] = [
    {id: 'overview', label: 'Overview', icon: 'home'},
    {id: 'ts-features', label: 'TS Template Features', icon: 'code', badge: 'NEW'},
    {id: 'optional-chaining', label: 'Optional Chaining', icon: 'link', badge: 'NEW'},
    {id: 'mix-match', label: 'Mix & Match', icon: 'compare_arrows', badge: 'NEW'},
    {id: 'inlay-hints', label: 'Inlay Hints', icon: 'visibility', badge: 'NEW'},
    {id: 'css-intellisense', label: 'CSS/ARIA IntelliSense', icon: 'palette', badge: 'NEW'},
    {id: 'template-debug', label: 'Template Debug Overlay', icon: 'bug_report', badge: 'NEW'},
    {id: 'selection-range', label: 'Selection Range', icon: 'select_all', badge: 'NEW'},
    {id: 'document-symbols', label: 'Document Symbols', icon: 'account_tree', badge: 'NEW'},
    {id: 'style-precedence', label: 'Style Precedence', icon: 'layers', badge: 'NEW'},
  ];

  ngOnInit() {
    this.syncFromHash();
    this.doc.defaultView?.addEventListener('hashchange', this.hashListener);
  }

  ngOnDestroy() {
    this.doc.defaultView?.removeEventListener('hashchange', this.hashListener);
  }

  navigate(sectionId: string) {
    this.activeSection.set(sectionId);
    const win = this.doc.defaultView;
    if (win) {
      win.location.hash = sectionId === 'overview' ? '' : sectionId;
    }
  }

  private syncFromHash() {
    const hash = this.doc.defaultView?.location.hash.replace('#', '') ?? '';
    const section = this.validSections.has(hash) ? hash : 'overview';
    this.activeSection.set(section);
  }
}
