import { Injectable }     from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Http, Response, HTTP_PROVIDERS} from "angular2/http";

@Injectable()
export class ProductsService {
  
  constructor (private http: Http) {}
  
  private apiBaseUrl = 'http://localhost:1337/';  // URL to web api
  
  request (query: string): Observable<any> {
    return this.http.get(this.apiBaseUrl + "products" +query)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  
  public getProducts() {
      return this.request("/");
  }
  
  public getProductsByBrand(brandId: string) {
      return this.request("/brand/"+brandId);
  }
  
  public getProductReviews(productId: string) {
      return this.request("products/"+productId+"/reviews");  
  }
    
  private extractData(res: Response) {
    if (res.status < 200 || res.status >= 300) {
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