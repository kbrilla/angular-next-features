import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', loadComponent: () => import('./demos/overview.component').then(m => m.OverviewComponent)},
  {path: 'ts-features', loadComponent: () => import('./demos/ts-features-demo.component').then(m => m.TsFeaturesDemoComponent)},
  {path: 'mix-match', loadComponent: () => import('./demos/mixed-chaining-demo.component').then(m => m.MixedChainingDemoComponent)},
  {path: 'inlay-hints', loadComponent: () => import('./demos/inlay-hints-demo.component').then(m => m.InlayHintsDemoComponent)},
  {path: 'css-intellisense', loadComponent: () => import('./demos/css-intellisense-demo.component').then(m => m.CssIntellisenseDemoComponent)},
  {path: 'template-debug', loadComponent: () => import('./demos/template-debug-demo.component').then(m => m.TemplateDebugDemoComponent)},
  {path: 'selection-range', loadComponent: () => import('./demos/selection-range-demo.component').then(m => m.SelectionRangeDemoComponent)},
  {path: 'document-symbols', loadComponent: () => import('./demos/document-symbols-demo.component').then(m => m.DocumentSymbolsDemoComponent)},
  {path: 'style-precedence', loadComponent: () => import('./demos/style-precedence-demo.component').then(m => m.StylePrecedenceDemoComponent)},
  {path: 'host-element', loadComponent: () => import('./demos/host-element-demo.component').then(m => m.HostElementDemoComponent)},
  {path: 'linked-editing', loadComponent: () => import('./demos/linked-editing-demo.component').then(m => m.LinkedEditingDemoComponent)},
  {path: 'query-diagnostics', loadComponent: () => import('./demos/view-query-diagnostics-demo.component').then(m => m.ViewQueryDiagnosticsDemoComponent)},
  {path: '**', redirectTo: ''},
];
