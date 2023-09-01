import {  Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import {Subject} from "rxjs";


@Injectable()
export class RecipeService {

recipeChanged=new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      'Momos',
      'A super-tasty momos - just awesome!',
      'https://www.recipefunnel.com/images/recipe/pink-momos-1599460442606.webp?compress=false',
      [
        new Ingredient('Franky', 10),
        new Ingredient('Momos', 20)
      ]),
    new Recipe('Samosa',
      'Delicious samos for all of us',
      'https://en-media.thebetterindia.com/uploads/2017/01/maxresdefault-1.jpg',
      [
        new Ingredient('Manchurian', 20),
        new Ingredient('Ice Cream', 15)
      ])
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe:Recipe){

this.recipes.push(recipe);
this.recipeChanged.next(this.recipes.slice())
  }

  updateRecipe(index:number,newRecipe:Recipe){
this.recipes[index]=newRecipe;
    this.recipeChanged.next(this.recipes.slice())

  }
  deleteRecipe(index:number){
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
