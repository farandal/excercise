import {Component} from 'angular2/core';
import { HTTP_PROVIDERS } from '@angular/http';
import {Header} from '../../shared/components/header/header.component';
import {Footer} from '../../shared/components/footer/footer.component';
import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig, RouteParams} from 'angular2/router';
import { ProductsService } from 'app/services/products.service';
import { Product } from 'app/interfaces/product';
import { Review } from 'app/interfaces/review';

@Component({
	selector: 'productdetail',
  directives: [ROUTER_DIRECTIVES], 
	template: require('./productdetail.template.html'),
  providers:[ProductsService]
})

export class ProductDetail {
  
  products: Array<Product>;
  reviews: Array<Review>;
  productId: string;
  
  constructor(private productsService: ProductsService,private params: RouteParams) {
    console.log("Products Service");
    this.productId = params.get("id");
  }
  
  addReview(productId:string) {
    console.log("add review for product Id"+productId);
    
  }
  
  getProducts() {
    console.log("get Products");
    this.productsService.getProduct(this.productId).subscribe(
        body => { 
         
          this.products = body;
        
        },
        error => console.log(error)
      );
  }
  
   getReviews() {
    console.log("get Products Review");
    this.productsService.getProductReviews(this.productId).subscribe(
        body => { 
         console.log(body);
          this.reviews = body;
        
        },
        error => console.log(error)
      );
  }
  

  
  ngOnInit() {
    console.log("on Init");
    this.getProducts();
     this.getReviews();
  }
}

