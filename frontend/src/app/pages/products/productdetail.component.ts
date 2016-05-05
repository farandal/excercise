import {Component} from 'angular2/core';
import { HTTP_PROVIDERS } from '@angular/http';
import {Header} from '../../shared/components/header/header.component';
import {Footer} from '../../shared/components/footer/footer.component';
import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig, RouteParams} from 'angular2/router';
import { ProductsService } from 'app/services/products.service';
import { IProduct } from 'app/interfaces/IProduct';
import { IReview } from 'app/interfaces/IReview';
import { Review } from 'app/models/review';
import { NgForm }    from '@angular/common';

@Component({
	selector: 'productdetail',
  directives: [ROUTER_DIRECTIVES], 
	template: require('./productdetail.template.html'),
  providers:[ProductsService]
})

export class ProductDetail {
  
  products: Array<IProduct>;
  reviews: Array<IReview>;
  productId: string;
  error:string;
  //Form logic:
  
  ratings = ['1', '2', '3','4','5','6','7','8'];
 
  model = new Review();
  
  submitted = false;
  active = true;
  
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
              this.getReviews();
              this.submitted = true;    
          }
         
           
        
        },
        error => { 
          console.log(error);
         
         }
      );
    
  
  }
  
  submitReview() {
    this.model = new Review();
    this.active = false;
    setTimeout(()=> this.active=true, 0);
  }
  
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

