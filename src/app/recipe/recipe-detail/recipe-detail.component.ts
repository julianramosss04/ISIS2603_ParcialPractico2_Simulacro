import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../Recipe';

@Component({
  selector: 'app-recipe-detail',
  standalone: false,
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe;
  ingredienteMayor: string = '';

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadRecipe(id);
  }

  loadRecipe(id: number): void {
    this.recipeService.getRecipeDetail(id).subscribe((recipe) => {
      this.recipe = recipe;
      this.calcularIngredienteMayor();
    });
  }

  calcularIngredienteMayor(): void {
    if (!this.recipe || !this.recipe.ingredientes) return;

    let max = -1;
    let nombreMax = '';

    for (const ing of this.recipe.ingredientes) {
      if (!ing.cantidad) continue;

      // Extraemos solo el número (ignoramos unidad)
      const number = Number(
        ing.cantidad.toString().match(/\d+/)?.[0] ?? 0
      );

      if (number > max) {
        max = number;
        nombreMax = ing.nombre;
      }
    }

    this.ingredienteMayor = nombreMax;
  }
}
