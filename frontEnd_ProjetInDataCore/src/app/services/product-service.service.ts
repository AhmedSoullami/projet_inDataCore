import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http:HttpClient,) { }
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8888/products');
  }
  ajouterProduit(productData: any): Observable<any> {
    
    return this.http.post("http://localhost:8888/ajouterProduit", productData);
  }
  supprimerProduit(id: number): Observable<any[]> {
   
    return this.http.delete<any[]>(`http://localhost:8888/supprimerProduit/${id}`);
  }
  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`http://localhost:8888/modifierProduit/${id}`, product);
  }
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8888/getProduct/${id}`);
  }
  
}
