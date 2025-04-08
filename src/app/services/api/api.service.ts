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
  private readonly BASE_URL: string = 'https://fakestoreapi.com/products';
  private httpClient: HttpClient = inject(HttpClient);
  constructor() { }

  public getAllProducts(): Observable<Array<Product>> {
    return this.httpClient.get<Array<ProductResponse>>(`${this.BASE_URL}`).pipe(
      map(response => response.map(item => productMapper(item)))
    );
  }

  public getProduct(id: number): Observable<Product> {
    return this.httpClient.get<ProductResponse>(`${this.BASE_URL}/${id}`).pipe(
      map(response => productMapper(response))
    );
  }

  public getProductsByCategory(category: string): Observable<Array<Product>>{
    return this.httpClient.get<Array<ProductResponse>>(`${this.BASE_URL}/category/${category}`).pipe(
      map(response => response.map(item => productMapper(item)))
    );
  }
}
