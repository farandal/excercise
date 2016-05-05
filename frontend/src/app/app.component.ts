/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation} from '@angular/core';
import {RouteConfig, Router} from '@angular/router-deprecated';

import {Home} from './pages/home/home.component';
import {AppState} from './app.service';
import {RouterActive} from './router-active';
import {RouterLink, RouteParams, RouterOutlet } from 'angular2/router';
/*
 * App Component
 * Top Level Component
*/

@Component({
  selector: 'app',
  pipes: [ ],
  providers: [ ],
  directives: [ RouterLink, RouterActive ],
  encapsulation: ViewEncapsulation.None,
  template: `<router-outlet></router-outlet>`,
  styles: [ require('../assets/css/importer.less')  ]
})
@RouteConfig([
  { path: '/',      name: 'Index', component: Home, useAsDefault: true },
  { path: '/home',  name: 'Home',  component: Home },
  { path: '/products',  name: 'Products',   loader: () => require('es6-promise!./pages/products/products.component')('Products') }
])
export class App {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  loading = false;
  name = 'Exercise';
  url = 'http://github.com/farandal/exercise';

  constructor(
    public appState: AppState) {

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */