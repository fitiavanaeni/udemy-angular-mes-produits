import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../services/produit.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './produits.component.html',
})
export class ProduitsComponent implements OnInit {
  //  produits: string[];  un tableau de chaine de charactère
  produits: Produit[];

  constructor(private produitService: ProduitService) {
    // this.produits = ['PC Asus', 'Imprimante Epson', 'Tablette Samsung'];
    this.produits = [];
  }

  ngOnInit() {
    this.produits = this.produitService.listeProduit();
  }

  supprimerProduit(prod: Produit) {
    // console.log(prod);
    let conf = confirm('Etes-vous sûr ?');
    if (conf) this.produitService.supprimerProduit(prod);
  }
}
