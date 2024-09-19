import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'http://localhost:4401/api/categories';

  constructor(private http: HttpClient) {}
  //category details
  getCategoryByName(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${name}`);
  }
  //fouta-gategories,
  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }
  //navbar
  getCategoriesWithSubcategories(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/categwithSub`);
  }
  //submodelFoutaDetails
  getCategoryById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/category-by-id/${id}`);
  }


}
