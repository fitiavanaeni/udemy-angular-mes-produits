import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { FormsModule } from '@angular/forms';
import { ProduitService } from '../services/produit.service';
import { Categorie } from '../model/categorie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-produit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-produit.component.html',
})
export class AddProduitComponent implements OnInit {
  newProduit = new Produit();
  categories!: Categorie[];
  newIdCat!: number;
  newCategorie!: Categorie;
  // message!: string;

  constructor(private produitService: ProduitService, private router: Router) {}

  ngOnInit() {
    this.categories = this.produitService.listeCategories();
  }

  addProduit() {
    //console.log(this.newProduit);
    this.newCategorie = this.produitService.consulterCategorie(this.newIdCat);
    this.newProduit.categorie = this.newCategorie;
    this.produitService.ajouterProduit(this.newProduit);
    this.router.navigate(['produits']);
    // this.message = 'Produit  ' + this.newProduit.nomProduit + ' ajouté avec Succès';
  }
}
