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
  
 
  constructor(private produitService: ProduitService, private router: Router) { }

  ngOnInit() {
    this.produitService.listeCategories().subscribe(cats => {
      this.categories= cats;
    });
  }

  addProduit() {
    this.newProduit.categorie = this.categories.find(cat => cat.idCat == this.newIdCat)!;
    this.produitService.ajouterProduit(this.newProduit).subscribe((prod) => {
      console.log(prod);
      this.router.navigate(['produits']);
    })
  }
}
