import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { CommonModule } from '@angular/common';
import { Categorie } from '../model/categorie.model';
import { FormsModule } from '@angular/forms';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-recherche-par-categorie',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recherche-par-categorie.component.html',
  styles: ``
})
export class RechercheParCategorieComponent implements OnInit {

  produits!: Produit[];
  categories!: Categorie[];
  IdCategorie!: number;
  constructor(private produitService: ProduitService) { }

  ngOnInit(): void {
    this.produitService.listeCategories().subscribe((cats => {
      this.categories = cats._embedded.categories
    }))
  }
  onChange() {
    this.produitService.rechercherParCategorie(this.IdCategorie).subscribe(prods => {
      this.produits = prods
      console.log();
    }
    )
  }
}
