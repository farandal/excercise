import { Component} from 'angular2/core';
import { RouterActive } from 'app/router-active';
import { ProductsService } from 'app/services/products.service';
import { IProduct } from 'app/interfaces/IProduct';
import {Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteConfig, RouteParams} from 'angular2/router';

@Component({
	selector: 'productlist',
  directives: [RouterActive,ROUTER_DIRECTIVES], 
	template: require('./productlist.template.html'),
  providers:[ProductsService]
})

export class ProductList {
  
  products: Array<IProduct>;
  brands: Array<any>;
  brandId: string;
 
  constructor(private productsService: ProductsService,private params: RouteParams,private router: Router) {
    console.log("Products Service brand: "+params.get("brandId"));
    this.brandId = params.get("brandId");
    this.router = router;
  }
 
  goToBrand(brandId:string) {
      //this.router.navigate(['Products'], {brandId: brandId});
      window.location.href = "/#/products?brandId="+brandId;
  }
  
  goToDetail(productId:string) {
      //this.router.navigate(['ProductDetail'], {id: productId});
      window.location.href = "/#/products/"+productId;
  }
  
  getProducts() {
    console.log("get Products Brand "+this.brandId);
    
    this.productsService.getBrands().subscribe(
        body => { this.brands = body; console.log("brands"); console.log(body); }, error => console.log(error)
    );
   
    if(!this.brandId) {
       this.productsService.getProducts().subscribe(
        body => { this.products = body; }, error => console.log(error)
       )
    } else {
       this.productsService.getProductsByBrand(this.brandId).subscribe(
        body => { this.products = body; }, error => console.log(error)
     )
    }
      
  }
  
  ngOnInit() {
    console.log("on Init");
    this.getProducts();
  }
}

