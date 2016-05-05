import { Injectable }     from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Http,Headers, Response, HTTP_PROVIDERS,RequestOptions,RequestMethod,RequestOptionsArgs} from "angular2/http";
import { Review } from 'app/models/review';

@Injectable()
export class ProductsService {
  
  constructor (private http: Http) {}
  
  private apiBaseUrl = 'http://localhost:1337/';  // URL to web api
  
  request (query: string): Observable<any> {
    return this.http.get(this.apiBaseUrl +query)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  
  post (query: string,params): Observable<any> {
    return this.http.post(this.apiBaseUrl +query,params)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  
  public getProducts() {
      return this.request("products/");
  }
  
  public getProduct(productId: string) {
      return this.request("products/"+productId);
  }
  
  public getProductsByBrand(brandId: string) {
      return this.request("products/brand/"+brandId);
  }
  
  public getBrands() {
      return this.request("brand");
  }
  
  public getProductReviews(productId: string) {
      return this.request("products/"+productId+"/reviews");  
  }
  
  public postReview(review: Review) {
    
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.post("products/"+review.productId+"/reviews",JSON.stringify(review),{
        headers: headers
    });  
  }
    
  private extractData(res: Response) {
      
    if (res.status < 200 || res.status >= 300  ) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json();
    return body || { };
  }
  
  private handleError (error: any) {
    let errMsg = error.message || 'Server error';
    console.error(errMsg); 
    return Observable.throw(errMsg);
  }
}