import {Component} from 'angular2/core';
import {Header} from '../../shared/components/header/header.component';
import {Footer} from '../../shared/components/footer/footer.component';
import {HeaderText} from './components/headertext.component';

@Component({
  selector: 'home',
  directives: [
    Header,
    Footer,
    HeaderText
  ],
  template: require('./home.template.html')
})
export class Home {}
