import { Injectable } from '@angular/core';
import { Produit } from '../model/produit.model';
import { Categorie } from '../model/categorie.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  produits !: Produit[];


  apiUrl: string = 'http://localhost:8080/produits/api';
  constructor(private http: HttpClient) {

  }

  listeProduit(): Observable<Produit[]> {
    return this.http.get<Produit[]>(this.apiUrl);
  }


  ajouterProduit(prod: Produit): Observable<Produit> {
    return this.http.post<Produit>(this.apiUrl, prod, httpOptions);
  }


  supprimerProduit(id: number) {
    const url = `${this.apiUrl}/${id}`
    return this.http.delete(url, httpOptions)
  }


  consulterProduit(id: number): Observable<Produit> {
    const url = `${this.apiUrl}/${id}`
    return this.http.get<Produit>(url);
  }

  updateProduit(prod: Produit): Observable<Produit> {
    return this.http.put<Produit>(this.apiUrl, prod, httpOptions);
  }

  listeCategories():Observable<Categorie[]>{
    return this.http.get<Categorie[]>(this.apiUrl+'/cat')
  }
}
