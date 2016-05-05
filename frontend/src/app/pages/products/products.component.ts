import {Component} from 'angular2/core';
import { HTTP_PROVIDERS } from '@angular/http';
import {Header} from '../../shared/components/header/header.component';
import {Footer} from '../../shared/components/footer/footer.component';
import {ProductList} from './components/productlist.component';
import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig, RouteParams} from 'angular2/router';

@Component({
  selector: 'products',
  directives: [
    Header,
    Footer,
    ProductList,
    ROUTER_DIRECTIVES
  ],
  template: require('./products.template.html')
})
export class Products {}