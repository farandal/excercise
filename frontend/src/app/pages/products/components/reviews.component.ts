import {Component,Output} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig, RouteParams} from 'angular2/router';
import { ProductsService } from '../../../services/products.service';
import { Mediator } from '../../../services/mediator';

@Component({
  selector: 'reviews',
  directives: [ROUTER_DIRECTIVES],
  template: require('./reviews.template.html')
})

export class ReviewsComponent {
    
    reviews: Array<any>;
    productId: string;
    
    constructor(
        private productsService: ProductsService,
        private params: RouteParams,
        private mediator: Mediator
    ) {
        
        this.productId = params.get("id");
        console.log("Review Component constructor pid:"+ this.productId);
    }
   
    getReviews () {
     
        this.productsService.getProductReviews(this.productId).subscribe(
            body => { 
               
                console.log(body);
                this.reviews = body;
            },
            error => console.log(error)
        );
        
  }
  
  ngOnInit() {
        this.getReviews();
        this.mediator.onMessage.subscribe(value => {
            console.log(value);
            if(value.message === "onPostReview") {
                console.log("onPostReview message received in reviews component");
                 this.getReviews();
            };
        });
  }
  
}
