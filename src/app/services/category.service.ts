import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:4401/api/categories';

  constructor(private http: HttpClient) {}

  getCategoryByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${name}`);
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getCategoriesWithSubcategories(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/categwithSub`);
  }
  getCategoryBySubcategoryName(subcategoryName: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/category-by-subcategory/${subcategoryName}`);
  }
}
