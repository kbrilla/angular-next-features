import {Component, signal} from '@angular/core';
import {RouterOutlet, RouterLink, RouterLinkActive} from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

interface NavItem {
  id: string;
  path: string;
  label: string;
  icon: string;
  badge?: string;
}

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  sidenavOpened = signal(true);

  navItems: NavItem[] = [
    {id: 'overview', path: '/', label: 'Overview', icon: 'home'},
    {id: 'ts-features', path: '/ts-features', label: 'TS Template Features', icon: 'code', badge: 'NEW'},
    {id: 'mix-match', path: '/mix-match', label: 'Mix & Match Chaining', icon: 'compare_arrows', badge: 'NEW'},
    {id: 'inlay-hints', path: '/inlay-hints', label: 'Inlay Hints', icon: 'visibility', badge: 'NEW'},
    {id: 'css-intellisense', path: '/css-intellisense', label: 'CSS/ARIA IntelliSense', icon: 'palette', badge: 'NEW'},
    {id: 'template-debug', path: '/template-debug', label: 'Template Debug Overlay', icon: 'bug_report', badge: 'NEW'},
    {id: 'selection-range', path: '/selection-range', label: 'Selection Range', icon: 'select_all', badge: 'NEW'},
    {id: 'document-symbols', path: '/document-symbols', label: 'Document Symbols', icon: 'account_tree', badge: 'NEW'},
    {id: 'style-precedence', path: '/style-precedence', label: 'Style Binding Bugs', icon: 'layers', badge: 'NEW'},
  ];


}
