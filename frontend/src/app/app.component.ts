/*
 * Angular 2 decorators and services
 */
import {Component, ViewEncapsulation,provide} from '@angular/core';
import {RouteConfig, Router,ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {ModalConfig} from 'angular2-modal';

import {Header} from './shared/components/header/header.component';
import {Footer} from './shared/components/footer/footer.component';

import {Home} from './pages/home/home.component';

import {AppState} from './app.service';
import {RouterActive} from './router-active';

/*
 * App Component
 * Top Level Component
*/

@Component({
  selector: 'app',
  pipes: [ ],
  providers: [ ],
  directives: [ RouterActive , ROUTER_DIRECTIVES,Header,Footer],
  encapsulation: ViewEncapsulation.None,
  template: require('./app.template.html'),
  styles: [ require('../assets/css/importer.less')  ]
})
@RouteConfig([
  { path: '/',      name: 'Index', component: Home, useAsDefault: true },
  { path: '/home',  name: 'Home',  component: Home },
  { path: '/products',  name: 'Products', loader: () => require('es6-promise!./pages/products/list.component')('ProductList') },
  { path: '/products/:id', name: 'ProductDetail',loader: () => require('es6-promise!./pages/products/detail.component')('ProductDetail')},
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
