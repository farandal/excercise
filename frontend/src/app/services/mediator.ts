import { Injectable,Input,Output,EventEmitter }     from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Http,Headers, Response, HTTP_PROVIDERS,RequestOptions,RequestMethod,RequestOptionsArgs} from "angular2/http";

@Injectable()
export class Mediator {
  
  constructor () {
    console.log("Mediator initiated");
  }
  
  private _message: string;
  
  @Input() message(message:string) {
    this._message = message;
    console.log("input messgage "+this._message);
     this.onMessage.next({
      message: this._message
    })
  }
  
  @Output() onMessage: EventEmitter<any> = new EventEmitter();
  
}