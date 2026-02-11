import {Component, signal} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {OptionalChainingLegacyDemoComponent} from './demos/optional-chaining-demo.component';
import {TsFeaturesDemoComponent} from './demos/ts-features-demo.component';
import {MixedChainingDemoComponent} from './demos/mixed-chaining-demo.component';
import {InlayHintsDemoComponent} from './demos/inlay-hints-demo.component';

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
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  activeSection = signal('overview');
  sidenavOpened = signal(true);

  navItems: NavItem[] = [
    {id: 'overview', label: 'Overview', icon: 'home'},
    {id: 'ts-features', label: 'TS Template Features', icon: 'code'},
    {id: 'optional-chaining', label: 'Optional Chaining', icon: 'link'},
    {id: 'mix-match', label: 'Mix & Match', icon: 'compare_arrows'},
    {id: 'inlay-hints', label: 'Inlay Hints', icon: 'visibility', badge: 'NEW'},
  ];

  navigate(sectionId: string) {
    this.activeSection.set(sectionId);
  }
}
