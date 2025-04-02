import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {ProductResponse} from "../../models/ProductResponse";
import {Product} from "../../models/Product";
import {productMapper} from "../../models/productMapper/ProductMapper";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseURL = 'https://fakestoreapi.com/products';
  private httpClient: HttpClient = inject(HttpClient);
  constructor() { }

  public getAllProducts(): Observable<Array<Product>> {
    return this.httpClient.get<Array<ProductResponse>>(`${this.baseURL}`).pipe(
      map(response => response.map(item => productMapper(item)))
    );
  }

  public getProduct(id: number): Observable<Product> {
    return this.httpClient.get<ProductResponse>(`${this.baseURL}/${id}`).pipe(
      map(response => productMapper(response))
    );
  }

  public getProductsByCategory(category: string): Observable<Array<Product>>{
    return this.httpClient.get<Array<ProductResponse>>(`${this.baseURL}/category/${category}`).pipe(
      map(response => response.map(item => productMapper(item)))
    );
  }

}
