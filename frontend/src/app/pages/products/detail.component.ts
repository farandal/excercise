import {Component} from 'angular2/core';
import { HTTP_PROVIDERS } from '@angular/http';
import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig, RouteParams} from 'angular2/router';
import { Review } from '../../models/review';
import { ProductsService } from '../../services/products.service';
import { ReviewsComponent } from './components/reviews.component';
import { NgForm }    from '@angular/common';
import { Mediator } from '../../services/mediator';

@Component({
	selector: 'router-outlet',
  directives: [ROUTER_DIRECTIVES,ReviewsComponent], 
	template: require('./detail.template.html'),
  providers: [ProductsService,Mediator]
})

export class ProductDetail {
  
  products: Array<any>;
  productId: string;
  error:string;
 
  ratings = ['1', '2', '3','4','5','6','7','8'];
  model:Review = new Review(this.productId,"","",0);
  
  submitted = false;
  active = true;
  
   constructor(
      private productsService: ProductsService,
      private params: RouteParams,
      private mediator: Mediator
      ) { 
        console.log(mediator);
        this.productId = params.get("id");
        console.log("Products Service " + this.productId);
  }
  
  
  onSubmit() { 
   
    console.log("submit");
    this.model.productId = this.productId;
    console.log(this.model);
    
    this.productsService.postReview(this.model).subscribe(
        body => { 
          console.log(body);
          if(!body.success && body.payload) {
             this.error = "An error has ocurred inserting the review "+JSON.stringify(body);
          } else {
              this.error = "";
              this.mediator.message("onPostReview");
              this.submitted = true;    
          }
        },
        error => { 
          console.log(error); 
        }
      );
  }
 
  submitReview() {
    this.model = new Review(this.productId,"","",0);
    this.active = false;
    setTimeout(()=> this.active=true, 0);
  }
  
 
  addReview(productId:string) {
    console.log("add review for product Id"+productId);
    
  }
  
  getProduct() {
    
    console.log("get Products");
    this.productsService.getProduct(this.productId).subscribe(
        body => { 
          this.mediator.message("onGetProduct");
          this.products = body;
        
        },
        error => console.log(error)
      );
  }
  
  ngOnInit() {
     this.getProduct();
     this.mediator.onMessage.subscribe(value => console.log("message received in detail component "+value));
  }
}

