import { Categorie } from './categorie.model';

export class CategorieWrapped {
  _embedded!: { categories: Categorie[] };
}
