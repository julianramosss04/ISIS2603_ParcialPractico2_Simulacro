import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from './Recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseUrl =
    'https://raw.githubusercontent.com/2603-Uniandes/jsons/refs/heads/main/2025-10%20Recetas/';

  constructor(private http: HttpClient) {}

  /** CONSULTA LISTA DE RECETAS */
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.baseUrl + 'recipe.json');
  }

  /** CONSULTA DETALLE DE UNA RECETA POR ID */
  getRecipeDetail(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}${id}/recipe.json`);
  }
}
