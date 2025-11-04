import { Injectable } from '@angular/core';
import { Produit } from '../model/produit.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategorieWrapped } from '../model/categorieWrapped.model';
import { environment } from '../../environments/environment.development';
import { Categorie } from '../model/categorie.model';
import { AuthService } from './auth.service';
import { Image } from '../model/image.model';

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

  uploadImage(file: File, filename: string): Observable<Image> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${environment.apiURL + '/image/upload'}`;
    return this.http.post<Image>(url, imageFormData);
  }

  loadImage(id: number): Observable<Image> {
    const url = `${environment.apiURL + '/image/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }

  uploadImageProd(
    file: File,
    filename: string,
    idProd: number
  ): Observable<any> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${environment.apiURL + '/image/uplaodImageProd'}/${idProd}`;
    return this.http.post(url, imageFormData);
  }

  supprimerImage(id: number) {
    const url = `${environment.apiURL}/image/delete/${id}`;
    return this.http.delete(url, httpOptions);
  }

  uploadImageFS(file: File, filename: string, idProd: number): Observable<any> {
    const imageFormData = new FormData();
    imageFormData.append('image', file, filename);
    const url = `${environment.apiURL + '/image/uploadFS'}/${idProd}`;
    return this.http.post(url, imageFormData);
  }
}
