import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-recherche-par-nom',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './recherche-par-nom.component.html',
  styles: ``
})
export class RechercheParNomComponent implements OnInit {


  nomProduit !: string;
  produits!: Produit[];
  allProduits!: Produit[];
  searchTerm!: string;
  constructor(private produitService: ProduitService) { }


  ngOnInit(): void {
    this.produitService.listeProduit().subscribe(prods => {
      console.log(prods);
      this.allProduits = prods;
    });
  }

 /*  rechercherProds() {
    if (this.nomProduit)
      this.produitService.rechercherParNom(this.nomProduit).subscribe(prods => {
        console.log(prods);
        this.produits = prods;
      });
    else this.produitService.listeProduit().subscribe(prods => {
      console.log(prods);
      this.produits = prods;
    });
  } */

  onKeyUp(filterText: string) {

    this.produits = this.allProduits.filter(item =>
      item.nomProduit.toLowerCase().includes(filterText))
  }

}
