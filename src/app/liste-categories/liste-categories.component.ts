import { Component } from '@angular/core';
import { ProduitService } from '../services/produit.service';
import { Categorie } from '../model/categorie.model';
import { UpdateCategorieComponent } from '../update-categorie/update-categorie.component';

@Component({
  selector: 'app-liste-categories',
  standalone: true,
  imports: [UpdateCategorieComponent],
  templateUrl: './liste-categories.component.html',
  styles: ``
})
export class ListeCategoriesComponent {
  categories!: Categorie[];
  updatedCat: Categorie = { "idCat": 0, "nomCat": "" };

  constructor(private produitService: ProduitService) { }

  ngOnInit(): void {
    this.chargerCategorie();
  }

  chargerCategorie() {
    this.produitService.listeCategories().subscribe(cats => {
      this.categories = cats._embedded.categories;
      console.log(cats);
    });
  }
  categorieUpdated(cat: Categorie) {
    this.produitService.ajouterCategorie(cat).subscribe(() => {
      this.chargerCategorie();
      console.log("Categorie est bien reçu", cat);
    })

  }
}