import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  private baseUrl = 'http://localhost:4401/api/subcategories'; 

  constructor(private http: HttpClient) { }

  getSubcategoriesByCategoryName(categoryName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/category-details/${categoryName}`);
  }
}
