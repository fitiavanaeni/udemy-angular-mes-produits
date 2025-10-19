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
    // return this.http.get<Produit[]>(environment.apiURL);

    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });

    return this.http.get<Produit[]>(environment.apiURL + '/all', {
      headers: httpHeaders,
    });
  }

  ajouterProduit(prod: Produit): Observable<Produit> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.post<Produit>(environment.apiURL + "/addprod", prod, {
      headers: httpHeaders,
    });
  }

  supprimerProduit(id: number) {
    const url = `${environment.apiURL}/delprod/${id}`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.delete(url, { headers: httpHeaders });
  }

  consulterProduit(id: number): Observable<Produit> {
    const url = `${environment.apiURL}/getbyid/${id}`;
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<Produit>(url, { headers: httpHeaders });
  }

  updateProduit(prod: Produit): Observable<Produit> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.put<Produit>(environment.apiURL+"/updateprod", prod, {
      headers: httpHeaders,
    });
  }

  listeCategories(): Observable<CategorieWrapped> {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    let httpHeaders = new HttpHeaders({ Authorization: jwt });
    return this.http.get<CategorieWrapped>(environment.apiURLCat, {
      headers: httpHeaders,
    });
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
