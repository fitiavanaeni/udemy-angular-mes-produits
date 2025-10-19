import { Injectable } from '@angular/core';
import { Produit } from '../model/produit.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategorieWrapped } from '../model/categorieWrapped.model';
import { environment } from '../../environments/environment.development';
import { Categorie } from '../model/categorie.model';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ProduitService {
  produits!: Produit[];

  constructor(private http: HttpClient, private authService: AuthService) {}

  listeProduit(): Observable<Produit[]> {
    return this.http.get<Produit[]>(environment.apiURL + '/all');
  }

  ajouterProduit(prod: Produit): Observable<Produit> {
    return this.http.post<Produit>(environment.apiURL + '/addprod', prod);
  }

  supprimerProduit(id: number) {
    const url = `${environment.apiURL}/delprod/${id}`;
    return this.http.delete(url);
  }

  consulterProduit(id: number): Observable<Produit> {
    const url = `${environment.apiURL}/getbyid/${id}`;

    return this.http.get<Produit>(url);
  }

  updateProduit(prod: Produit): Observable<Produit> {
    return this.http.put<Produit>(environment.apiURL + '/updateprod', prod);
  }

  listeCategories(): Observable<CategorieWrapped> {
    return this.http.get<CategorieWrapped>(environment.apiURLCat);
  }
  rechercherParCategorie(idCat: number): Observable<Produit[]> {
    const url = `${environment.apiURL}/prodscat/${idCat}`;
    return this.http.get<Produit[]>(url);
  }

  rechercherParNom(nom: string): Observable<Produit[]> {
    const url = `${environment.apiURL}/prodsByName/${nom}`;
    return this.http.get<Produit[]>(url);
  }

  ajouterCategorie(cat: Categorie): Observable<Categorie> {
    return this.http.post<Categorie>(environment.apiURLCat, cat, httpOptions);
  }
}
