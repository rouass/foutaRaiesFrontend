import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  private baseUrl = 'http://193.70.36.57:8001/api/subcategories';

  constructor(private http: HttpClient) { }
  getSubcategoriesByCategoryName(categoryName: string, page: number = 1, limit: number = 10): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.http.get(`${this.baseUrl}/category-details/${categoryName}`, { params });
  }

  addSubcategory(subcategory: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, subcategory);
  }
  getSubcategoryByCategoryAndSubcategoryName(categoryName: string, subcategoryName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${categoryName}/${subcategoryName}`);
  }

}
