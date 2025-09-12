import { Component, OnInit } from '@angular/core';
import { Produit } from '../model/produit.model';
import { FormsModule } from '@angular/forms';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-add-produit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-produit.component.html',
})
export class AddProduitComponent implements OnInit {
  newProduit = new Produit();
  message!: string;

  constructor(private produitService: ProduitService) {}

  ngOnInit() {}

  addProduit() {
    //console.log(this.newProduit);

    this.produitService.ajouterProduit(this.newProduit);
    this.message =
      'Produit  ' + this.newProduit.nomProduit + ' ajouté avec Succès';
  }
}
