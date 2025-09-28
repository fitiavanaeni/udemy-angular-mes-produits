import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { CommonModule } from '@angular/common';
import { ProduitService } from '../services/produit.service';
import { RouterLink } from '@angular/router';
import { Categorie } from '../model/categorie.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './produits.component.html',
})
export class ProduitsComponent implements OnInit {
  produits: Produit[];

  constructor(private produitService: ProduitService, public authService : AuthService) {
    this.produits = [];
  }

  ngOnInit() {
    this.chargerProduits()
  }

  chargerProduits() {
    this.produitService.listeProduit().subscribe((prods) => {
      this.produits = prods;
    });
  }

  supprimerProduit(p : Produit) {
    let conf = confirm('Etes-vous sûr ?');
    if (conf) this.produitService.supprimerProduit(p.idProduit).subscribe(() => {
      this.chargerProduits()
    })
  }
}
