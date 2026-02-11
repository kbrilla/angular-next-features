import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', loadComponent: () => import('./demos/overview.component').then(m => m.OverviewComponent)},
  {path: 'ts-features', loadComponent: () => import('./demos/ts-features-demo.component').then(m => m.TsFeaturesDemoComponent)},
  {path: 'optional-chaining', loadComponent: () => import('./demos/optional-chaining-demo.component').then(m => m.OptionalChainingLegacyDemoComponent)},
  {path: 'mix-match', loadComponent: () => import('./demos/mixed-chaining-demo.component').then(m => m.MixedChainingDemoComponent)},
  {path: 'inlay-hints', loadComponent: () => import('./demos/inlay-hints-demo.component').then(m => m.InlayHintsDemoComponent)},
  {path: 'css-intellisense', loadComponent: () => import('./demos/css-intellisense-demo.component').then(m => m.CssIntellisenseDemoComponent)},
  {path: 'template-debug', loadComponent: () => import('./demos/template-debug-demo.component').then(m => m.TemplateDebugDemoComponent)},
  {path: 'selection-range', loadComponent: () => import('./demos/selection-range-demo.component').then(m => m.SelectionRangeDemoComponent)},
  {path: 'document-symbols', loadComponent: () => import('./demos/document-symbols-demo.component').then(m => m.DocumentSymbolsDemoComponent)},
  {path: 'style-precedence', loadComponent: () => import('./demos/style-precedence-demo.component').then(m => m.StylePrecedenceDemoComponent)},
  {path: '**', redirectTo: ''},
];
