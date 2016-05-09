import {Component} from 'angular2/core';
import {HeaderText} from './components/headertext.component';

@Component({
  selector: 'router-outlet',
  directives: [
    HeaderText
  ],
  template: require('./home.template.html')
})
export class Home {}
