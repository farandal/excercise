import {Component} from 'angular2/core';

@Component({
  selector: 'headertext',
  directives: [
  ],
  template: `
    <div class="col-xs-12 col-md-8 col-md-offset-2 text-center padall2">
      <h1 class="txt-white"><strong>Product List Exercise</strong></h1>
      <p> Angular2 / WebPack / Less / Frontend APP </p>
    </div>
  `
})
export class HeaderText {}

