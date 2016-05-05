import { Component} from 'angular2/core';
import { RouterActive } from 'app/router-active';
import { ProductsService } from 'app/services/products.service';
import { Product } from 'app/interfaces/product';
import { Review } from 'app/interfaces/review';

@Component({
	selector: 'productlist',
  directives: [RouterActive], 
	template: require('./productlist.template.html'),
  providers:[ProductsService]
})

export class ProductList {
  
  products: Array<Product>
  
  constructor(private productsService: ProductsService) {
    console.log("Products Service");
  }
  
  getProducts() {
    console.log("get Products");
    this.productsService.getProducts().subscribe(
        body => { 
         
          this.products = body;
        
        },
        error => console.log(error)
      );
  }
  
  ngOnInit() {
    console.log("on Init");
    this.getProducts();
  }
}

