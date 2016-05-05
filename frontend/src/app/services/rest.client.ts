import { Injectable }     from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/then';
import {Http,Request, Response, HTTP_PROVIDERS} from "angular2/http";
import {RESTClient, GET, PUT, POST, DELETE, BaseUrl, Headers, DefaultHeaders, Path, Body, Query} from 'angular2-rest';

import {Product} from 'app/models/product';
import {Review} from 'app/models/review';

@Injectable()
@BaseUrl("http://localhost:1337/")
@DefaultHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*'
})
export class RestClient extends RESTClient {

    @GET("products/")
    public getProducts(): Observable<any> { return null; };

    @GET("products/brand/{brandId}")
    public getProductsByBrand( @Path("brandId") brandId: string): Observable<any> { return null; };

    @GET("products/{productId}")
    public getProductDetail( @Path("productId") productId: string): Observable<any> { return null; };

    @GET("products/{productId}/reviews")
    public getProductReviews( @Path("productId") productId: string): Observable<any> { return null; };

    @DELETE("products/{id}")
    public deleteProduct( @Path("id") id: string): Observable<any> { return null; };

}